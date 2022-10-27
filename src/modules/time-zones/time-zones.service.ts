import {Inject, Injectable} from '@nestjs/common';
import { CreateTimeZoneDto } from './dto/create-time-zone.dto';
import { UpdateTimeZoneDto } from './dto/update-time-zone.dto';
import {Repository} from "typeorm";
import {Team} from "../teams/entities/team.entity";
import {TimeZone} from "./entities/time-zone.entity";

@Injectable()
export class TimeZonesService {

  constructor(
      @Inject('TIMEZONE_REPOSITORY')
      private timezoneRepository: Repository<TimeZone>,
  ) {}
  create(createTimeZoneDto: CreateTimeZoneDto) {
    return 'This action adds a new timeZone';
  }

  findAll() {
    return this.timezoneRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} timeZone`;
  }

  update(id: number, updateTimeZoneDto: UpdateTimeZoneDto) {
    return `This action updates a #${id} timeZone`;
  }

  remove(id: number) {
    return `This action removes a #${id} timeZone`;
  }
}
