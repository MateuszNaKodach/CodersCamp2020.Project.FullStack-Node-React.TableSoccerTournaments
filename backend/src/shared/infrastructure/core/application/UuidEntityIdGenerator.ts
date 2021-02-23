import { EntityIdGenerator } from "../../../core/application/EntityIdGenerator";
import uuid from "uuid";

export class UuidEntityIdGenerator implements EntityIdGenerator {
  generate(): string {
    return uuid.v4();
  }
}
