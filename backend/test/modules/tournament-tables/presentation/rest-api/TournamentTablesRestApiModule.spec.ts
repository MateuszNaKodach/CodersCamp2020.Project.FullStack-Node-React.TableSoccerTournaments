import { CommandPublisherMock } from '../../../../test-support/shared/core/CommandPublisherMock';
import { CommandResult } from '../../../../../src/shared/core/application/command/CommandResult';
import { testModuleRestApi } from '../../../../test-support/shared/presentation/rest-api/TestModuleRestApi';
import { StatusCodes } from 'http-status-codes';
import { QueryPublisherMock } from '../../../../test-support/shared/core/QueryPublisherMock';
import { AssignTournamentTables } from '../../../../../src/modules/tournament-tables/core/application/command/AssignTournamentTables';
import { TournamentTable } from '../../../../../src/modules/tournament-tables/core/domain/TournamentTable';
import { TableNumber } from '../../../../../src/modules/tournament-tables/core/domain/TableNumber';
import { tournamentTablesRestApiModule } from '../../../../../src/modules/tournament-tables/presentation/rest-api/TournamentTablesRestApiModule';
import { FindTablesByTournamentId } from '../../../../../src/modules/tournament-tables/core/application/query/FindTablesByTournamentId';

describe('Tournament Tables REST API', () => {
  it('POST /rest-api/tournaments/:tournamentId/tables | when command success', async () => {
    //Given
    const tournamentId = 'sampleTournamentId';
    const tables = [
      { tableNumber: 1, tableName: 'Leonhart' },
      { tableNumber: 2, tableName: 'Garlando' },
      { tableNumber: 3, tableName: 'Leonhart' },
    ];
    const commandPublisher = CommandPublisherMock(CommandResult.success());
    const { agent } = testModuleRestApi(tournamentTablesRestApiModule, { commandPublisher });

    //When
    const { body, status } = await agent.post('/rest-api/tournaments/sampleTournamentId/tables').send({ tables });

    //Then
    expect(commandPublisher.executeCalls).toBeCalledWith(new AssignTournamentTables(tournamentId, tables));
    expect(status).toBe(StatusCodes.OK);
    expect(body).toBeEmpty();
  });

  it('POST /rest-api/tournaments/:tournamentId/tables | when command failure', async () => {
    //Given
    const tournamentId = 'sampleTournamentId';
    const tables = [
      { tableNumber: 1, tableName: 'Leonhart' },
      { tableNumber: 2, tableName: 'Garlando' },
    ];
    const commandPublisher = CommandPublisherMock(
      CommandResult.failureDueTo(new Error('Some tables are already assigned to that tournament.')),
    );
    const { agent } = testModuleRestApi(tournamentTablesRestApiModule, { commandPublisher });

    //When
    const { body, status } = await agent.post('/rest-api/tournaments/sampleTournamentId/tables').send({ tables });

    //Then
    expect(commandPublisher.executeCalls).toBeCalledWith(new AssignTournamentTables(tournamentId, tables));
    expect(status).toBe(StatusCodes.BAD_REQUEST);
    expect(body).toStrictEqual({ message: 'Some tables are already assigned to that tournament.' });
  });

  it('GET /rest-api/tournaments/:tournamentId/tables | when tables for given tournament found', async () => {
    //Given
    const tournamentId = 'sampleTournamentId';
    const tables = [{ tableNumber: 10, tableName: 'P4P' }];
    const queryPublisher = QueryPublisherMock(
      new TournamentTable({
        tournamentId,
        tableNumber: TableNumber.from(10),
        tableName: 'P4P',
      }),
    );
    const { agent } = testModuleRestApi(tournamentTablesRestApiModule, { queryPublisher });

    //When
    const { body, status } = await agent.get('/rest-api/tournaments/sampleTournamentId/tables').send();

    //Then
    expect(queryPublisher.executeCalls).toBeCalledWith(new FindTablesByTournamentId({ tournamentId }));
    expect(status).toBe(StatusCodes.OK);
    expect(body).toStrictEqual({ tables });
  });

  it('GET /rest-api/tournaments/:tournamentId/tables | when tables for given tournament not found', async () => {
    //Given
    const tournamentId = 'sampleTournamentId';
    const queryPublisher = QueryPublisherMock(undefined);
    const { agent } = testModuleRestApi(tournamentTablesRestApiModule, { queryPublisher });

    //When
    const { body, status } = await agent.get('/rest-api/tournaments/sampleTournamentId/tables').send();

    //Then
    expect(queryPublisher.executeCalls).toBeCalledWith(new FindTablesByTournamentId({ tournamentId }));
    expect(status).toBe(StatusCodes.NOT_FOUND);
    expect(body).toStrictEqual({ message: 'Tables for given tournament not found!' });
  });
});
