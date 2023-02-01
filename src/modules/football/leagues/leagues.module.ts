import { Module } from '@nestjs/common';
import { LeaguesService } from './leagues.service';
import { LeaguesController } from './leagues.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { League } from './entities/league.entity';
import { Country } from '../../countries/entities/country.entity';
import { CountryFootballEntity } from '../../countries/entities/country-football.entity';

@Module({
  imports: [TypeOrmModule.forFeature([League, CountryFootballEntity])],
  controllers: [LeaguesController],
  providers: [LeaguesService],
})
export class LeaguesModule {}
