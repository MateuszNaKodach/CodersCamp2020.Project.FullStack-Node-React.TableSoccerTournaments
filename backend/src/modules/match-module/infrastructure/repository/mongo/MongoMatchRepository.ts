import { MatchRepository } from '../../../core/application/MatchRepository';
import { MatchId } from '../../../core/domain/MatchId';
import { Match } from '../../../core/domain/Match';
import mongoose, { Schema } from 'mongoose';
import { MatchSideId } from '../../../core/domain/MatchSideId';

export class MongoMatchRepository implements MatchRepository {
  async findByMatchId(matchId: MatchId): Promise<Match | undefined> {
    const mongoFindResult = await MongoMatch.findById(matchId.raw);
    return mongoFindResult ? mongoDocumentToDomain(mongoFindResult) : undefined;
  }

  async findAll(): Promise<Match[]> {
    const mongoFindResult = await MongoMatch.find();
    return mongoFindResult.map((mongoDocument) => mongoDocumentToDomain(mongoDocument));
  }

  async save(match: Match): Promise<void> {
    await MongoMatch.findByIdAndUpdate(
      { _id: match.matchId.raw },
      {
        _id: match.matchId.raw,
        firstMatchSideId: match.firstMatchSideId.raw,
        secondMatchSideId: match.secondMatchSideId.raw,
      },
      { upsert: true, useFindAndModify: true },
    );
  }
}

type MongoMatch = {
  readonly _id: string;
  readonly firstMatchSideId: string;
  readonly secondMatchSideId: string;
  readonly winner: string;
  readonly looser: string;
  readonly hasEnded: boolean;
} & mongoose.Document;

const MatchSchema = new mongoose.Schema({
  _id: Schema.Types.String,
  firstMatchSideId: {
    type: Schema.Types.String,
    required: true,
  },
  secondMatchSideId: {
    type: Schema.Types.String,
    required: true,
  },
});

const MongoMatch = mongoose.model<MongoMatch>('Match', MatchSchema);

function mongoDocumentToDomain(mongoDocument: MongoMatch): Match {
  return new Match({
    matchId: MatchId.from(mongoDocument._id),
    firstMatchSideId: MatchSideId.from(mongoDocument.firstMatchSideId),
    secondMatchSideId: MatchSideId.from(mongoDocument.secondMatchSideId),
  });
}
