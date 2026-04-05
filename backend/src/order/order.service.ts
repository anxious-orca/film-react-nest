import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/order.dto';
import { FilmRepository } from '../repository/film.repository';
import { randomUUID } from 'crypto';

@Injectable()
export class OrderService {
  constructor(private readonly filmRepo: FilmRepository) {}

  async createOrder(dto: CreateOrderDto) {
    const results = [];
    const errors = [];

    for (const ticket of dto.tickets) {
      const isBooked = await this.filmRepo.takeSeat(
        ticket.film,
        ticket.session,
        `${ticket.row}:${ticket.seat}`,
      );

      if (isBooked) {
        results.push({
          id: randomUUID(),
          ...ticket,
        });
      } else {
        errors.push({
          place: `Ряд:${ticket.row} Место:${ticket.seat}`,
          error: `Это место уже занято`,
        });
      }
    }

    return {
      total: results.length,
      items: results,
      errors: errors.length ? errors : undefined,
    };
  }
}
