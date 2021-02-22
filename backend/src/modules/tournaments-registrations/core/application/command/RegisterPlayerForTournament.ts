export class RegisterPlayerForTournament {
  readonly tournamentId: string;
  readonly playerId: string;

  constructor(props: { tournamentId: string; playerId: string }) {
    this.tournamentId = props.tournamentId;
    this.playerId = props.playerId;
  }
}
