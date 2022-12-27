import { DataSource } from 'typeorm';
import { Bookmaker } from './entities/bookmaker.entity';

export const bookmakerProviders = [
  {
    provide: 'BOOKMAKER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Bookmaker),
    inject: ['DATA_SOURCE'],
  },
];
