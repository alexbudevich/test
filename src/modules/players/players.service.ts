import {Inject, Injectable} from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import {Repository} from "typeorm";
import {Match} from "../matches/entities/match.entity";
import {Player} from "./entities/player.entity";

@Injectable()
export class PlayersService {

  constructor(
      @Inject('PLAYER_REPOSITORY')
      private playerRepository: Repository<Player>,
  ) {}
  create(createPlayerDto: CreatePlayerDto) {
    return 'This action adds a new player';
  }

  findAll() {
    return this.playerRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} player`;
  }

  update(id: number, updatePlayerDto: UpdatePlayerDto) {
    return `This action updates a #${id} player`;
  }

  remove(id: number) {
    return `This action removes a #${id} player`;
  }
}
