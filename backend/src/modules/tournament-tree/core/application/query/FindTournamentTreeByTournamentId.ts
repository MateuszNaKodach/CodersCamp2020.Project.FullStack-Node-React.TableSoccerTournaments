import {DoublesTournament} from "../../../../doubles-tournament/core/domain/DoublesTournament";
import {TournamentTree} from "../../domain/TournamentTree";

export class FindTournamentTreeByTournamentId{
    readonly tournamentId: string;
    constructor(props: { tournamentId: string }) {
        this.tournamentId = props.tournamentId;
    }
}

export type FindTournamentTreeByTournamentIdResult = TournamentTree | undefined;
