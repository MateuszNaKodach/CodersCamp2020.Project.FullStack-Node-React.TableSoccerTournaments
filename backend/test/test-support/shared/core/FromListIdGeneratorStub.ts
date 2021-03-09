import { EntityIdGenerator } from '../../../../src/shared/core/application/EntityIdGenerator';

export function FromListIdGeneratorStub(idsList: string[]): EntityIdGenerator {
  return {
    generate(): string {
      return <string>idsList.shift();
    },
  };
}
