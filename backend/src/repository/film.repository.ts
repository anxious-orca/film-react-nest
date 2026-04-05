import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Film } from 'src/films/entities/film.entity';
import { Schedule } from 'src/films/entities/schedule.entity';

@Injectable()
export class FilmRepository {
  constructor(
    private readonly dataSource: DataSource,

    @InjectRepository(Film)
    private filmRepo: Repository<Film>,
  ) {}

  async findAll() {
    return this.filmRepo.find({
      relations: ['schedule'],
    });
  }

  async findById(id: string) {
    return this.filmRepo.findOne({
      where: { id },
      relations: ['schedule'],
    });
  }

  async takeSeat(filmId: string, scheduleId: string, seat: string) {
    return this.dataSource.transaction(async (manager) => {
      const schedule = await manager.findOne(Schedule, {
        where: {
          id: scheduleId,
          film: { id: filmId },
        },
        relations: ['film'],
        lock: { mode: 'pessimistic_write' },
      });

      if (!schedule) {
        return false;
      }

      if (schedule.taken.includes(seat)) {
        return false;
      }

      schedule.taken.push(seat);

      await manager.save(schedule);

      return true;
    });
  }
}
