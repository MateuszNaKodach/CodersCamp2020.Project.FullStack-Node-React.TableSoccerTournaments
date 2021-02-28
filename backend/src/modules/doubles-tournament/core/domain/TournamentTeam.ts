import { TeamId } from './TeamId';

export class TournamentTeam {
  readonly teamId: TeamId;
  readonly firstTeamPlayer: string;
  readonly secondTeamPlayer: string;

  constructor(props: { teamId: TeamId; firstTeamPlayer: string; secondTeamPlayer: string }) {
    this.teamId = props.teamId;
    this.firstTeamPlayer = props.firstTeamPlayer;
    this.secondTeamPlayer = props.secondTeamPlayer;
  }
}
