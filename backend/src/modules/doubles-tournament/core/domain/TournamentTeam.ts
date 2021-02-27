export class TournamentTeam {
  readonly teamId: string;
  readonly firstTeamPlayer: string;
  readonly secondTeamPlayer: string;

  constructor(props: { teamId: string; firstTeamPlayer: string; secondTeamPlayer: string }) {
    this.teamId = props.teamId;
    this.firstTeamPlayer = props.firstTeamPlayer;
    this.secondTeamPlayer = props.secondTeamPlayer;
  }
}
