import { DomainEvent } from '../../../../shared/domain/event/DomainEvent';
import { MatchHasStarted } from './event/MatchHasStarted';

export class Match {
  readonly matchId: string;
  readonly team1: string;
  readonly team2: string;

  constructor(props: { matchId: string; team1: string; team2: string }) {
    this.matchId = props.matchId;
    this.team1 = props.team1;
    this.team2 = props.team2;
  }
}

export function startMatch(command: { matchId: string; team1: string; team2: string }, currentTime: Date): { events: DomainEvent[] } {
  return {
    events: [new MatchHasStarted({ occurredAt: currentTime, matchId: command.matchId, team1: command.team1, team2: command.team2 })],
  };
}
