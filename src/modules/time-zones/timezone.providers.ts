import { DataSource } from 'typeorm';
import {TimeZone} from "./entities/time-zone.entity";

export const timezoneProviders = [
    {
        provide: 'TIMEZONE_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(TimeZone),
        inject: ['DATA_SOURCE'],
    },
];