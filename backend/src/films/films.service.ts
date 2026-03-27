import { Injectable, NotFoundException } from '@nestjs/common';
import { FilmRepository } from '../repository/film.repository';

@Injectable()
export class FilmsService {
  constructor(private readonly filmRepo: FilmRepository) {}

  async getAllFilms() {
    return this.filmRepo.findAll();
  }

  async getFilmById(id: string) {
    const film = await this.filmRepo.findById(id);
    if (!film) {
      throw new NotFoundException('Film not found');
    }
    return film;
  }
}
