import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Schedule } from './schedule.entity';
import { v4 as uuidv4 } from 'uuid';

@Entity({ name: 'films', schema: 'nest_project' })
export class Film {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidv4();

  @Column('double precision')
  rating: number;

  @Column()
  director: string;

  @Column({
    type: 'text',
    transformer: {
      to: (value: string[]) => value.join(','),
      from: (value: string) => value.split(','),
    },
  })
  tags: string[];

  @Column()
  image: string;

  @Column()
  cover: string;

  @Column()
  title: string;

  @Column()
  about: string;

  @Column()
  description: string;

  @OneToMany(() => Schedule, (schedule) => schedule.film)
  schedule: Schedule[];
}
