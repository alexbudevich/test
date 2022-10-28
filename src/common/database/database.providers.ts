import { DataSource } from 'typeorm';
import { PostgresConfigService } from '../../config/database/pg';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    inject: [PostgresConfigService],
    useFactory: async (postgresConfigService: PostgresConfigService) => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: postgresConfigService.host,
        port: postgresConfigService.port,
        username: postgresConfigService.username,
        password: postgresConfigService.password,
        database: postgresConfigService.database,
        entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
