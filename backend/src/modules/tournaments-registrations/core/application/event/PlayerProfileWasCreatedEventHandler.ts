import { EventHandler } from '../../../../../shared/core/application/event/EventHandler';
import { PlayerProfileWasCreated } from '../../../../player-profiles/core/domain/event/PlayerProfileWasCreated';
import { Players } from '../command/Players';
import { PlayerId } from '../../../../../shared/core/domain/PlayerId';

export class PlayerProfileWasCreatedEventHandler implements EventHandler<PlayerProfileWasCreated> {
  constructor(private readonly players: Players) {}

  async handle(event: PlayerProfileWasCreated): Promise<void> {
    await this.players.save({ playerId: PlayerId.from(event.playerId) });
  }
}
