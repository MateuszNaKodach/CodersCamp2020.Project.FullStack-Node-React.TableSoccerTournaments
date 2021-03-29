import { EventHandler } from '../../../../../shared/core/application/event/EventHandler';
import { MatchWasCalled } from '../../domain/event/MatchWasCalled';
import { CommandPublisher } from '../../../../../shared/core/application/command/CommandBus';
import { StartMatch } from '../../../../match-module/core/application/command/StartMatch';
import { MatchId } from '../../domain/MatchId';
import { TournamentId } from '../../domain/TournamentId';
import { QueuedMatch, startMatchInMatchesQueue } from '../../domain/QueuedMatch';
import { MatchNumber } from '../../domain/MatchNumber';
import { TeamId } from '../../domain/TeamId';
import { MatchesQueueRepository } from '../MatchesQueueRepository';

export class StartMatchAfterItsCalling implements EventHandler<MatchWasCalled> {
  private readonly commandPublisher: CommandPublisher;
  private readonly matchesQueueRepository: MatchesQueueRepository;

  constructor(commandPublisher: CommandPublisher, matchesQueueRepository: MatchesQueueRepository) {
    this.commandPublisher = commandPublisher;
    this.matchesQueueRepository = matchesQueueRepository;
  }

  async handle(event: MatchWasCalled): Promise<void> {
  const tournamentId = TournamentId.from(event.tournamentId);
  const startedMatch: QueuedMatch = {
    matchNumber: MatchNumber.from(event.calledMatch.matchNumber),
    team1Id: TeamId.from(event.calledMatch.team1Id),
    team2Id: TeamId.from(event.calledMatch.team2Id),
    tableNumber: event.tableNumber,
    started: true,
  };
  const matchesQueue = await this.matchesQueueRepository.findByTournamentId(tournamentId.raw);
  const queue = startMatchInMatchesQueue(tournamentId, startedMatch, matchesQueue);
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
