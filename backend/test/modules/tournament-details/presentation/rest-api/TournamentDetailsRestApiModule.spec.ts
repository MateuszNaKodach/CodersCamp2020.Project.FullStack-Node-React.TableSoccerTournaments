import {testModuleRestApi} from '../../../../test-support/shared/presentation/rest-api/TestModuleRestApi';
import {StatusCodes} from 'http-status-codes';
import {CommandPublisherMock} from '../../../../test-support/shared/core/CommandPublisherMock';
import {CommandResult} from '../../../../../src/shared/core/application/command/CommandResult';
import {QueryPublisherMock} from '../../../../test-support/shared/core/QueryPublisherMock';
import {TournamentDetailsRestApiModule} from "../../../../../src/modules/tournament-details/presentation/rest-api/TournamentDetailsRestApiModule";
import {AddTournamentDetails} from "../../../../../src/modules/tournament-details/core/application/command/AddTournamentDetails";
import {TournamentDetails} from "../../../../../src/modules/tournament-details/core/domain/TournamentDetails";
import {TournamentName} from "../../../../../src/modules/tournament-details/core/domain/TournamentName";
import {FindAllTournamentDetails} from "../../../../../src/modules/tournament-details/core/application/query/FindAllTournamentDetails";

describe('Tournament Details REST API', () => {
    it('POST /rest-api/tournament-details | when command success', async () => {
        //Given
        const commandPublisher = CommandPublisherMock(CommandResult.success());
        const { agent } = testModuleRestApi(TournamentDetailsRestApiModule, { commandPublisher });

        //When
        const { body, status } = await agent.post('/rest-api/tournament-details').send({ tournamentId: 'SampleTournamentId', tournamentName: 'SampleName' });

        //Then
        expect(commandPublisher.executeCalls).toBeCalledWith(new AddTournamentDetails({ tournamentId: 'SampleTournamentId', tournamentName: 'SampleName' }));
        expect(status).toBe(StatusCodes.CREATED);
        expect(body).toStrictEqual({ tournamentId: 'SampleTournamentId', tournamentName: 'SampleName' });
    });

    it('POST /rest-api/tournament-details | when command failure', async () => {
        //Given
        const commandPublisher = CommandPublisherMock(CommandResult.failureDueTo(new Error('Tournament name must have at least 3 characters.')));
        const { agent } = testModuleRestApi(TournamentDetailsRestApiModule, { commandPublisher });

        //When
        const { body, status } = await agent.post('/rest-api/tournament-details').send({ tournamentId: 'SampleTournamentId', tournamentName: 'BB' });

        //Then
        expect(commandPublisher.executeCalls).toBeCalledWith(new AddTournamentDetails({ tournamentId: 'SampleTournamentId', tournamentName: 'BB' }));
        expect(status).toBe(StatusCodes.BAD_REQUEST);
        expect(body).toStrictEqual({ message: 'Tournament name must have at least 3 characters.' });
    });

    it('GET /rest-api/tournament-details', async () => {
        //Given
        const queryPublisher = QueryPublisherMock([
            new TournamentDetails({
                tournamentId: 'SampleTournamentId1',
                tournamentName: TournamentName.from('SampleTournamentName1'),
            }),
            new TournamentDetails({
                tournamentId: 'SampleTournamentId2',
                tournamentName: TournamentName.from('SampleTournamentName2'),
            }),
        ]);
        const { agent } = testModuleRestApi(TournamentDetailsRestApiModule, { queryPublisher });

        //When
        const { body, status } = await agent.get('/rest-api/tournament-details').send();

        //Then
        expect(queryPublisher.executeCalls).toBeCalledWith(new FindAllTournamentDetails());
        expect(status).toBe(StatusCodes.OK);
        expect(body).toStrictEqual({
            items: [
                {
                    tournamentId: 'SampleTournamentId1',
                    tournamentName: 'SampleTournamentName1',
                },
                {
                    tournamentId: 'SampleTournamentId2',
                    tournamentName: 'SampleTournamentName2',
                },
            ],
        });
    });
});
