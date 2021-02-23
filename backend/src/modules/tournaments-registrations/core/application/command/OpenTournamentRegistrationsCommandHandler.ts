import { CommandHandler } from "../../../../../shared/core/application/command/CommandHandler";
import { OpenTournamentRegistrations } from "./OpenTournamentRegistrations";
import { CommandResult } from "../../../../../shared/core/application/command/CommandResult";
import { DomainEventPublisher } from "../../../../../shared/core/application/event/DomainEventBus";
import { openTournamentRegistrations } from "../../domain/TournamentRegistrations";
import { TournamentId } from "../../domain/TournamentId";
import { TournamentRegistrationsRepository } from "../TournamentRegistrationsRepository";
import { CurrentTimeProvider } from "../../../../../shared/core/CurrentTimeProvider";

export class OpenTournamentRegistrationsCommandHandler implements CommandHandler<OpenTournamentRegistrations> {
  constructor(
    private readonly eventPublisher: DomainEventPublisher,
    private readonly currentTimeProvider: CurrentTimeProvider,
    private readonly repository: TournamentRegistrationsRepository,
  ) {}

  async execute(command: OpenTournamentRegistrations): Promise<CommandResult> {
    const tournamentId = TournamentId.from(command.tournamentId);
    const tournamentRegistrations = await this.repository.findByTournamentId(tournamentId);

    const { state, events } = openTournamentRegistrations(tournamentRegistrations, { tournamentId }, this.currentTimeProvider);

    await this.repository.save(state);
    this.eventPublisher.publishAll(events);
    return CommandResult.success();
  }
}
