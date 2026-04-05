import { Controller, Get, Param } from '@nestjs/common';
import { FilmsService } from './films.service';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  async findAll() {
    const films = await this.filmsService.getAllFilms();
    return {
      total: films.length,
      items: films,
    };
  }

  @Get(':id/schedule')
  async getSchedule(@Param('id') id: string) {
    const film = await this.filmsService.getFilmById(id);
    return {
      total: film.schedule.length,
      items: film.schedule,
    };
  }
}
