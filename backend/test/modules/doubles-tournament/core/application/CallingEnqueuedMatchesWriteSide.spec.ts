import { testDoublesTournamentsModule } from './TestDoublesTournamentsModule';
import { FromListIdGeneratorStub } from '../../../../test-support/shared/core/FromListIdGeneratorStub';
import { MatchWasQueued } from '../../../../../src/modules/doubles-tournament/core/domain/event/MatchWasQueued';
import { InMemoryCommandBus } from '../../../../../src/shared/infrastructure/core/application/command/InMemoryCommandBus';
import { TournamentTableWasBooked } from '../../../../../src/modules/tournament-tables/core/domain/event/TournamentTableWasBooked';
import { TournamentTableWasReleased } from '../../../../../src/modules/tournament-tables/core/domain/event/TournamentTableWasReleased';
import { CallMatch } from '../../../../../src/modules/doubles-tournament/core/application/command/CallMatch';

describe('Calling Enqueued Matches | Write Side', () => {
  it('When matches were enqueued and only one table was released then call the first match', async () => {
    //Given
    const team1Id = 'Team1Id';
    const team2Id = 'Team2Id';
    const team3Id = 'Team3Id';
    const team4Id = 'Team4Id';
    const team5Id = 'Team4Id';
    const team6Id = 'Team4Id';
    const currentTime = new Date();
    const entityIdGen = FromListIdGeneratorStub([team1Id, team2Id, team3Id, team4Id, team5Id, team6Id]);
    const tournamentId = 'TournamentId';
    const doublesTournament = testDoublesTournamentsModule(currentTime, entityIdGen);
    const commandBus = new InMemoryCommandBus();

    //When
    await doublesTournament.publishEvent(
      new MatchWasQueued({
        occurredAt: currentTime,
        matchNumber: 5,
        team1Id: team1Id,
        team2Id: team2Id,
      }),
    );
    await doublesTournament.publishEvent(
      new MatchWasQueued({
        occurredAt: currentTime,
        matchNumber: 3,
        team1Id: team3Id,
        team2Id: team4Id,
      }),
    );
    await doublesTournament.publishEvent(
      new MatchWasQueued({
        occurredAt: currentTime,
        matchNumber: 4,
        team1Id: team5Id,
        team2Id: team6Id,
      }),
    );
    await doublesTournament.publishEvent(
      new TournamentTableWasBooked({ occurredAt: currentTime, tournamentId: tournamentId, tableNumber: 1 }),
    );
    await doublesTournament.publishEvent(
      new TournamentTableWasReleased({ occurredAt: currentTime, tournamentId: tournamentId, tableNumber: 2 }),
    );

    //Then
    const callFirstMatch = new CallMatch({
      tournamentId: tournamentId,
      calledMatch: { matchNumber: 3, team1Id: team3Id, team2Id: team4Id },
      tableNumber: 2,
    });
    expect(commandBus.execute).toHaveBeenLastCalledWith(callFirstMatch);

    //When
    await doublesTournament.publishEvent(
      new TournamentTableWasReleased({ occurredAt: currentTime, tournamentId: tournamentId, tableNumber: 1 }),
    );

    //Then
    const callSecondMatch = new CallMatch({
      tournamentId: tournamentId,
      calledMatch: { matchNumber: 4, team1Id: team5Id, team2Id: team6Id },
      tableNumber: 1,
    });
    expect(commandBus.execute).toHaveBeenLastCalledWith(callSecondMatch);
  });
});
