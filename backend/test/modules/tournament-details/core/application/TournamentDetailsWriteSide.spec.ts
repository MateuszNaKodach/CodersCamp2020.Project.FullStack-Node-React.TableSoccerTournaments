import {AddTournamentDetails} from "../../../../../src/modules/tournament-details/core/application/command/AddTournamentDetails";
import {testTournamentsDetailsModule} from "./TestTournamentDetailsModule";
import {CommandResult} from "../../../../../src/shared/core/application/command/CommandResult";
import Failure = CommandResult.Failure;

describe('Tournament Details | Write Side', () => {
    it('given not existing tournament details, when add tournament details, then tournament details were added', async () => {
        //Given
        const currentTime = new Date();
        const tournamentsDetails = testTournamentsDetailsModule(currentTime);
        const tournamentId = 'TournamentId';
        const tournamentName = 'WrocLove';

        //When
        const addTournamentDetails = new AddTournamentDetails({tournamentId, tournamentName});
        const commandResult = await tournamentsDetails.executeCommand(addTournamentDetails);

        //Then
        expect(commandResult.isSuccess()).toBeTruthy();
    });

    it('given not existing tournament details, when add tournament details with tournament name shorter than 3 characters, then throw error', async () => {
        //Given
        const currentTime = new Date();
        const tournamentsDetails = testTournamentsDetailsModule(currentTime);
        const tournamentId = 'TournamentId';
        const tournamentName = 'BB';

        //When
        const addTournamentDetails = new AddTournamentDetails({tournamentId, tournamentName});
        const commandResult = await tournamentsDetails.executeCommand(addTournamentDetails);

        //Then
        expect(commandResult.isSuccess()).toBeFalsy();
        expect((commandResult as Failure).reason).toStrictEqual(
            new Error('Tournament name must have at least 3 characters.')
        )
    });
});