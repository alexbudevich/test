import {Inject, Injectable} from '@nestjs/common';
import { CreateBookmakerDto } from './dto/create-bookmaker.dto';
import { UpdateBookmakerDto } from './dto/update-bookmaker.dto';
import {Repository} from "typeorm";
import {Bookmaker} from "./entities/bookmaker.entity";

@Injectable()
export class BookmakersService {

  constructor(
      @Inject('BOOKMAKER_REPOSITORY')
      private bookmakerRepository: Repository<Bookmaker>,
  ) {}

  create(createBookmakerDto: CreateBookmakerDto) {
    return 'This action adds a new bookmaker';
  }

  findAll() {
    return this.bookmakerRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} bookmaker`;
  }

  update(id: number, updateBookmakerDto: UpdateBookmakerDto) {
    return `This action updates a #${id} bookmaker`;
  }

  remove(id: number) {
    return `This action removes a #${id} bookmaker`;
  }
}
