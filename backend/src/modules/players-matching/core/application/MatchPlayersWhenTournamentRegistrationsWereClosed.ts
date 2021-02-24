import { EventHandler } from '../../../../shared/core/application/event/EventHandler';
import { TournamentRegistrationsWereClosed } from '../../../tournaments-registrations/core/domain/event/TournamentRegistrationsWereClosed';
import { CommandPublisher } from '../../../../shared/core/application/command/CommandBus';
import { TournamentType } from '../../../tournaments-registrations/core/domain/TournamentType';
import { MatchPlayersToTeams } from './MatchPlayersToTeams';

export class MatchPlayersWhenTournamentRegistrationsWereClosed implements EventHandler<TournamentRegistrationsWereClosed> {
  constructor(private readonly commandPublisher: CommandPublisher) {}

  async handle(event: TournamentRegistrationsWereClosed): Promise<void> {
    if (event.tournamentType === TournamentType.DOUBLE) {
      await this.commandPublisher.execute(new MatchPlayersToTeams(event.tournamentId, event.registeredPlayersIds));
    }
  }
}
