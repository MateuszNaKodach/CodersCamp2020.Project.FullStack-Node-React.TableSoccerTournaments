import { testTournamentsDetailsModule } from './TestTournamentDetailsModule';
import {
  FindAllTournamentDetails,
  FindAllTournamentDetailsResult,
} from '../../../../../src/modules/tournament-details/core/application/query/FindAllTournamentDetails';
import { TournamentId } from '../../../../../src/modules/tournaments-registrations/core/domain/TournamentId';
import { AddTournamentDetails } from '../../../../../src/modules/tournament-details/core/application/command/AddTournamentDetails';
import { TournamentDetails } from '../../../../../src/modules/tournament-details/core/domain/TournamentDetails';
import { TournamentName } from '../../../../../src/modules/tournament-details/core/domain/TournamentName';

describe('Tournament Details | Query Side', () => {
  it('FindAllTournamentDetailsResult | No tournaments details', async () => {
    //Given
    const currentTime = new Date();
    const tournamentsDetails = testTournamentsDetailsModule(currentTime);

    //When
    const findAllTournamentDetailsResult = await tournamentsDetails.executeQuery<FindAllTournamentDetailsResult>(
      new FindAllTournamentDetails(),
    );

    //Then
    expect(findAllTournamentDetailsResult).toBeEmpty();
  });

  it('FindAllTournamentDetailsResult | One tournament details was added', async () => {
    //Given
    const currentTime = new Date();
    const tournamentsDetails = testTournamentsDetailsModule(currentTime);
    const tournamentId = 'TournamentId';
    const tournamentName = 'TournamentName';

    const addTournamentDetails = new AddTournamentDetails({ tournamentId, tournamentName });
    await tournamentsDetails.executeCommand(addTournamentDetails);

    //When
    const findAllTournamentDetailsResult = await tournamentsDetails.executeQuery<FindAllTournamentDetailsResult>(
      new FindAllTournamentDetails(),
    );

    //Then
    expect(findAllTournamentDetailsResult).toIncludeSameMembers([
      new TournamentDetails({
        tournamentId: tournamentId,
        tournamentName: TournamentName.from(tournamentName),
      }),
    ]);
  });

  it('FindAllTournamentDetailsResult | Three tournaments details was added', async () => {
    //Given
    const currentTime = new Date();
    const tournamentsDetails = testTournamentsDetailsModule(currentTime);

    const tournamentId1 = 'TournamentId1';
    const tournamentName1 = 'TournamentName1';
    const addTournamentDetails1 = new AddTournamentDetails({ tournamentId: tournamentId1, tournamentName: tournamentName1 });
    await tournamentsDetails.executeCommand(addTournamentDetails1);

    const tournamentId2 = 'TournamentId2';
    const tournamentName2 = 'TournamentName2';
    const addTournamentDetails2 = new AddTournamentDetails({ tournamentId: tournamentId2, tournamentName: tournamentName2 });
    await tournamentsDetails.executeCommand(addTournamentDetails2);

    const tournamentId3 = 'TournamentId3';
    const tournamentName3 = 'TournamentName3';
    const addTournamentDetails3 = new AddTournamentDetails({ tournamentId: tournamentId3, tournamentName: tournamentName3 });
    await tournamentsDetails.executeCommand(addTournamentDetails3);

    //When
    const findAllTournamentDetailsResult = await tournamentsDetails.executeQuery<FindAllTournamentDetailsResult>(
      new FindAllTournamentDetails(),
    );

    //Then
    expect(findAllTournamentDetailsResult).toIncludeSameMembers([
      new TournamentDetails({
        tournamentId: tournamentId1,
        tournamentName: TournamentName.from(tournamentName1),
      }),
      new TournamentDetails({
        tournamentId: tournamentId2,
        tournamentName: TournamentName.from(tournamentName2),
      }),
      new TournamentDetails({
        tournamentId: tournamentId3,
        tournamentName: TournamentName.from(tournamentName3),
      }),
    ]);
  });
});
