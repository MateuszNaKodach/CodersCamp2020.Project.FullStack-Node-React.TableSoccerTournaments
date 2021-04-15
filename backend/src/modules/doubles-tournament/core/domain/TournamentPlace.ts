import {TeamId} from "./TeamId";

export class TournamentPlace {
  readonly placeNumber: number;
  readonly teamId: TeamId;

  constructor(placeNumber: number, teamId: TeamId) {
    this.placeNumber = placeNumber;
    this.teamId = teamId;
  }
}
