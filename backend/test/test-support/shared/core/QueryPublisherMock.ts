import { QueryPublisher } from "../../../../src/shared/core/application/query/QueryBus";

export function QueryPublisherMock(): QueryPublisher {
  return {
    execute: jest.fn(),
  };
}
