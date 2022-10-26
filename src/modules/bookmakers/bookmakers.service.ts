import { Injectable } from '@nestjs/common';
import { CreateBookmakerDto } from './dto/create-bookmaker.dto';
import { UpdateBookmakerDto } from './dto/update-bookmaker.dto';

@Injectable()
export class BookmakersService {
  create(createBookmakerDto: CreateBookmakerDto) {
    return 'This action adds a new bookmaker';
  }

  findAll() {
    return `This action returns all bookmakers`;
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
