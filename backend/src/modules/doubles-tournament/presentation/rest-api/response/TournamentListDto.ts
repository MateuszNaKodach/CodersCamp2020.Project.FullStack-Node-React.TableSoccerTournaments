import { TournamentDto } from './TournamentDto';

export class TournamentListDto {
  readonly items: TournamentDto[];

  constructor(items: TournamentDto[]) {
    this.items = items;
  }
}
