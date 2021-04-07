import { v4 as uuid } from "uuid";

export class EntityIdGenerator {
  static generate(): string {
    return uuid();
  }
}
