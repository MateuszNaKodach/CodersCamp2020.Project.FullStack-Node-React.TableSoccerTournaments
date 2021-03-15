import { TournamentTree } from '../../../core/domain/TournamentTree';
import { TournamentTeam } from '../../../core/domain/TournamentTeam';
import { FightingTeamsGroup } from '../../../core/domain/FightingTeamsGroup';
import { TournamentTeamDto } from './TournamentTeamDto';

export class TournamentTreeDto {
  readonly tournamentTeams: TournamentTeam[];
  readonly tournamentTreeArray: FightingTeamsGroup[];
  readonly tournamentId: string;

  constructor(tournamentId: string, tournamentTreeArray: FightingTeamsGroup[], tournamentTeams: TournamentTeam[]) {
    // TU ZMIANY

    this.tournamentTeams = tournamentTeams;
    this.tournamentTreeArray = tournamentTreeArray;
    this.tournamentId = tournamentId;
  }
}
