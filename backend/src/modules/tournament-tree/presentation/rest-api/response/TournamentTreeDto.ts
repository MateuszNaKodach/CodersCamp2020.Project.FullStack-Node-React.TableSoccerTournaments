import {TournamentTree} from "../../../core/domain/TournamentTree";
import {TournamentTeam} from "../../../core/domain/TournamentTeam";
import {FightingTeamsGroup} from "../../../core/domain/FightingTeamsGroup";
import {TournamentTeamDto} from "./TournamentTeamDto";

export class TournamentTreeDto {
    readonly tournamentTeams: TournamentTeamDto[];
    readonly tournamentTreeArray: FightingTeamsGroup[];
    readonly tournamentId: string;


    constructor(tournamentTeams: TournamentTeamDto[], tournamentTreeArray, tournamentId: string) {


        this.tournamentTeams = tournamentTeams;
        this.tournamentTreeArray = tournamentTreeArray.;
        this.tournamentId = tournamentId;
    }
}
