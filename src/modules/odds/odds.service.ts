import {Inject, Injectable} from '@nestjs/common';
import { CreateOddDto } from './dto/create-odd.dto';
import { UpdateOddDto } from './dto/update-odd.dto';
import {Repository} from "typeorm";
import {Odd} from "./entities/odd.entity";

@Injectable()
export class OddsService {

  constructor(
      @Inject('ODD_REPOSITORY')
      private oddRepository: Repository<Odd>,
  ) {}
  create(createOddDto: CreateOddDto) {
    return 'This action adds a new odd';
  }

  findAll() {
    return this.oddRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} odd`;
  }

  update(id: number, updateOddDto: UpdateOddDto) {
    return `This action updates a #${id} odd`;
  }

  remove(id: number) {
    return `This action removes a #${id} odd`;
  }
}
