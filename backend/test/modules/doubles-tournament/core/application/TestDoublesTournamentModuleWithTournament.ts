import { TestModuleCore } from '../../../../test-support/shared/core/TestModuleCore';
import { FromListIdGeneratorStub } from '../../../../test-support/shared/core/FromListIdGeneratorStub';
import { testDoublesTournamentsModule } from './TestDoublesTournamentsModule';
import { CreateTournamentWithTeams } from '../../../../../src/modules/doubles-tournament/core/application/command/CreateTournamentWithTeams';

export async function createTournamentForTests(
  tournamentId: string,
  currentTime: Date,
  team1Id: string,
  team2Id: string,
): Promise<TestModuleCore> {
  const entityIdGen = FromListIdGeneratorStub([team1Id, team2Id]);
  const doublesTournament = testDoublesTournamentsModule(currentTime, entityIdGen);
  const tournamentPairs = [
    { player1: 'player1', player2: 'player2' },
    { player1: 'player3', player2: 'player4' },
  ];
  const createTournamentWithTeams = new CreateTournamentWithTeams(tournamentId, tournamentPairs);
  await doublesTournament.executeCommand(createTournamentWithTeams);
  return doublesTournament;
}
