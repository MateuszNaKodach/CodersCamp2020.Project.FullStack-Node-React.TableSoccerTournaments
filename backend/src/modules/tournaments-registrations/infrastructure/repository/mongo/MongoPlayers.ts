import { AvailablePlayersForTournament } from '../../../core/application/command/AvailablePlayersForTournament';
import { Player, Players } from '../../../core/application/command/Players';
import { PlayerId } from '../../../../../shared/core/domain/PlayerId';
import mongoose, { Schema } from 'mongoose';

export class MongoPlayers implements AvailablePlayersForTournament, Players {
  async save(player: Player): Promise<void> {
    await MongoPlayer.findByIdAndUpdate(
      { _id: player.playerId.raw },
      { _id: player.playerId.raw },
      { upsert: true, useFindAndModify: true },
    );
  }

  async canPlay(playerId: PlayerId): Promise<boolean> {
    return await MongoPlayer.exists({ _id: playerId.raw });
  }
}

type MongoPlayer = {
  readonly _id: string;
} & mongoose.Document;

const PlayerSchema = new mongoose.Schema({
  _id: Schema.Types.String,
});

const MongoPlayer = mongoose.model<MongoPlayer>('TournamentRegistrationsAvailablePlayers', PlayerSchema);

function mongoDocumentToDomain(mongoDocument: MongoPlayer): PlayerId {
  return PlayerId.from(mongoDocument._id);
}
