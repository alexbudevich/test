import { paginate, PaginateQuery } from 'nestjs-paginate';
import { Repository } from 'typeorm';
import { ObjectLiteral } from 'typeorm/common/ObjectLiteral';

export abstract class AbstractDomainService {
  protected constructor(protected repository: Repository<ObjectLiteral>) {}

  findAll(query: PaginateQuery) {
    return paginate(query, this.repository, {
      sortableColumns: ['id'],
    });
  }

  findOne(id: number) {
    return this.repository.findOneBy({ id: id });
  }
}
