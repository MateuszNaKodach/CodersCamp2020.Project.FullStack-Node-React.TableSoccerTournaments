import { QueryBus } from '../../../../src/shared/core/application/query/QueryBus';
import { InMemoryQueryBus } from '../../../../src/shared/infrastructure/query/InMemoryQueryBus';

describe('InMemoryQueryBus', () => {
  it('query should returns response from registered handler', async () => {
    //Given
    const queryReturnValue = [new Player({ name: 'Jan Kowalski' }), new Player({ name: 'Jan Nowak' })];
    const queryBus: QueryBus = new InMemoryQueryBus().withHandler<Player[], FindPlayersByMatch>(
      FindPlayersByMatch,
      queryHandlerStubReturning<Player[], FindPlayersByMatch>(queryReturnValue),
    );

    //When
    const findPlayersByMatch = new FindPlayersByMatch({ matchId: 'SampleId' });
    const queryResult = await queryBus.execute<Player[]>(findPlayersByMatch);

    //Then
    expect(queryResult).toStrictEqual(queryReturnValue);
  });

  it('when try to register another query handler, then registering should fail', async () => {
    //Given
    const queryReturnValue = [new Player({ name: 'Jan Kowalski' }), new Player({ name: 'Jan Nowak' })];
    const queryBus: QueryBus = new InMemoryQueryBus().withHandler<Player[], FindPlayersByMatch>(
      FindPlayersByMatch,
      queryHandlerStubReturning<Player[], FindPlayersByMatch>(queryReturnValue),
    );

    //When
    const registerHandler = () =>
      queryBus.registerHandler<Player[], FindPlayersByMatch>(
        FindPlayersByMatch,
        queryHandlerStubReturning<Player[], FindPlayersByMatch>(queryReturnValue),
      );

    //Then
    await expect(registerHandler).toThrowError('The query handler for the "FindPlayersByMatch" query was already registered!');
  });

  it('when handler is not registered, then query should fail', async () => {
    //Given
    const queryBus: QueryBus = new InMemoryQueryBus();

    //When
    const findPlayersByMatch = new FindPlayersByMatch({ matchId: 'SampleId' });
    const executeQuery = () => queryBus.execute<Player[]>(findPlayersByMatch);

    //Then
    await expect(executeQuery).rejects.toThrowError('The query handler for the "FindPlayersByMatch" query was not found!');
  });
});

function queryHandlerStubReturning<ResponseType, QueryType>(responseValue: ResponseType) {
  return {
    execute(query: QueryType): Promise<ResponseType> {
      return Promise.resolve(responseValue);
    },
  };
}

class FindPlayersByMatch {
  readonly matchId: string;

  constructor(props: { matchId: string }) {
    this.matchId = props.matchId;
  }
}

class Player {
  readonly name: string;

  constructor(props: { name: string }) {
    this.name = props.name;
  }
}
