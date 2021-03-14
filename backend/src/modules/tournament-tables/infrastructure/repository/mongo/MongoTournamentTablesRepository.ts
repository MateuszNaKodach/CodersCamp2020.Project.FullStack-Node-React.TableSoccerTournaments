import mongoose, { Schema } from 'mongoose';
import { TournamentTablesRepository } from '../../../core/application/TournamentTablesRepository';
import { TournamentTable } from '../../../core/domain/TournamentTable';
import { TableNumber } from '../../../core/domain/TableNumber';

export class MongoTournamentTablesRepository implements TournamentTablesRepository {
  async save(tournamentTable: TournamentTable): Promise<void> {
    await MongoTournamentTables.findByIdAndUpdate(
      { _id: `${tournamentTable.tournamentId}_${tournamentTable.tableNumber.raw}` },
      {
        tournamentId: tournamentTable.tournamentId,
        tableNumber: tournamentTable.tableNumber.raw,
        tableName: tournamentTable.tableName,
      },
      { upsert: true, useFindAndModify: true },
    );
  }

  async saveAll(tournamentTables: TournamentTable[]): Promise<void> {
    Promise.all(tournamentTables.map((table) => this.save(table)));
  }

  async findAllByTournamentId(tournamentId: string): Promise<TournamentTable[]> {
    const mongoFindResult = await MongoTournamentTables.find({ tournamentId });
    return mongoDocumentToDomain(mongoFindResult);
  }
}

type MongoTournamentTables = {
  readonly _id: string;
  readonly tournamentId: string;
  readonly tableNumber: number;
  readonly tableName: string;
} & mongoose.Document;

const TournamentTablesSchema = new mongoose.Schema({
  _id: Schema.Types.String,
  tournamentId: Schema.Types.String,
  tableNumber: {
    type: Schema.Types.Number,
    min: 1,
    max: 200,
  },
  tableName: Schema.Types.String,
});

const MongoTournamentTables = mongoose.model<MongoTournamentTables>('TournamentTables', TournamentTablesSchema);

function mongoDocumentToDomain(mongoDocument: MongoTournamentTables[]): TournamentTable[] {
  return mongoDocument.map(
    (document) =>
      new TournamentTable({
        tournamentId: document.tournamentId,
        tableNumber: TableNumber.from(document.tableNumber),
        tableName: document.tableName,
      }),
  );
}
