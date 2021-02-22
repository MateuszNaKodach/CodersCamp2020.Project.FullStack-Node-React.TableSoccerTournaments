import { Command } from '../../../../src/shared/core/application/command/Command';

export class StartTournament implements Command {
  readonly tournamentId: string;

  constructor(props: { tournamentId: string }) {
    this.tournamentId = props.tournamentId;
  }
}

export class RegisterPlayer implements Command {
  readonly tournamentId: string;
  readonly playerId: string;

  constructor(props: { tournamentId: string; playerId: string }) {
    this.tournamentId = props.tournamentId;
    this.playerId = props.playerId;
  }
}
