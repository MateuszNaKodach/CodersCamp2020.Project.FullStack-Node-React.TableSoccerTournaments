import { DoublesTournamentRepository } from '../../../application/DoublesTournamentRepository';
import { DoublesTournament } from '../../../domain/DoublesTournament';
import mongoose, { Schema } from 'mongoose';
import { TeamId } from '../../../domain/TeamId';
import { TournamentTeam } from '../../../domain/TournamentTeam';

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
        tournamentTeams: doublesTournament.tournamentTeams,
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
  readonly tournamentTeams: TournamentTeam[];
} & mongoose.Document;

// const Team = new Schema({ teamId: String, firstTeamPlayer: String, secondTeamPlayer: String });

const DoublesTournamentSchema = new mongoose.Schema({
  _id: Schema.Types.String,
  tournamentTeams: {
    type: [{ teamId: String, firstTeamPlayer: String, secondTeamPlayer: String }],
    required: true,
    unique: false,
  },
});

const MongoDoublesTournament = mongoose.model<MongoDoublesTournament>('DoublesTournament', DoublesTournamentSchema);

function mongoDocumentToDomain(mongoDocument: MongoDoublesTournament): DoublesTournament {
  return new DoublesTournament({
    tournamentId: mongoDocument._id,
    tournamentTeams: [
      ...mongoDocument.tournamentTeams.map((team) => {
        new TournamentTeam({
          teamId: TeamId.from(team.teamId.raw),
          firstTeamPlayer: team.firstTeamPlayer,
          secondTeamPlayer: team.secondTeamPlayer,
        });
        return team;
      }),
    ],
  });
}
