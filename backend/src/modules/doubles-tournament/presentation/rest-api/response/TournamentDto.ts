import { TournamentTeamListDto } from './TournamentTeamListDto';

export class TournamentDto {
  readonly tournamentId: string;
  readonly tournamentTeams: TournamentTeamListDto;
  readonly status: string;

  constructor(tournamentId: string, tournamentTeams: TournamentTeamListDto, status: string) {
    this.tournamentId = tournamentId;
    this.tournamentTeams = tournamentTeams;
    this.status = status;
  }
}
