import { DomainEvent } from '../../../../../shared/domain/event/DomainEvent';
import { TournamentType } from '../TournamentType';

export class TournamentRegistrationsWereClosed implements DomainEvent {
  readonly occurredAt: Date;
  readonly tournamentId: string;
  readonly registeredPlayersIds: string[];
  readonly tournamentType: TournamentType = TournamentType.DOUBLE;

  constructor(props: { occurredAt: Date; tournamentId: string; registeredPlayersIds: string[] }) {
    this.occurredAt = props.occurredAt;
    this.tournamentId = props.tournamentId;
    this.registeredPlayersIds = props.registeredPlayersIds;
  }
}
