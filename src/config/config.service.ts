import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

@Injectable()
export class ApiConfigService {
  constructor(private configService: ConfigService) {}

  get host(): string {
    return this.configService.get<string>('DATABASE_HOST');
  }

  get port(): number {
    return this.configService.get<number>('DATABASE_PORT');
  }

  get username(): string {
    return this.configService.get<string>('DATABASE_USERNAME');
  }

  get password(): string {
    return this.configService.get<string>('DATABASE_PASSWORD');
  }

  get database(): string {
    return this.configService.get<string>('DATABASE_DATABASE');
  }

  get postgresConfig(): TypeOrmModuleOptions {
    const entities = [__dirname + '/../**/*.entity{.ts,.js}'];

    return {
      entities,
      type: 'postgres',
      host: this.host,
      port: this.port,
      username: this.username,
      password: this.password,
      database: this.database,
    };
  }
}