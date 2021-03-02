import { PlayerProfileDto } from './PlayerProfileDto';

export class PlayerProfilesListDto {
  readonly items: PlayerProfileDto[];

  constructor(items: PlayerProfileDto[]) {
    this.items = items;
  }
}
