import { testDoublesTournamentsModule } from './TestDoublesTournamentsModule';
import { FromListIdGeneratorStub } from '../../../../test-support/shared/core/FromListIdGeneratorStub';
import { MatchWasQueued } from '../../../../../src/modules/doubles-tournament/core/domain/event/MatchWasQueued';
import { InMemoryCommandBus } from '../../../../../src/shared/infrastructure/core/application/command/InMemoryCommandBus';
import { TournamentTableWasBooked } from '../../../../../src/modules/tournament-tables/core/domain/event/TournamentTableWasBooked';
import { TournamentTableWasReleased } from '../../../../../src/modules/tournament-tables/core/domain/event/TournamentTableWasReleased';
import { CallMatch } from '../../../../../src/modules/doubles-tournament/core/application/command/CallMatch';
import { MatchWasCalled } from '../../../../../src/modules/doubles-tournament/core/domain/event/MatchWasCalled';

describe('Calling Enqueued Matches', () => {
  const team1Id = 'Team1Id';
  const team2Id = 'Team2Id';
  const team3Id = 'Team3Id';
  const team4Id = 'Team4Id';
  const tournamentId = 'TournamentId';
  const commandBus = new InMemoryCommandBus();
  const spy = jest.spyOn(commandBus, 'execute');

  it('When matches were enqueued and only one table was released then call the match with lower matchNumber', async () => {
    //Given
    const currentTime = new Date();
    const entityIdGen = FromListIdGeneratorStub([team1Id, team2Id, team3Id, team4Id]);
    const doublesTournament = testDoublesTournamentsModule(currentTime, entityIdGen);

    //When
    await doublesTournament.publishEvent(
      new MatchWasQueued({
        occurredAt: currentTime,
        tournamentId: tournamentId,
        matchNumber: 5,
        team1Id: team1Id,
        team2Id: team2Id,
      }),
    );
    await doublesTournament.publishEvent(
      new MatchWasQueued({
        occurredAt: currentTime,
        tournamentId: tournamentId,
        matchNumber: 3,
        team1Id: team3Id,
        team2Id: team4Id,
      }),
    );
    await doublesTournament.publishEvent(
      new TournamentTableWasBooked({ occurredAt: currentTime, tournamentId: tournamentId, tableNumber: 1 }),
    );
    await doublesTournament.publishEvent(
      new TournamentTableWasReleased({ occurredAt: currentTime, tournamentId: tournamentId, tableNumber: 2 }),
    );

    //Then
    const callMatch = new CallMatch({
      tournamentId: tournamentId,
      calledMatch: { matchNumber: 3, team1Id: team3Id, team2Id: team4Id },
      tableNumber: 2,
    });
    expect(spy).toHaveBeenCalledWith(callMatch);
  });

  it('When tables are free and new matches were enqueued then call both matches', async () => {
    //Given
    const currentTime = new Date();
    const entityIdGen = FromListIdGeneratorStub([team1Id, team2Id, team3Id, team4Id]);
    const doublesTournament = testDoublesTournamentsModule(currentTime, entityIdGen);
    await doublesTournament.publishEvent(
      new TournamentTableWasReleased({ occurredAt: currentTime, tournamentId: tournamentId, tableNumber: 2 }),
    );
    await doublesTournament.publishEvent(
      new TournamentTableWasReleased({ occurredAt: currentTime, tournamentId: tournamentId, tableNumber: 1 }),
    );
    //When
    await doublesTournament.publishEvent(
      new MatchWasQueued({
        occurredAt: currentTime,
        tournamentId: tournamentId,
        matchNumber: 5,
        team1Id: team1Id,
        team2Id: team2Id,
      }),
    );
    await doublesTournament.publishEvent(
      new MatchWasQueued({
        occurredAt: currentTime,
        tournamentId: tournamentId,
        matchNumber: 3,
        team1Id: team3Id,
        team2Id: team4Id,
      }),
    );

    //Then
    const callMatch = new CallMatch({
      tournamentId: tournamentId,
      calledMatch: { matchNumber: 3, team1Id: team3Id, team2Id: team4Id },
      tableNumber: 1,
    });
    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenLastCalledWith(callMatch);
  });

  it('When match was enqueued and no table was released then do not call the match', async () => {
    //Given
    const currentTime = new Date();
    const entityIdGen = FromListIdGeneratorStub([team1Id, team2Id]);
    const doublesTournament = testDoublesTournamentsModule(currentTime, entityIdGen);

    //When
    await doublesTournament.publishEvent(
      new MatchWasQueued({
        occurredAt: currentTime,
        tournamentId: tournamentId,
        matchNumber: 3,
        team1Id: team1Id,
        team2Id: team2Id,
      }),
    );
    await doublesTournament.publishEvent(
      new TournamentTableWasBooked({ occurredAt: currentTime, tournamentId: tournamentId, tableNumber: 1 }),
    );

    //Then
    expect(spy).not.toHaveBeenCalled();
  });

  it('When match was already called then do not call the match again', async () => {
    //Given
    const currentTime = new Date();
    const entityIdGen = FromListIdGeneratorStub([team1Id, team2Id]);
    const doublesTournament = testDoublesTournamentsModule(currentTime, entityIdGen);
    await doublesTournament.publishEvent(
      new MatchWasQueued({
        occurredAt: currentTime,
        tournamentId: tournamentId,
        matchNumber: 3,
        team1Id: team1Id,
        team2Id: team2Id,
      }),
    );

    //When
    await doublesTournament.publishEvent(
      new MatchWasCalled({
        occurredAt: currentTime,
        tournamentId: tournamentId,
        calledMatch: {
          matchNumber: 3,
          team1Id: team1Id,
          team2Id: team2Id,
        },
        tableNumber: 1,
      }),
    );
    await doublesTournament.publishEvent(
      new TournamentTableWasReleased({ occurredAt: currentTime, tournamentId: tournamentId, tableNumber: 2 }),
    );

    //Then
    expect(spy).not.toHaveBeenCalled();
  });
});
