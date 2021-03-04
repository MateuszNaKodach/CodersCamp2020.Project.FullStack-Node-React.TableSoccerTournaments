import { PlayerProfile } from '../../domain/PlayerProfile';

export class FindPlayerProfileById {
  readonly playerId: string;

  constructor(props: { playerId: string }) {
    this.playerId = props.playerId;
  }
}

export type FindPlayerProfileByIdResult = PlayerProfile | undefined;
