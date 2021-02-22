import {CommandHandler} from "../../../../shared/application/command/CommandHandler";
import {OpenTournamentRegistrations} from "./OpenTournamentRegistrations";
import {CommandResult} from "../../../../shared/application/command/CommandResult";
import {DomainEventBus} from "../../../../shared/application/event/DomainEventBus";
import {CurrentTimeProvider} from "../../TournamentsRegistrationsModule";
import {TournamentRegistrations} from "../../domain/TournamentRegistrations";
import {TournamentId} from "../../domain/TournamentId";

export class OpenTournamentRegistrationsCommandHandler implements CommandHandler<OpenTournamentRegistrations> {

  constructor(
      private readonly eventBus: DomainEventBus,
      private readonly currentTimeProvider: CurrentTimeProvider
  ) {
  }

  async execute(command: OpenTournamentRegistrations): Promise<CommandResult> {
    const tournamentRegistrations = new TournamentRegistrations(this.currentTimeProvider)
    const events = tournamentRegistrations.openForTournament({tournamentId: TournamentId.from(command.tournamentId)})
    this.eventBus.publishAll(events)
    return CommandResult.success()
  }

}
