import { TournamentRegistrationsDto } from './TournamentRegistrationsDto';

export class TournamentRegistrationsListDto {
  readonly items: TournamentRegistrationsDto[];

  constructor(items: TournamentRegistrationsDto[]) {
    this.items = items;
  }
}
