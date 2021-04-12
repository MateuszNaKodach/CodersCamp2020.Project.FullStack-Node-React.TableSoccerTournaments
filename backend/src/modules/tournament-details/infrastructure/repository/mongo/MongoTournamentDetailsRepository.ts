import mongoose, {Schema} from 'mongoose';
import {TournamentDetailsRepository} from "../../../core/application/TournamentDetailsRepository";
import {TournamentDetails} from "../../../core/domain/TournamentDetails";
import {TournamentName} from "../../../core/domain/TournamentName";

export class MongoTournamentDetailsRepository implements TournamentDetailsRepository {
    async findByTournamentId(tournamentId: string): Promise<TournamentDetails | undefined> {
        const mongoFindResult = await MongoTournamentDetails.findById(tournamentId);
        return mongoFindResult ? mongoDocumentToDomain(mongoFindResult) : undefined;
    }

    async save(details: TournamentDetails): Promise<void> {
        await MongoTournamentDetails.findByIdAndUpdate(
            { _id: details.tournamentId },
            {
                _id: details.tournamentId,
                name: details.tournamentName.raw
            },
            { upsert: true, useFindAndModify: true },
        );
    }

    async findAll(): Promise<TournamentDetails[]> {
        const mongoFindResult = await MongoTournamentDetails.find();
        return mongoFindResult.map((mongoDocument) => mongoDocumentToDomain(mongoDocument));
    }
}

type MongoTournamentDetails = {
    readonly _id: string;
    readonly name: string;
} & mongoose.Document;

const TournamentDetailsSchema = new mongoose.Schema({
    _id: Schema.Types.String,
    name: Schema.Types.String,
});

const MongoTournamentDetails = mongoose.model<MongoTournamentDetails>('TournamentDetails', TournamentDetailsSchema);

function mongoDocumentToDomain(mongoDocument: MongoTournamentDetails): TournamentDetails {
    return new TournamentDetails({
        tournamentId: mongoDocument._id,
        tournamentName: TournamentName.from(mongoDocument.name),
    });
}
