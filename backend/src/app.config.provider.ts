import { ConfigService } from '@nestjs/config';

export const configProvider = {
  provide: 'CONFIG',
  inject: [ConfigService],
  useFactory: (config: ConfigService): AppConfig => ({
    database: {
      type: config.get<string>('DATABASE_DRIVER') || 'postgres',
      host: config.get<string>('DATABASE_HOST') || 'localhost',
      port: parseInt(config.get<string>('DATABASE_PORT') || '5432', 10),
      username: config.get<string>('DATABASE_USERNAME') || 'student',
      password: config.get<string>('DATABASE_PASSWORD') || '',
      database: config.get<string>('DATABASE_NAME') || 'nest_project',
    },
  }),
};

export interface AppConfig {
  database: AppConfigDatabase;
}

export interface AppConfigDatabase {
  type: string;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}
