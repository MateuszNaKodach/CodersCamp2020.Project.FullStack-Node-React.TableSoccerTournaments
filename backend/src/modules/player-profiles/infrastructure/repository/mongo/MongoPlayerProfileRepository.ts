import { PlayerProfilesRepository } from '../../../core/application/PlayerProfilesRepository';
import { PlayerProfile } from '../../../core/domain/PlayerProfile';
import { PlayerId } from '../../../../../shared/core/domain/PlayerId';
import mongoose, { Schema } from 'mongoose';

export class MongoPlayerProfileRepository implements PlayerProfilesRepository {
  async findByPlayerId(playerId: PlayerId): Promise<PlayerProfile | undefined> {
    const mongoFindResult = await MongoPlayersProfiles.findById(playerId.raw);
    return mongoFindResult ? mongoDocumentToDomain(mongoFindResult) : undefined;
  }

  async save(playerProfile: PlayerProfile): Promise<void> {
    await MongoPlayersProfiles.findByIdAndUpdate(
      { _id: playerProfile.playerId.raw },
      {
        _id: playerProfile.playerId.raw,
        firstName: playerProfile.firstName,
        lastName: playerProfile.lastName,
        phoneNumber: playerProfile.phoneNumber,
        emailAddress: playerProfile.emailAddress,
      },
      { upsert: true, useFindAndModify: true },
    );
  }

  async findAll(): Promise<PlayerProfile[]> {
    const mongoFindResult = await MongoPlayersProfiles.find();
    return mongoFindResult.map((mongoDocument) => mongoDocumentToDomain(mongoDocument));
  }
}

type MongoPlayersProfiles = {
  readonly _id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly phoneNumber: string;
  readonly emailAddress: string;
} & mongoose.Document;

const PlayerProfileSchema = new mongoose.Schema({
  _id: Schema.Types.String,
  firstName: {
    type: Schema.Types.String,
    required: true,
    minlength: 2,
    maxlength: 20,
    unique: false,
  },
  lastName: {
    type: Schema.Types.String,
    required: true,
    minlength: 2,
    maxlength: 20,
    unique: false,
  },
  phoneNumber: {
    type: Schema.Types.String,
    required: true,
    minlength: 9,
    unique: true,
  },
  emailAddress: {
    type: Schema.Types.String,
    required: true,
    minlength: 4,
    maxlength: 25,
    unique: true,
  },
});

const MongoPlayersProfiles = mongoose.model<MongoPlayersProfiles>('PlayerProfile', PlayerProfileSchema);

function mongoDocumentToDomain(mongoDocument: MongoPlayersProfiles): PlayerProfile {
  return new PlayerProfile({
    playerId: PlayerId.from(mongoDocument._id),
    firstName: mongoDocument.firstName,
    lastName: mongoDocument.lastName,
    phoneNumber: mongoDocument.phoneNumber,
    emailAddress: mongoDocument.emailAddress,
  });
}
