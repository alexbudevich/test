import { DataSource } from 'typeorm';
import { SportType } from './entities/sport-type.entity';

export const sportProviders = [
  {
    provide: 'SPORT_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(SportType),
    inject: ['DATA_SOURCE'],
  },
];
