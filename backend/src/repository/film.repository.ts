import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Film, FilmDocument } from './film.schema';

@Injectable()
export class FilmRepository {
  constructor(
    @InjectModel(Film.name)
    private filmModel: Model<FilmDocument>,
  ) {}

  findAll() {
    return this.filmModel.find().exec();
  }

  findById(id: string) {
    return this.filmModel.findOne({ id }).exec();
  }

  async takeSeat(filmId: string, scheduleId: string, seat: string) {
    const result = await this.filmModel.updateOne(
      {
        id: filmId,
        'schedule.id': scheduleId,
        'schedule.taken': { $ne: seat },
      },
      {
        $push: {
          'schedule.$.taken': seat,
        },
      },
    );

    if (result.modifiedCount === 0) {
      throw new BadRequestException('Seat already taken');
    }
  }
}
