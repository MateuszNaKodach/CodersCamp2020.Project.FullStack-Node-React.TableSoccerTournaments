import { PlayerId } from '../../domain/PlayerId';

export type Player = { playerId: PlayerId };

export interface Players {
  save(player: Player): Promise<void>;
}
