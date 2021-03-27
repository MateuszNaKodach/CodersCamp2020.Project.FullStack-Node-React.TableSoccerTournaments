import { TournamentTeam } from './TournamentTeam';

export class MatchReadyToStart {
  readonly firstTeam: TournamentTeam;
  readonly secondTeam: TournamentTeam;
  readonly matchNumber: number;

  constructor(props: { firstTeam: TournamentTeam; secondTeam: TournamentTeam; matchNumber: number }) {
    this.firstTeam = props.firstTeam;
    this.secondTeam = props.secondTeam;
    this.matchNumber = props.matchNumber;
  }
}
