import { EntityIdGenerator } from '../../../../src/shared/core/application/EntityIdGenerator';

export function TeamIdGeneratorStub(idsList: string[]): EntityIdGenerator {
  idsList.reverse();
  return {
    generate(): string {
      return <string>idsList.pop();
    },
  };
}
