import { TestModuleCore } from '../../../../test-support/shared/core/TestModuleCore';
import { PlayerProfileWasCreated } from '../../../../../src/modules/player-profiles/core/domain/event/PlayerProfileWasCreated';
import { janKowalski } from '../../../../test-support/shared/core/people';
import { RegisterPlayerForTournament } from '../../../../../src/modules/tournaments-registrations/core/application/command/RegisterPlayerForTournament';

export async function registerPlayerForTournament(tournamentsRegistrations: TestModuleCore, playerId: string, tournamentId: string) {
  const playerProfileWasCreated = new PlayerProfileWasCreated({ occurredAt: new Date(), playerId, ...janKowalski });
  tournamentsRegistrations.publishEvent(playerProfileWasCreated);
  const registerPlayerForTournament = new RegisterPlayerForTournament({ tournamentId, playerId });
  return await tournamentsRegistrations.executeCommand(registerPlayerForTournament);
}
