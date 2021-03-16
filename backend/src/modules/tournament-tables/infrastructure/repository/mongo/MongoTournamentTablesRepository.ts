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
        availableToPlay: tournamentTable.availableToPlay,
      },
      { upsert: true, useFindAndModify: true },
    );
  }

  async saveAll(tournamentTables: TournamentTable[]): Promise<void> {
    Promise.all(tournamentTables.map((table) => this.save(table)));
  }

  async findByTournamentIdAndTableNumber(tournamentId: string, tableNumber: number): Promise<TournamentTable | undefined> {
    const mongoFindResult = await MongoTournamentTables.findById({ _id: `${tournamentId}_${tableNumber}` });
    return mongoFindResult ? mongoDocumentToDomain(mongoFindResult) : undefined;
  }

  async findAllByTournamentId(tournamentId: string): Promise<TournamentTable[]> {
    const mongoFindResult = await MongoTournamentTables.find({ tournamentId });
    return mongoFindResult.map((mongoDocument) => mongoDocumentToDomain(mongoDocument));
  }
}

type MongoTournamentTables = {
  readonly _id: string;
  readonly tournamentId: string;
  readonly tableNumber: number;
  readonly tableName: string;
  readonly availableToPlay: boolean;
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
  availableToPlay: Schema.Types.Boolean,
});

const MongoTournamentTables = mongoose.model<MongoTournamentTables>('TournamentTables', TournamentTablesSchema);

function mongoDocumentToDomain(mongoDocument: MongoTournamentTables): TournamentTable {
  return new TournamentTable({
    tournamentId: mongoDocument.tournamentId,
    tableNumber: TableNumber.from(mongoDocument.tableNumber),
    tableName: mongoDocument.tableName,
    availableToPlay: mongoDocument.availableToPlay,
  });
}
