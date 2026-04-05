import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Film } from './film.entity';
import { v4 as uuidv4 } from 'uuid';

@Entity({ name: 'schedules', schema: 'nest_project' })
export class Schedule {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidv4();

  @Column()
  daytime: string;

  @Column()
  hall: number;

  @Column()
  rows: number;

  @Column()
  seats: number;

  @Column('double precision')
  price: number;

  @Column({
    type: 'text',
    transformer: {
      to: (value: string[]) => value.join(','),
      from: (value: string) => (value ? value.split(',') : []),
    },
  })
  taken: string[];

  @ManyToOne(() => Film, (film) => film.schedule, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'filmId' })
  film: Film;
}
