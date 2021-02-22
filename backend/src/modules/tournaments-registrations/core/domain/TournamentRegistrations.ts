import {TournamentId} from "./TournamentId";
import {CurrentTimeProvider} from "../TournamentsRegistrationsModule";
import {TournamentRegistrationsWasOpened} from "./event/TournamentRegistrationsWasOpened";
import {RegistrationsStatus} from "./RegistrationsStatus";
import {PlayerId} from "./PlayerId";
import {PlayerWasRegisteredForTournament} from "./event/PlayerWasRegisteredForTournament";
import {TournamentRegistrationsWasClosed} from "./event/TournamentRegistrationsWasClosed";
import {DomainCommandResult} from "../../../shared/core/domain/DomainCommandResult";

//TODO: Ustalić jakie jest minimum. Może 2 graczy i po prostu grają finał?
const MIN_TOURNAMENT_PLAYERS = 8;

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
  const openedTournamentRegistrations = onTournamentRegistrationsWasOpened(state, tournamentRegistrationsWasOpened);

  return {
    state: openedTournamentRegistrations,
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

export function closeTournamentRegistrations(
    state: TournamentRegistrations | undefined,
    command: { tournamentId: TournamentId },
    currentTimeProvider: CurrentTimeProvider
): DomainCommandResult<TournamentRegistrations> {
  if (state?.status !== RegistrationsStatus.OPENED) {
    throw new Error('Only opened registrations can be closed!')
  }
  const registeredPlayersCount = state.registeredPlayers.length;
  if (state.registeredPlayers.length < MIN_TOURNAMENT_PLAYERS) {
    throw new Error(`Min players for tournament is ${MIN_TOURNAMENT_PLAYERS}, but only ${registeredPlayersCount} players registered!`)
  }

  const tournamentRegistrationsWasClosed = new TournamentRegistrationsWasClosed({
    occurredAt: currentTimeProvider(),
    tournamentId: command.tournamentId.raw,
    participantsIds: state.registeredPlayers.map(playerId => playerId.raw)
  });
  const tournamentRegistrations = onTournamentRegistrationsWasClosed(state, tournamentRegistrationsWasClosed);

  return {
    state: tournamentRegistrations,
    events: [tournamentRegistrationsWasClosed]
  };
}

function onTournamentRegistrationsWasClosed(state: TournamentRegistrations, event: TournamentRegistrationsWasClosed): TournamentRegistrations {
  return new TournamentRegistrations({
    ...state,
    status: RegistrationsStatus.CLOSED
  });
}
