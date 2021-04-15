import {TournamentTeamsListDto} from "../tournament-teams-list/TournamentTeamsListDto";

export type DoublesTournamentDto = {
    tournamentId: string;
    tournamentTeams: TournamentTeamsListDto;
    status: string;
}