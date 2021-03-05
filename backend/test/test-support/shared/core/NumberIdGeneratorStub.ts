import { EntityIdGenerator } from '../../../../src/shared/core/application/EntityIdGenerator';

export function NumberIdGeneratorStub(numberOfIds: number = 1, idsName: string = ""): EntityIdGenerator {
  const idsList = Array.from(Array(numberOfIds)
      .keys())
      .map(numberItem => `${idsName}_${++numberItem}`)
      .reverse();
  return {
    generate(): string {
      return <string>idsList.pop();
    },
  };
}
