import { EntityIdGenerator } from '../../../../src/shared/core/application/EntityIdGenerator';

export function NumberIdGeneratorStub(numberOfIds = 1, idsName = ''): EntityIdGenerator {
  const idsList = Array.from(Array(numberOfIds).keys())
    .map((numberItem) => `${idsName}_${++numberItem}`)
    .reverse();
  return {
    generate(): string {
      return <string>idsList.pop();
    },
  };
}
