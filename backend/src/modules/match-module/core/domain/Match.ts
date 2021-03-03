import { DomainEvent } from '../../../../shared/domain/event/DomainEvent';
import { MatchHasStarted } from './event/MatchHasStarted';

export class Match {
  readonly matchId: string;
  readonly firstTeamId: string;
  readonly secondTeamId: string;
  readonly winner: undefined;
  readonly hasEnded: boolean;

  constructor(props: { matchId: string; firstTeamId: string; secondTeamId: string; winner: undefined; hasEnded: boolean }) {
    this.matchId = props.matchId;
    this.firstTeamId = props.firstTeamId;
    this.secondTeamId = props.secondTeamId;
    this.winner = props.winner;
    this.hasEnded = props.hasEnded;
  }
}

export function startMatch(
  command: { matchId: string; firstTeamId: string; secondTeamId: string },
  currentTime: Date,
): { events: DomainEvent[] } {
  if (!command.firstTeamId || !command.secondTeamId) {
    throw new Error('Two teams are needed for match to start.');
  }
  return {
    events: [
      new MatchHasStarted({
        occurredAt: currentTime,
        matchId: command.matchId,
        firstTeamId: command.firstTeamId,
        secondTeamId: command.secondTeamId,
      }),
    ],
  };
}
