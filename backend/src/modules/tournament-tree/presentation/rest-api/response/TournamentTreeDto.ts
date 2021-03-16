import { TournamentTeam } from '../../../core/domain/TournamentTeam';
import { FightingTeamsGroup } from '../../../core/domain/FightingTeamsGroup';

export class TournamentTreeDto {
  readonly tournamentTeams: TournamentTeam[];
  readonly tournamentTreeArray: FightingTeamsGroup[];
  readonly tournamentId: string;

  constructor(tournamentId: string, tournamentTreeArray: FightingTeamsGroup[], tournamentTeams: TournamentTeam[]) {
    this.tournamentTeams = tournamentTeams;
    this.tournamentTreeArray = tournamentTreeArray;
    this.tournamentId = tournamentId;
  }
}
