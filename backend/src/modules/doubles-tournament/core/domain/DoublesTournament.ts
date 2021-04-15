import { TournamentTeam } from './TournamentTeam';
import { TournamentWithTeamsWasCreated } from './event/TournamentWithTeamsWasCreated';
import { EntityIdGenerator } from '../../../../shared/core/application/EntityIdGenerator';
import { DomainCommandResult } from '../../../../shared/core/domain/DomainCommandResult';
import { TeamId } from './TeamId';
import { TournamentWasStarted } from './event/TournamentWasStarted';
import { TournamentStatus } from './TournamentStatus';
import { TournamentWasEnded } from './event/TournamentWasEnded';

export class DoublesTournament {
  readonly tournamentId: string;
  readonly tournamentTeams: TournamentTeam[];
  readonly status: TournamentStatus;

  constructor(props: { tournamentId: string; tournamentTeams: TournamentTeam[]; status?: TournamentStatus }) {
    this.tournamentId = props.tournamentId;
    this.tournamentTeams = props.tournamentTeams;
    this.status = props.status ?? TournamentStatus.NOT_STARTED;
  }
}

export function createTournamentWithTeams(
  state: DoublesTournament | undefined,
  command: { tournamentId: string; tournamentPairs: { player1: string; player2: string }[] },
  currentTime: Date,
  entityIdGenerator: EntityIdGenerator,
): DomainCommandResult<DoublesTournament> {
  if (state !== undefined) {
    throw new Error('This tournament already exists.');
  }
  if (command.tournamentPairs.length < 2) {
    throw new Error('Tournament must have at least 2 pairs of players.');
  }

  const tournamentTeams: TournamentTeam[] = command.tournamentPairs.map((tournamentPair) => {
    const teamId = entityIdGenerator.generate();
    return new TournamentTeam({
      teamId: TeamId.from(teamId),
      firstTeamPlayer: tournamentPair.player1,
      secondTeamPlayer: tournamentPair.player2,
    });
  });

  const tournamentWithTeamsWasCreated = new TournamentWithTeamsWasCreated({
    occurredAt: currentTime,
    tournamentId: command.tournamentId,
    tournamentTeams: tournamentTeams.map((team) => fromTournamentTeam(team)),
  });

  const createdTournamentWithTeams = onTournamentWithTeamsWasCreated(state, tournamentWithTeamsWasCreated);

  return {
    state: createdTournamentWithTeams,
    events: [tournamentWithTeamsWasCreated],
  };
}

function onTournamentWithTeamsWasCreated(state: DoublesTournament | undefined, event: TournamentWithTeamsWasCreated): DoublesTournament {
  return new DoublesTournament({
    tournamentId: event.tournamentId,
    tournamentTeams: event.tournamentTeams.map(
      (team) =>
        new TournamentTeam({
          teamId: TeamId.from(team.teamId),
          firstTeamPlayer: team.firstTeamPlayerId,
          secondTeamPlayer: team.secondTeamPlayerId,
        }),
    ),
  });
}

function fromTournamentTeam(tournamentTeam: TournamentTeam) {
  return {
    teamId: tournamentTeam.teamId.raw,
    firstTeamPlayerId: tournamentTeam.firstTeamPlayer,
    secondTeamPlayerId: tournamentTeam.secondTeamPlayer,
  };
}

export function startTournament(tournament: DoublesTournament | undefined, currentTime: Date): DomainCommandResult<DoublesTournament> {
  if (tournament === undefined) {
    throw new Error('Such tournament does not exists.');
  }
  if (tournament.status === 'STARTED') {
    throw new Error('Such tournament has been already started');
  }

  const startedTournament = new DoublesTournament({
    tournamentId: tournament.tournamentId,
    tournamentTeams: tournament.tournamentTeams,
    status: TournamentStatus.STARTED,
  });

  const tournamentWasStarted = new TournamentWasStarted({
    occurredAt: currentTime,
    tournamentId: tournament.tournamentId,
  });

  return {
    state: startedTournament,
    events: [tournamentWasStarted],
  };
}

export function endTournament(
  tournament: DoublesTournament | undefined,
  winner: TeamId,
  currentTime: Date,
): DomainCommandResult<DoublesTournament> {
  if (tournament === undefined) {
    throw new Error('Such tournament does not exists.');
  }
  if (tournament.status === 'ENDED') {
    throw new Error('Such tournament has been already ended');
  }

  const endedTournament = new DoublesTournament({
    tournamentId: tournament.tournamentId,
    tournamentTeams: tournament.tournamentTeams,
    status: TournamentStatus.ENDED,
  });

  const tournamentWasEnded = new TournamentWasEnded({
    occurredAt: currentTime,
    tournamentId: tournament.tournamentId,
    winner: winner.raw,
  });

  return {
    state: endedTournament,
    events: [tournamentWasEnded],
  };
}
