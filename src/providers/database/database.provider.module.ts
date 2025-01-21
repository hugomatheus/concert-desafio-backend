import * as path from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from '../../config/database/database-entities';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: configService.get<'mysql' | 'postgres' | 'sqlite' | 'mssql'>(
          'DATABASE_TYPE',
        ),
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USERNAME'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities,
        logging: configService.get<string>('APP_MODE') !== 'prod',
        migrations: [
          path.join(__dirname, '../../database/migrations/*{.ts,.js}'),
        ],
        cli: {
          migrationsDir: __dirname + 'src/database/migrations',
        },
        synchronize: false,
      }),
    }),
  ],
})
export class DatabaseProviderModule {}
