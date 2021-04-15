import { MatchesQueueRepository } from '../../../core/application/MatchesQueueRepository';
import { MatchesQueue } from '../../../core/domain/MatchesQueue';
import mongoose, { Schema } from 'mongoose';
import { TournamentId } from '../../../core/domain/TournamentId';
import { QueuedMatch } from '../../../core/domain/QueuedMatch';
import { TeamId } from '../../../core/domain/TeamId';
import { MatchNumber } from '../../../core/domain/MatchNumber';
import { MatchStatus } from '../../../core/domain/MatchStatus';
import { OptimisticLockingException } from '../../../../../shared/core/application/OptimisticLockingException';

export class MongoMatchesQueueRepository implements MatchesQueueRepository {
  async findByTournamentId(tournamentId: string): Promise<{ state: MatchesQueue | undefined; version: number }> {
    const mongoFindResult = await MongoMatchesQueue.findById(tournamentId);
    const state = mongoFindResult ? mongoDocumentToDomain(mongoFindResult) : undefined;
    return { state, version: mongoFindResult?.__v ?? 0 };
  }

  async save(matchesQueue: MatchesQueue, expectedVersion: number): Promise<void> {
    try {
      await MongoMatchesQueue.findOneAndUpdate(
        { _id: matchesQueue.tournamentId.raw, __v: expectedVersion },
        {
          _id: matchesQueue.tournamentId.raw,
          __v: expectedVersion + 1,
          queue: matchesQueue.queuedMatches.map((queuedMatch) => ({
            matchNumber: queuedMatch.matchNumber.raw,
            team1Id: queuedMatch.team1Id.raw,
            team2Id: queuedMatch.team2Id.raw,
            status: queuedMatch.status,
            tableNumber: queuedMatch.tableNumber,
          })),
        },
        { upsert: true, useFindAndModify: true },
      );
    } catch (e) {
      if (e.message.includes('E11000')) {
        return Promise.reject(new OptimisticLockingException(expectedVersion));
      }
      throw e;
    }
  }
}

type MongoMatchesQueue = {
  readonly _id: string;
  readonly queue: {
    matchNumber: number;
    team1Id: string;
    team2Id: string;
    status: 'ENQUEUED' | 'STARTED' | 'ENDED';
    tableNumber: number | undefined;
  }[];
} & mongoose.Document;

const QueuedMatchSchema = new mongoose.Schema({
  matchNumber: Schema.Types.Number,
  team1Id: Schema.Types.String,
  team2Id: Schema.Types.String,
  status: Schema.Types.String,
  tableNumber: Schema.Types.Number,
});

const MatchesQueueSchema = new mongoose.Schema({
  _id: Schema.Types.String,
  queue: [QueuedMatchSchema],
});

const MongoMatchesQueue = mongoose.model<MongoMatchesQueue>('MatchesQueue', MatchesQueueSchema);

function mongoDocumentToDomain(mongoDocument: MongoMatchesQueue): MatchesQueue {
  return new MatchesQueue({
    tournamentId: TournamentId.from(mongoDocument._id),
    queuedMatches: [
      ...mongoDocument.queue.map(
        (match) =>
          new QueuedMatch({
            matchNumber: MatchNumber.from(match.matchNumber),
            team1Id: TeamId.from(match.team1Id),
            team2Id: TeamId.from(match.team2Id),
            status: MatchStatus[match.status],
            tableNumber: match.tableNumber,
          }),
      ),
    ],
  });
}
