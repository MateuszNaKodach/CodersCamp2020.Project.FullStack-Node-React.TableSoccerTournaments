import { TournamentId } from './TournamentId';
import { TournamentRegistrationsWasOpened } from './event/TournamentRegistrationsWasOpened';
import { RegistrationsStatus } from './RegistrationsStatus';
import { PlayerId } from '../../../../shared/core/domain/PlayerId';
import { PlayerWasRegisteredForTournament } from './event/PlayerWasRegisteredForTournament';
import { TournamentRegistrationsWereClosed } from './event/TournamentRegistrationsWereClosed';
import { DomainCommandResult } from '../../../../shared/core/domain/DomainCommandResult';
import { CurrentTimeProvider } from '../../../../shared/core/CurrentTimeProvider';

export const MIN_TOURNAMENT_PLAYERS = 4;

export class TournamentRegistrations {
  readonly tournamentId: TournamentId;
  readonly version: number;
  readonly status: RegistrationsStatus;
  readonly registeredPlayers: PlayerId[] = [];

  constructor(props: { tournamentId: TournamentId; version?: number; status?: RegistrationsStatus; registeredPlayers?: PlayerId[] }) {
    this.tournamentId = props.tournamentId;
    this.version = props.version ?? 0;
    this.status = props.status ?? RegistrationsStatus.OPENED;
    this.registeredPlayers = props.registeredPlayers ?? [];
  }
}

export function openTournamentRegistrations(
  state: TournamentRegistrations | undefined,
  command: { tournamentId: TournamentId },
  currentTimeProvider: CurrentTimeProvider,
): DomainCommandResult<TournamentRegistrations> {
  if (state?.status !== undefined) {
    throw new Error('Registrations was opened before!');
  }

  const tournamentRegistrationsWasOpened = new TournamentRegistrationsWasOpened({
    occurredAt: currentTimeProvider(),
    tournamentId: command.tournamentId.raw,
  });
  const openedTournamentRegistrations = onTournamentRegistrationsWasOpened(state, tournamentRegistrationsWasOpened);

  return {
    state: openedTournamentRegistrations,
    events: [tournamentRegistrationsWasOpened],
  };
}

function onTournamentRegistrationsWasOpened(
  state: TournamentRegistrations | undefined,
  event: TournamentRegistrationsWasOpened,
): TournamentRegistrations {
  return new TournamentRegistrations({
    tournamentId: TournamentId.from(event.tournamentId),
    status: RegistrationsStatus.OPENED,
  });
}

export function registerTournamentPlayer(
  state: TournamentRegistrations | undefined,
  command: { playerId: PlayerId },
  currentTimeProvider: CurrentTimeProvider,
  canPlayerTakePartInTheTournament: boolean,
): DomainCommandResult<TournamentRegistrations> {
  if (state?.status !== RegistrationsStatus.OPENED) {
    throw new Error('Cannot register player for closed tournament registrations!');
  }
  if (!canPlayerTakePartInTheTournament) {
    throw new Error(`Player with id = ${command.playerId.raw} cannot take part in the tournament!`);
  }

  const playerWasRegisteredForTournament = new PlayerWasRegisteredForTournament({
    occurredAt: currentTimeProvider(),
    playerId: command.playerId.raw,
    tournamentId: state.tournamentId.raw,
  });
  const tournamentWithRegisteredPlayer = onPlayerWasRegisteredForTournament(state, playerWasRegisteredForTournament);

  return {
    state: tournamentWithRegisteredPlayer,
    events: [playerWasRegisteredForTournament],
  };
}

function onPlayerWasRegisteredForTournament(
  state: TournamentRegistrations,
  event: PlayerWasRegisteredForTournament,
): TournamentRegistrations {
  return new TournamentRegistrations({
    ...state,
    registeredPlayers: [...state.registeredPlayers, PlayerId.from(event.playerId)],
  });
}

export function closeTournamentRegistrations(
  state: TournamentRegistrations | undefined,
  command: { tournamentId: TournamentId },
  currentTimeProvider: CurrentTimeProvider,
): DomainCommandResult<TournamentRegistrations> {
  if (state?.status !== RegistrationsStatus.OPENED) {
    throw new Error('Only opened registrations can be closed!');
  }
  const registeredPlayersCount = state.registeredPlayers.length;
  if (registeredPlayersCount < MIN_TOURNAMENT_PLAYERS) {
    throw new Error(`Min players for tournament is ${MIN_TOURNAMENT_PLAYERS}, but only ${registeredPlayersCount} players registered!`);
  }
  if (registeredPlayersCount % 2 !== 0) {
    throw new Error(`There must be even number of players to start tournament! Now is ${registeredPlayersCount}`);
  }

  const tournamentRegistrationsWasClosed = new TournamentRegistrationsWereClosed({
    occurredAt: currentTimeProvider(),
    tournamentId: command.tournamentId.raw,
    registeredPlayersIds: state.registeredPlayers.map((playerId) => playerId.raw),
  });
  const tournamentRegistrations = onTournamentRegistrationsWasClosed(state);

  return {
    state: tournamentRegistrations,
    events: [tournamentRegistrationsWasClosed],
  };
}

function onTournamentRegistrationsWasClosed(state: TournamentRegistrations): TournamentRegistrations {
  return new TournamentRegistrations({
    ...state,
    status: RegistrationsStatus.CLOSED,
  });
}
