import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import * as path from 'node:path';

import { AppConfig } from './app.config.provider';
import { FilmsModule } from './films/films.module';
import { OrderModule } from './order/order.module';
import { AppConfigModule } from './config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedule } from './films/entities/schedule.entity';
import { Film } from './films/entities/film.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),

    AppConfigModule,

    TypeOrmModule.forRootAsync({
      imports: [AppConfigModule],
      inject: ['CONFIG'],
      useFactory: (config: AppConfig) => ({
        type: 'postgres',
        host: config.database.host,
        port: config.database.port,
        username: config.database.username,
        password: config.database.password,
        database: config.database.database,
        entities: [Film, Schedule],
        synchronize: false,
      }),
    }),

    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'public'),
      serveRoot: '/',
      serveStaticOptions: {
        index: false,
      },
    }),

    FilmsModule,
    OrderModule,
  ],
})
export class AppModule {}
