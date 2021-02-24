import { testPlayersMatchingModule } from './TestPlayersMatchingModule';
import { PlayersWereMatchedIntoTeams } from '../../../../../src/modules/players-matching/core/domain/PlayersWereMatchedIntoTeams';
import { TournamentPair } from '../../../../../src/modules/players-matching/core/domain/TournamentPair';
import { TournamentRegistrationsWereClosed } from '../../../../../src/modules/tournaments-registrations/core/domain/event/TournamentRegistrationsWereClosed';

describe('Players Matching', function () {
  it('when tournament registrations closed, then match players into teams', async () => {
    //Given
    const currentTime = new Date();
    const tournamentsRegistrations = testPlayersMatchingModule(currentTime);
    const tournamentId = 'TournamentId';
    const registeredPlayersIds = ['Player1', 'Player2', 'Player3', 'Player4', 'Player5', 'Player6', 'Player7', 'Player8'];

    //When
    await tournamentsRegistrations.publishEvent(
      new TournamentRegistrationsWereClosed({ occurredAt: currentTime, tournamentId, registeredPlayersIds }),
    );

    expect(tournamentsRegistrations.lastPublishedEvent()).toStrictEqual(
      new PlayersWereMatchedIntoTeams(currentTime, tournamentId, [
        new TournamentPair('Player1', 'Player8'),
        new TournamentPair('Player2', 'Player7'),
        new TournamentPair('Player3', 'Player6'),
        new TournamentPair('Player4', 'Player5'),
      ]),
    );
  });
});
