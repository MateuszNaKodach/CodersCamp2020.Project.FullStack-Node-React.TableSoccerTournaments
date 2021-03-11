import { TournamentTeamDto } from './TournamentTeamDto';

export class TournamentTeamListDto {
  readonly items: TournamentTeamDto[];

  constructor(items: TournamentTeamDto[]) {
    this.items = items;
  }
}
