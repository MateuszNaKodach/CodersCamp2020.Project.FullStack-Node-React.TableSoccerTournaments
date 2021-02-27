import { DomainEvent } from '../../../../../shared/domain/event/DomainEvent';
import { TournamentTeam } from '../TournamentTeam';

export class TournamentWithTeamsWasCreated implements DomainEvent {
  readonly occurredAt: Date;
  readonly tournamentId: string;
  readonly tournamentTeams: TournamentTeam[];

  constructor(props: { occurredAt: Date, tournamentId: string, tournamentTeams: TournamentTeam[] }) {
    this.occurredAt = props.occurredAt;
    this.tournamentId = props.tournamentId;
    this.tournamentTeams = props.tournamentTeams;
  }
}
