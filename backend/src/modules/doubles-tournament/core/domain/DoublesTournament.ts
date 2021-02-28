import { TournamentTeam } from './TournamentTeam';
import { TournamentWithTeamsWasCreated } from './event/TournamentWithTeamsWasCreated';
import { EntityIdGenerator } from '../../../../shared/core/application/EntityIdGenerator';
import { DomainCommandResult } from '../../../../shared/core/domain/DomainCommandResult';

export class DoublesTournament {
  readonly tournamentId: string;
  readonly tournamentTeams: TournamentTeam[];

  constructor(props: { tournamentId: string; tournamentTeams: TournamentTeam[] }) {
    this.tournamentId = props.tournamentId;
    this.tournamentTeams = props.tournamentTeams;
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
  if (command.tournamentPairs.length === 0) {
    throw new Error('Can not create tournament without players.');
  }

  const tournamentTeams: TournamentTeam[] = command.tournamentPairs.map((tournamentPair) => {
    const teamId = entityIdGenerator.generate();
    return new TournamentTeam({
      teamId: teamId,
      firstTeamPlayer: tournamentPair.player1,
      secondTeamPlayer: tournamentPair.player2,
    });
  });

  const tournamentWithTeamsWasCreated = new TournamentWithTeamsWasCreated({
    occurredAt: currentTime,
    tournamentId: command.tournamentId,
    tournamentTeams,
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
    tournamentTeams: event.tournamentTeams,
  });
}
