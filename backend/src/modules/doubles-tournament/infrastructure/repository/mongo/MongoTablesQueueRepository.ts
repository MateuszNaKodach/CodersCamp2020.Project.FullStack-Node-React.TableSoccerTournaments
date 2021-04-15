import mongoose, { Schema } from 'mongoose';
import { TournamentId } from '../../../core/domain/TournamentId';
import { TablesQueue } from '../../../core/domain/TablesQueue';
import { TablesQueueRepository } from '../../../core/application/TablesQueueRepository';
import { QueuedTable } from '../../../core/domain/QueuedTable';
import { OptimisticLockingException } from '../../../../../shared/core/application/OptimisticLockingException';

export class MongoTablesQueueRepository implements TablesQueueRepository {
  async findByTournamentId(tournamentId: string): Promise<{ state: TablesQueue | undefined; version: number }> {
    const mongoFindResult = await MongoTablesQueue.findById(tournamentId);
    const state = mongoFindResult ? mongoDocumentToDomain(mongoFindResult) : undefined;
    return { state, version: mongoFindResult?.__v ?? 0 };
  }

  async save(tablesQueue: TablesQueue, expectedVersion: number): Promise<void> {
    try {
      await MongoTablesQueue.findByIdAndUpdate(
        { _id: tablesQueue.tournamentId.raw, __v: expectedVersion },
        {
          _id: tablesQueue.tournamentId.raw,
          queuedTables: tablesQueue.queuedTables,
          __v: expectedVersion + 1,
        },
        { upsert: true, useFindAndModify: true },
      );
    } catch (e) {
      if (e.message.includes('E11000')) {
        throw new OptimisticLockingException(expectedVersion);
      }
      throw e;
    }
  }
}

type MongoTablesQueue = {
  readonly _id: string;
  readonly queuedTables: {
    tableNumber: number;
    isFree: boolean;
  }[];
} & mongoose.Document;

const QueuedTableSchema = new mongoose.Schema({
  tableNumber: Schema.Types.Number,
  isFree: Schema.Types.Boolean,
});

const TablesQueueSchema = new mongoose.Schema({
  _id: Schema.Types.String,
  queuedTables: [QueuedTableSchema],
});

const MongoTablesQueue = mongoose.model<MongoTablesQueue>('TablesQueue', TablesQueueSchema);

function mongoDocumentToDomain(mongoDocument: MongoTablesQueue): TablesQueue {
  return new TablesQueue({
    tournamentId: TournamentId.from(mongoDocument._id),
    queuedTables: [
      ...mongoDocument.queuedTables.map(
        (table) =>
          new QueuedTable({
            tableNumber: table.tableNumber,
            isFree: table.isFree,
          }),
      ),
    ],
  });
}
