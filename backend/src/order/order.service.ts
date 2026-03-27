import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/order.dto';
import { FilmRepository } from '../repository/film.repository';
import { randomUUID } from 'crypto';

@Injectable()
export class OrderService {
  constructor(private readonly filmRepo: FilmRepository) {}

  async createOrder(dto: CreateOrderDto) {
    const results = [];

    for (const ticket of dto.tickets) {
      await this.filmRepo.takeSeat(
        ticket.film,
        ticket.session,
        `${ticket.row}:${ticket.seat}`,
      );

      results.push({
        id: randomUUID(),
        ...ticket,
      });
    }

    return {
      items: results,
    };
  }
}
