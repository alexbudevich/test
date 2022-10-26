import { Injectable } from '@nestjs/common';
import { CreateOddDto } from './dto/create-odd.dto';
import { UpdateOddDto } from './dto/update-odd.dto';

@Injectable()
export class OddsService {
  create(createOddDto: CreateOddDto) {
    return 'This action adds a new odd';
  }

  findAll() {
    return `This action returns all odds`;
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
