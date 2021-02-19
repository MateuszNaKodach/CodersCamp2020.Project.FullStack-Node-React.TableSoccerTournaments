import {QueryBus} from "../../../../../src/modules/shared/application/query/QueryBus";
import {InMemoryQueryBus} from "../../../../../src/modules/shared/infrastructure/query/InMemoryQueryBus";
import {QueryHandler} from "../../../../../src/modules/shared/application/query/QueryHandler";

describe('InMemoryQueryBus', () => {

  it('QueryHandler with return value', async () => {
    const queryBus: QueryBus = new InMemoryQueryBus();
    const findPlayersByMatchHandler: QueryHandler<FindPlayersByMatch, Player[]> = {
      execute(query: FindPlayersByMatch): Promise<Player[]> {
        return Promise.resolve([new Player({name: 'Jan Kowalski'}), new Player({name: 'Jan Nowak'})]);
      }
    }
    queryBus.registerHandler<Player[], FindPlayersByMatch>(FindPlayersByMatch, findPlayersByMatchHandler)

    const findPlayersByMatch = new FindPlayersByMatch({matchId: 'SampleId'})
    const queryResult = await queryBus.execute<Player[]>(findPlayersByMatch)

    expect(queryResult).toStrictEqual([new Player({name: 'Jan Kowalski'}), new Player({name: 'Jan Nowak'})])
  })

})

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
