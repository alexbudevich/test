import { Module } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { CountriesController } from './countries.controller';
import { DatabaseModule } from '../../common/database/database.module';
import { countryProviders } from './country.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [CountriesController],
  providers: [CountriesService, ...countryProviders],
})
export class CountriesModule {}
