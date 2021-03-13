import { TournamentTeam } from '../../domain/TournamentTeam';

export class CreateTournamentTree {
  // readonly tournamentTeams: TournamentTeam[];
  readonly tournamentTeams: { teamId: string; firstTeamPlayer: string; secondTeamPlayer: string }[];
  readonly tournamentId: string;

  constructor(props: { tournamentId: string; tournamentTeams: { teamId: string; firstTeamPlayer: string; secondTeamPlayer: string }[] }) {
    this.tournamentTeams = props.tournamentTeams;
    this.tournamentId = props.tournamentId;
  }
}
