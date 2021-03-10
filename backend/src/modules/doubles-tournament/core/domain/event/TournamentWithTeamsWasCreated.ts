import { DomainEvent } from '../../../../../shared/domain/event/DomainEvent';

export class TournamentWithTeamsWasCreated implements DomainEvent {
  readonly occurredAt: Date;
  readonly tournamentId: string;
  readonly tournamentTeams: { teamId: string; firstTeamPlayerId: string; secondTeamPlayerId: string }[];

  constructor(props: {
    occurredAt: Date;
    tournamentId: string;
    tournamentTeams: { teamId: string; firstTeamPlayerId: string; secondTeamPlayerId: string }[];
  }) {
    this.occurredAt = props.occurredAt;
    this.tournamentId = props.tournamentId;
    this.tournamentTeams = props.tournamentTeams;
  }
}
