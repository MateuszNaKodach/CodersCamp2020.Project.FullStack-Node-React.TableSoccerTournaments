import {testCreateTournamentWithTeamsModule} from "./TestCreateTournamentWithTeamsModule";
import {CreateTournamentWithTeams} from "../../../../../src/modules/doubles-tournament/core/application/CreateTournamentWithTeams";
import {TournamentWithTeamsWasCreated} from "../../../../../src/modules/doubles-tournament/core/domain/event/TournamentWithTeamsWasCreated";

describe('Create Tournament With Teams', () => {
    it('given paired players, when create tournament, then tournament was created with teams', async () => {
        //Given
        const currentTime = new Date();
        const tournamentCreation = testCreateTournamentWithTeamsModule(currentTime);
        const tournamentId = 'TournamentId';
        const tournamentPairs = [
            'Player1', 'Player2', 'PLayer3', 'Player4'
        ];

        //When
        const createTournamentWithTeams = new CreateTournamentWithTeams(tournamentId, tournamentPairs);
        const commandResult = await tournamentCreation.executeCommand(createTournamentWithTeams);

        //Then
        expect(commandResult.isSuccess()).toBeTruthy();

        expect(tournamentCreation.lastPublishedEvent()).toStrictEqual(
            new TournamentWithTeamsWasCreated( currentTime, tournamentId, tournamentPairs)
        );
    });
});