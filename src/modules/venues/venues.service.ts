import {Inject, Injectable} from '@nestjs/common';
import { CreateVenueDto } from './dto/create-venue.dto';
import { UpdateVenueDto } from './dto/update-venue.dto';
import {Repository} from "typeorm";
import {TimeZone} from "../time-zones/entities/time-zone.entity";

@Injectable()
export class VenuesService {

  constructor(
      @Inject('VENUE_REPOSITORY')
      private venueRepository: Repository<TimeZone>,
  ) {}
  create(createVenueDto: CreateVenueDto) {
    return 'This action adds a new venue';
  }

  findAll() {
    return this.venueRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} venue`;
  }

  update(id: number, updateVenueDto: UpdateVenueDto) {
    return `This action updates a #${id} venue`;
  }

  remove(id: number) {
    return `This action removes a #${id} venue`;
  }
}
