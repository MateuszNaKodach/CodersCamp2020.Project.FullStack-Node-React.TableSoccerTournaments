import 'jest-extended';
import { OpenTournamentRegistrations } from '../../../../src/modules/tournaments-registrations/core/application/command/OpenTournamentRegistrations';
import { testTournamentsRegistrationsModule } from './TestTournamentsRegistrationsModule';

describe('Tournament Registrations | Query Side', () => {
  describe('', async () => {
    //Given
    const currentTime = new Date();
    const tournamentsRegistrations = testTournamentsRegistrationsModule(currentTime);
    const tournamentId = 'TournamentId';

    const openTournamentRegistrations = new OpenTournamentRegistrations({ tournamentId });
    const commandResult = await tournamentsRegistrations.executeCommand(openTournamentRegistrations);

    //When
  });
});

//Then //HINT: Sekcje Given i When można przenieś i zrobić jedno Then na test. Ale zastanowić się czy to ma sens :)
//const findAllTournamentRegistrationsResult = await tournamentsRegistrations.executeQuery<FindAllTournamentRegistrationsResult>(new FindAllTournamentRegistrations())
//expect(findAllTournamentRegistrationsResult).toIncludeSameMembers([new TournamentRegistrations({tournamentId: TournamentId.from()})])

//Then
//const findAllTournamentRegistrationsResult = await tournamentsRegistrations.executeQuery<FindAllTournamentRegistrationsResult>(new FindAllTournamentRegistrations())
//expect(findAllTournamentRegistrationsResult).toBeEmpty()
