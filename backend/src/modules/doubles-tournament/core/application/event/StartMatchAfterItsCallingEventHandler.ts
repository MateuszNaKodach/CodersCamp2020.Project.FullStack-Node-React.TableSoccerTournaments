import { EventHandler } from '../../../../../shared/core/application/event/EventHandler';
import { MatchWasCalled } from '../../domain/event/MatchWasCalled';
import { CommandPublisher } from '../../../../../shared/core/application/command/CommandBus';
import { StartMatch } from '../../../../match-module/core/application/command/StartMatch';
import { MatchId } from '../../domain/MatchId';

export class StartMatchAfterItsCallingEventHandler implements EventHandler<MatchWasCalled> {
  constructor(private readonly commandPublisher: CommandPublisher) {}

  async handle(event: MatchWasCalled): Promise<void> {
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
