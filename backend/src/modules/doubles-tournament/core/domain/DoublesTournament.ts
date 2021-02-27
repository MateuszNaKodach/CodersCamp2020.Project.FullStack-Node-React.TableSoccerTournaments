import {TournamentTeam} from './TournamentTeam';
import {TournamentWithTeamsWasCreated} from './event/TournamentWithTeamsWasCreated';
import {DomainEvent} from '../../../../shared/domain/event/DomainEvent';
import {EntityIdGenerator} from '../../../../shared/core/application/EntityIdGenerator';

export class DoublesTournament {
  readonly tournamentId: string;
  readonly tournamentTeams: TournamentTeam[];

  constructor(props: { tournamentId: string; tournamentTeams: TournamentTeam[] }) {
    this.tournamentId = props.tournamentId;
    this.tournamentTeams = props.tournamentTeams;
  }
}

export function createTournamentWithTeams(
  command: { tournamentId: string; tournamentPairs: { player1: string; player2: string }[] },
  currentTime: Date,
  entityIdGenerator: EntityIdGenerator,
): { events: DomainEvent[] } {
  const tournamentTeams: TournamentTeam[] = command.tournamentPairs.map((tournamentPair) => {
    const teamId = entityIdGenerator.generate();
    return new TournamentTeam({
      teamId: teamId,
      firstTeamPlayer: tournamentPair.player1,
      secondTeamPlayer: tournamentPair.player2,
    });
  });
  return {
    events: [new TournamentWithTeamsWasCreated({ occurredAt: currentTime, tournamentId: command.tournamentId, tournamentTeams })],
  };
}
