import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Odd } from "./entities/odd.entity";
import { AbstractDomainService } from "../../common/abstract-domain.service";

@Injectable()
export class OddsService extends AbstractDomainService {
  constructor(
    @Inject('ODD_REPOSITORY')
    repository: Repository<Odd>,
  ) {
    super(repository);
  }
}
