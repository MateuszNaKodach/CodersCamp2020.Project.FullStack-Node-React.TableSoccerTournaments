export class TournamentPlaceDto {
  readonly placeNumber: number;
  readonly teamId: string;

  constructor(placeNumber: number, teamId: string) {
    this.placeNumber = placeNumber;
    this.teamId = teamId;
  }
}

export class TournamentPlaceListDto {
  readonly items: TournamentPlaceDto[];

  constructor(items: TournamentPlaceDto[]) {
    this.items = items;
  }
}
