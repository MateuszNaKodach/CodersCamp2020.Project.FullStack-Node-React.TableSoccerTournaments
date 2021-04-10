import { EventHandler } from '../../../../shared/core/application/event/EventHandler';
import { PlayersWereMatchedIntoTeams } from '../domain/PlayersWereMatchedIntoTeams';
import { CommandPublisher } from '../../../../shared/core/application/command/CommandBus';
import { CreateTournamentWithTeams } from '../../../doubles-tournament/core/application/command/CreateTournamentWithTeams';

export class CreateTournamentWhenPlayersWereMatchedIntoTeams implements EventHandler<PlayersWereMatchedIntoTeams> {
  constructor(private readonly commandPublisher: CommandPublisher) {}

  async handle(event: PlayersWereMatchedIntoTeams): Promise<void> {
    await this.commandPublisher.execute(new CreateTournamentWithTeams(event.tournamentId, event.tournamentPair));
  }
}
