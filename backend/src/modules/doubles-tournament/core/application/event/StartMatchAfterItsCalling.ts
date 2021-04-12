import { EventHandler } from '../../../../../shared/core/application/event/EventHandler';
import { MatchWasCalled } from '../../domain/event/MatchWasCalled';
import { CommandPublisher } from '../../../../../shared/core/application/command/CommandBus';
import { StartMatch } from '../../../../match-module/core/application/command/StartMatch';
import { MatchId } from '../../domain/MatchId';
import { TournamentId } from '../../domain/TournamentId';
import { changeMatchStatusInMatchesQueue } from '../../domain/QueuedMatch';
import { MatchNumber } from '../../domain/MatchNumber';
import { MatchesQueueRepository } from '../MatchesQueueRepository';
import { MatchStatus } from '../../domain/MatchStatus';

export class StartMatchAfterItsCalling implements EventHandler<MatchWasCalled> {
  private readonly commandPublisher: CommandPublisher;
  private readonly matchesQueueRepository: MatchesQueueRepository;

  constructor(commandPublisher: CommandPublisher, matchesQueueRepository: MatchesQueueRepository) {
    this.commandPublisher = commandPublisher;
    this.matchesQueueRepository = matchesQueueRepository;
  }

  async handle(event: MatchWasCalled): Promise<void> {
    const tournamentId = TournamentId.from(event.tournamentId);
    const matchNumber = MatchNumber.from(event.calledMatch.matchNumber);
    const tableNumber = event.tableNumber;
    const matchesQueue = await this.matchesQueueRepository.findByTournamentId(tournamentId.raw);
    const queue = changeMatchStatusInMatchesQueue(tournamentId, matchNumber, matchesQueue, MatchStatus.STARTED, tableNumber);
    await this.matchesQueueRepository.save(queue);

    const matchId = MatchId.from(event.tournamentId, event.calledMatch.matchNumber);
    await this.commandPublisher.execute(
      new StartMatch({
        matchId: matchId.raw,
        firstMatchSideId: event.calledMatch.team1Id,
        secondMatchSideId: event.calledMatch.team2Id,
      }),
    );
  }
}
