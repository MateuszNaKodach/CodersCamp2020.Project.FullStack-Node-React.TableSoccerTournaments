import { DoublesTournamentRepository } from '../../../core/application/DoublesTournamentRepository';
import { DoublesTournament } from '../../../core/domain/DoublesTournament';
import mongoose, { Schema } from 'mongoose';
import { TeamId } from '../../../core/domain/TeamId';
import { TournamentTeam } from '../../../core/domain/TournamentTeam';
import { TournamentStatus } from '../../../core/domain/TournamentStatus';

export class MongoDoublesTournamentRepository implements DoublesTournamentRepository {
  async findByTournamentId(tournamentId: string): Promise<DoublesTournament | undefined> {
    const mongoFindResult = await MongoDoublesTournament.findById(tournamentId);
    return mongoFindResult ? mongoDocumentToDomain(mongoFindResult) : undefined;
  }

  async save(doublesTournament: DoublesTournament): Promise<void> {
    await MongoDoublesTournament.findByIdAndUpdate(
      { _id: doublesTournament.tournamentId },
      {
        _id: doublesTournament.tournamentId,
        tournamentTeams: doublesTournament.tournamentTeams.map((team) => ({
          teamId: team.teamId.raw,
          firstTeamPlayer: team.firstTeamPlayer,
          secondTeamPlayer: team.secondTeamPlayer,
        })),
        status: doublesTournament.status,
      },
      { upsert: true, useFindAndModify: true },
    );
  }

  async findAll(): Promise<DoublesTournament[]> {
    const mongoFindResult = await MongoDoublesTournament.find();
    return mongoFindResult.map((mongoDocument) => mongoDocumentToDomain(mongoDocument));
  }
}

type MongoDoublesTournament = {
  readonly _id: string;
  readonly tournamentTeams: { teamId: string; firstTeamPlayer: string; secondTeamPlayer: string }[];
  readonly status: string;
} & mongoose.Document;

const DoublesTournamentSchema = new mongoose.Schema({
  _id: Schema.Types.String,
  tournamentTeams: [{ teamId: String, firstTeamPlayer: String, secondTeamPlayer: String }],
  status: Schema.Types.String,
});

const MongoDoublesTournament = mongoose.model<MongoDoublesTournament>('DoublesTournament', DoublesTournamentSchema);

function mongoDocumentToDomain(mongoDocument: MongoDoublesTournament): DoublesTournament {
  return new DoublesTournament({
    tournamentId: mongoDocument._id,
    tournamentTeams: [
      ...mongoDocument.tournamentTeams.map(
        (team) =>
          new TournamentTeam({
            teamId: TeamId.from(team.teamId),
            firstTeamPlayer: team.firstTeamPlayer,
            secondTeamPlayer: team.secondTeamPlayer,
          }),
      ),
    ],
    status: mongoDocument.status as TournamentStatus,
  });
}
