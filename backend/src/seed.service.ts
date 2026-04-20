import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { DataSource } from 'typeorm';
import * as fs from 'node:fs';
import * as path from 'node:path';

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  constructor(private dataSource: DataSource) {}

  async onApplicationBootstrap() {
    if (process.env.NODE_ENV === 'test' || process.env.CI) {
      const files = ['prac.init.sql'];

      for (const file of files) {
        try {
          const filePath = path.join(__dirname, '..', 'test', file);

          if (!fs.existsSync(filePath)) {
            console.error(`SQL file not found: ${filePath}`);
            continue;
          }

          const sql = fs.readFileSync(filePath, 'utf8');
          await this.dataSource.query(sql);
        } catch (err) {
          console.error(`Error executing ${file}:`, err);
        }
      }
    }
  }
}
