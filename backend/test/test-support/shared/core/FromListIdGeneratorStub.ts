import { EntityIdGenerator } from '../../../../src/shared/core/application/EntityIdGenerator';

export function FromListIdGeneratorStub(idsList: string[]): EntityIdGenerator {
  idsList.reverse();
  return {
    generate(): string {
      return <string>idsList.pop();
    },
  };
}
