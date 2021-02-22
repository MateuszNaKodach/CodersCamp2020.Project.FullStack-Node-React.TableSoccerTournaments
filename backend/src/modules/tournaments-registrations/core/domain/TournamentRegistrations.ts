import {TournamentId} from "./TournamentId";
import {DomainEvent} from "../../../shared/domain/event/DomainEvent";
import {CurrentTimeProvider} from "../TournamentsRegistrationsModule";
import {TournamentRegistrationsWasOpened} from "./event/TournamentRegistrationsWasOpened";
import {RegistrationsStatus} from "./RegistrationsStatus";
import {PlayerId} from "./PlayerId";
import {PlayerWasRegisteredForTournament} from "./event/PlayerWasRegisteredForTournament";

export type DomainCommandResult<StateType> = {
  state: StateType,
  events: DomainEvent[]
}

export class TournamentRegistrations {
  readonly tournamentId: TournamentId;
  readonly status: RegistrationsStatus | undefined;
  readonly registeredPlayers: PlayerId[] = []

  constructor(props: { tournamentId: TournamentId, status?: RegistrationsStatus, registeredPlayers?: PlayerId[] }) {
    this.tournamentId = props.tournamentId;
    this.status = props.status;
    this.registeredPlayers = props.registeredPlayers ?? []
  }

  equals(other: TournamentRegistrations | undefined) {
    return other?.tournamentId === this.tournamentId
  }

}

export function openTournamentRegistrations(
    state: TournamentRegistrations | undefined,
    command: { tournamentId: TournamentId },
    currentTimeProvider: CurrentTimeProvider
): DomainCommandResult<TournamentRegistrations> {
  if (state?.status !== undefined) {
    throw new Error('Registrations was opened before!')
  }
  const tournamentRegistrationsWasOpened = new TournamentRegistrationsWasOpened({occurredAt: currentTimeProvider(), tournamentId: command.tournamentId.raw});
  const openedTournament = onTournamentRegistrationsWasOpened(state, tournamentRegistrationsWasOpened);
  return {
    state: openedTournament,
    events: [tournamentRegistrationsWasOpened]
  };
}

function onTournamentRegistrationsWasOpened(state: TournamentRegistrations | undefined, event: TournamentRegistrationsWasOpened): TournamentRegistrations {
  return new TournamentRegistrations(
      {
        tournamentId: TournamentId.from(event.tournamentId),
        status: RegistrationsStatus.OPENED
      }
  )
}

export function registerTournamentPlayer(
    state: TournamentRegistrations | undefined,
    command: { playerId: PlayerId },
    currentTimeProvider: CurrentTimeProvider,
    canPlayerTakiePartInTheTournament: Boolean
): DomainCommandResult<TournamentRegistrations> {
  if (state?.status !== RegistrationsStatus.OPENED) {
    throw new Error('Cannot register player for closed tournament registrations!')
  }
  if (!canPlayerTakiePartInTheTournament) {
    throw new Error(`Player with id = ${command.playerId.raw} cannot take part in the tournament!`)
  }
  const playerWasRegisteredForTournament = new PlayerWasRegisteredForTournament({occurredAt: currentTimeProvider(), playerId: command.playerId.raw, tournamentId: state.tournamentId.raw})
  const tournamentWithRegisteredPlayer = onPlayerWasRegisteredForTournament(state, playerWasRegisteredForTournament);
  return {
    state: tournamentWithRegisteredPlayer,
    events: [playerWasRegisteredForTournament]
  }
}

function onPlayerWasRegisteredForTournament(state: TournamentRegistrations, event: PlayerWasRegisteredForTournament): TournamentRegistrations {
  return new TournamentRegistrations(
      {
        ...state,
        registeredPlayers: [...state.registeredPlayers, PlayerId.from(event.playerId)]
      }
  )
}
