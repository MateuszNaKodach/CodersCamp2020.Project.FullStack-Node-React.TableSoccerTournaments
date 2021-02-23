import { EntityIdGenerator } from '../../../core/application/EntityIdGenerator';
import { v4 as uuid } from 'uuid';

export class UuidEntityIdGenerator implements EntityIdGenerator {
  generate(): string {
    return uuid();
  }
}
