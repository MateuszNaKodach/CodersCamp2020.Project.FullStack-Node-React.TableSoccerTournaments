import {CommandHandler} from "../../../../shared/application/command/CommandHandler";
import {OpenTournamentRegistrations} from "./OpenTournamentRegistrations";
import {CommandResult} from "../../../../shared/application/command/CommandResult";
import {DomainEventBus} from "../../../../shared/application/event/DomainEventBus";
import {CurrentTimeProvider} from "../../TournamentsRegistrationsModule";
import {openTournamentRegistrations, TournamentRegistrations} from "../../domain/TournamentRegistrations";
import {TournamentId} from "../../domain/TournamentId";
import {TournamentRegistrationsRepository} from "../TournamentRegistrationsRepository";

export class OpenTournamentRegistrationsCommandHandler implements CommandHandler<OpenTournamentRegistrations> {

  constructor(
      private readonly eventBus: DomainEventBus,
      private readonly currentTimeProvider: CurrentTimeProvider,
      private readonly repository: TournamentRegistrationsRepository
  ) {
  }

  async execute(command: OpenTournamentRegistrations): Promise<CommandResult> {
    const tournamentId = TournamentId.from(command.tournamentId);
    const tournamentRegistrations = await this.repository.findByTournamentId(tournamentId)

    const {state, events} = openTournamentRegistrations(tournamentRegistrations, {tournamentId}, this.currentTimeProvider)

    await this.repository.save(state)
    this.eventBus.publishAll(events)
    return CommandResult.success()
  }

}
