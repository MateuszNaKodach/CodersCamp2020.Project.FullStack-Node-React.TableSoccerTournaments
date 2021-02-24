import { TournamentPair } from './TournamentPair';
import { DomainEvent } from '../../../../shared/domain/event/DomainEvent';

export class PlayersWereMatchedIntoTeams implements DomainEvent {
  readonly occurredAt: Date;
  readonly tournamentId: string;
  readonly tournamentPair: TournamentPair[];

  constructor(occurredAt: Date, tournamentId: string, tournamentPair: TournamentPair[]) {
    this.occurredAt = occurredAt;
    this.tournamentId = tournamentId;
    this.tournamentPair = tournamentPair;
  }
}
