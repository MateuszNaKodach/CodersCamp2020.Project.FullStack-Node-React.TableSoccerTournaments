import { EntityIdGenerator } from '../../../../src/shared/core/application/EntityIdGenerator';

export function EntityIdGeneratorStub(alwaysGenerate: string): EntityIdGenerator {
  return {
    generate(): string {
      return alwaysGenerate;
    },
  };
}
