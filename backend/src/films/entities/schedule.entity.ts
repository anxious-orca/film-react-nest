import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Film } from './film.entity';

const isTest = process.env.NODE_ENV === 'test' || process.env.CI;

@Entity(
  isTest
    ? { name: 'schedules' }
    : { name: 'schedules' },
)
export class Schedule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
  default: '',
  transformer: {
    to: (value?: string[]) => (value ? value.join(',') : ''),
    from: (value?: string) => (value ? value.split(',') : []),
  },
  })
  taken: string[];

  @Column({ name: 'filmid' })
  filmId: string;

  @ManyToOne(() => Film, (film) => film.schedule, {
  onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'filmid' })
  film: Film;
}
