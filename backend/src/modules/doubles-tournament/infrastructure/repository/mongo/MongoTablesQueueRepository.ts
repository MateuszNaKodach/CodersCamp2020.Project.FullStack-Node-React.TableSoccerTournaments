import mongoose, { Schema } from 'mongoose';
import { TournamentId } from '../../../core/domain/TournamentId';
import { TablesQueue } from '../../../core/domain/TablesQueue';
import { TablesQueueRepository } from '../../../core/application/TablesQueueRepository';
import { QueuedTable } from '../../../core/domain/QueuedTable';

export class MongoTablesQueueRepository implements TablesQueueRepository {
  async findByTournamentId(tournamentId: string): Promise<TablesQueue | undefined> {
    const mongoFindResult = await MongoTablesQueue.findById(tournamentId);
    return mongoFindResult ? mongoDocumentToDomain(mongoFindResult) : undefined;
  }

  async save(tablesQueue: TablesQueue): Promise<void> {
    console.log(tablesQueue);
    await MongoTablesQueue.findByIdAndUpdate(
      { _id: tablesQueue.tournamentId.raw },
      {
        _id: tablesQueue.tournamentId.raw,
        queuedTables: tablesQueue.queuedTables,
      },
      { upsert: true, useFindAndModify: true },
    );
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
