import { Repository } from 'typeorm';
import { BadRequestException, InternalServerErrorException } from '@common/exceptions/exceptions';

export class BasicRepository<T> extends Repository<T & { id: number }> {
  async saveAndReturn(entity: (T & { id: number }) | undefined): Promise<T & { id: number }> {
    if (!entity) throw new InternalServerErrorException('UNKNOWN');
    entity = await this.save(entity);
    entity = await this.findOne(entity.id);
    if (!entity) throw new InternalServerErrorException('UNKNOWN');
    return entity;
  }

  async isExist(id: number): Promise<T> {
    if (!id) throw new InternalServerErrorException('UNKNOWN');
    const entity = await this.findOne(id);
    if (!entity) throw new BadRequestException('FORBIDDEN');
    return entity;
  }
}
