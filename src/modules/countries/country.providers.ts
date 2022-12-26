import { DataSource } from 'typeorm';
import { Country } from './entities/country.entity';

export const countryProviders = [
  {
    provide: 'COUNTRY_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Country),
    inject: ['DATA_SOURCE'],
  },
];
