import { FightingTeamsGroupId } from './FightingTeamsGroupId';
import { TournamentTeam } from './TournamentTeam';

export class FightingTeamsGroup {
  readonly fightingTeamsGroupId: FightingTeamsGroupId;
  firstTeam: TournamentTeam | undefined;
  secondTeam: TournamentTeam | undefined;
  readonly fightingTeamsGroupLevel: number;
  nextMatchId: FightingTeamsGroupId | undefined;
  matchNumberInSequence: number | undefined;

  private constructor(props: {
    fightingTeamsGroupId: FightingTeamsGroupId;
    firstTeam: TournamentTeam | undefined;
    secondTeam: TournamentTeam | undefined;
    fightingTeamsGroupLevel: number;
    nextMatchId: FightingTeamsGroupId | undefined;
    matchNumberInSequence: number | undefined;
  }) {
    this.fightingTeamsGroupId = props.fightingTeamsGroupId;
    this.firstTeam = props.firstTeam;
    this.secondTeam = props.secondTeam;
    this.fightingTeamsGroupLevel = props.fightingTeamsGroupLevel;
    this.nextMatchId = props.nextMatchId;
    this.matchNumberInSequence = props.matchNumberInSequence;
  }

  static fromObj(props: {
    fightingTeamsGroupId: FightingTeamsGroupId;
    firstTeam: TournamentTeam | undefined;
    secondTeam: TournamentTeam | undefined;
    fightingTeamsGroupLevel: number;
    nextMatchId: FightingTeamsGroupId | undefined;
    matchNumberInSequence: number | undefined;
  }): FightingTeamsGroup {
    return new FightingTeamsGroup(props);
  }
}
