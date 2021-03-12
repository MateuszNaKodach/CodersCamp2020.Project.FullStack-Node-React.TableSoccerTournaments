import { CommandHandler } from '../../../../../shared/core/application/command/CommandHandler';
import { EnqueueMatch } from './EnqueueMatch';
import { CommandResult } from '../../../../../shared/core/application/command/CommandResult';
import { DoublesTournamentRepository } from '../DoublesTournamentRepository';
import { CurrentTimeProvider } from '../../../../../shared/core/CurrentTimeProvider';
import { DomainEventPublisher } from '../../../../../shared/core/application/event/DomainEventBus';
import { TournamentId } from '../../domain/TournamentId';
import { TeamId } from '../../domain/TeamId';
import { MatchesQueueRepository } from '../MatchesQueueRepository';
import { pushMatchToQueue } from '../../domain/QueuedMatch';
import { MatchNumber } from '../../domain/MatchNumber';

export class EnqueueMatchCommandHandler implements CommandHandler<EnqueueMatch> {
  constructor(
    private readonly eventPublisher: DomainEventPublisher,
    private readonly currentTimeProvider: CurrentTimeProvider,
    private readonly repository: DoublesTournamentRepository,
    private readonly matchesQueue: MatchesQueueRepository,
  ) {}

  async execute(command: EnqueueMatch): Promise<CommandResult> {
    const tournamentId = TournamentId.from(command.tournamentId);
    const matchNumber = MatchNumber.from(command.matchNumber);
    const team1Id = TeamId.from(command.team1Id);
    const team2Id = TeamId.from(command.team2Id);
    const doublesTournament = await this.repository.findByTournamentId(command.tournamentId);
    const matchesQueue = await this.matchesQueue.findByTournamentId(command.tournamentId);
    const newCommand = {
      tournamentId: tournamentId,
      matchNumber: matchNumber,
      team1Id: team1Id,
      team2Id: team2Id,
    };

    const { state, events } = pushMatchToQueue(doublesTournament, matchesQueue, newCommand, this.currentTimeProvider());

    await this.matchesQueue.save(state);
    this.eventPublisher.publishAll(events);
    return CommandResult.success();
  }
}
