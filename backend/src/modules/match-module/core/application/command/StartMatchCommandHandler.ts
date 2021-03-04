import { CommandHandler } from '../../../../../shared/core/application/command/CommandHandler';
import { StartMatch } from './StartMatch';
import { DomainEventPublisher } from '../../../../../shared/core/application/event/DomainEventBus';
import { CurrentTimeProvider } from '../../../../../shared/core/CurrentTimeProvider';
import { CommandResult } from '../../../../../shared/core/application/command/CommandResult';
import { startMatch } from '../../domain/Match';
import { MatchId } from '../../domain/MatchId';
import { MatchRepository } from '../MatchRepository';
import {MatchSideId} from "../../domain/MatchSideId";

export class StartMatchCommandHandler implements CommandHandler<StartMatch> {
  constructor(
    private readonly eventPublisher: DomainEventPublisher,
    private readonly currentTimeProvider: CurrentTimeProvider,
    private readonly repository: MatchRepository,
  ) {}

  async execute(command: StartMatch): Promise<CommandResult> {
    const matchId = MatchId.from(command.matchId);
    const firstMatchSideId = MatchSideId.from(command.firstMatchSideId);
    const secondMatchSideId = MatchSideId.from(command.secondMatchSideId);
    const match = await this.repository.findByMatchId(matchId);

    const { state, events } = startMatch(match, { matchId, firstMatchSideId, secondMatchSideId }, this.currentTimeProvider());
    await this.repository.save(state);
    this.eventPublisher.publishAll(events);
    return CommandResult.success();
  }
}
