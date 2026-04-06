import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { DataSource } from 'typeorm';
import * as fs from 'node:fs';
import * as path from 'node:path';

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  constructor(private dataSource: DataSource) {}

  async onApplicationBootstrap() {
    if (process.env.NODE_ENV === 'test' || process.env.CI) {
      console.log('Seeding test database...');

      const files = [
        'prac.init.sql',
        'prac.films.sql',
        'prac.schedules.sql',
      ];

      for (const file of files) {
        const filePath = path.join(__dirname, '..', 'test', file);
        const sql = fs.readFileSync(filePath, 'utf8');
        await this.dataSource.query(sql);
      }

      console.log('Seeding complete!');
    }
  }
}