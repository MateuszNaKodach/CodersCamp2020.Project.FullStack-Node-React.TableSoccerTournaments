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
import { MatchStatus } from '../../domain/MatchStatus';

export class EnqueueMatchCommandHandler implements CommandHandler<EnqueueMatch> {
  constructor(
    private readonly eventPublisher: DomainEventPublisher,
    private readonly currentTimeProvider: CurrentTimeProvider,
    private readonly repository: DoublesTournamentRepository,
    private readonly matchesQueueRepository: MatchesQueueRepository,
  ) {}

  async execute(command: EnqueueMatch): Promise<CommandResult> {
    const tournamentId = TournamentId.from(command.tournamentId);
    const matchNumber = MatchNumber.from(command.matchNumber);
    const team1Id = TeamId.from(command.team1Id);
    const team2Id = TeamId.from(command.team2Id);
    const { state: matchesQueue, version } = await this.matchesQueueRepository.findByTournamentId(command.tournamentId);
    const newCommand = {
      tournamentId: tournamentId,
      matchNumber: matchNumber,
      team1Id: team1Id,
      team2Id: team2Id,
      status: MatchStatus.ENQUEUED,
    };

    const { state, events } = pushMatchToQueue(matchesQueue, newCommand, this.currentTimeProvider());

    try {
      await this.matchesQueueRepository.save(state, version);
    } catch (e) {
      return CommandResult.failureDueTo(e.message);
    }
    this.eventPublisher.publishAll(events);
    return CommandResult.success();
  }
}
