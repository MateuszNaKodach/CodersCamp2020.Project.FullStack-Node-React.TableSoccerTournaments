import { FightingTeamsGroupId } from './FightingTeamsGroupId';
import { TournamentTeam } from './TournamentTeam';

export class FightingTeamsGroup {
  readonly fightingTeamsGroupId: FightingTeamsGroupId;
  firstTeam: TournamentTeam | undefined;
  secondTeam: TournamentTeam | undefined;
  readonly fightingTeamsGroupLevel: number;
  nextMatchId: FightingTeamsGroupId | undefined;
  matchNumberInSequence: number | undefined;
  isMatchFinished: boolean;

  private constructor(props: {
    fightingTeamsGroupId: FightingTeamsGroupId;
    firstTeam: TournamentTeam | undefined;
    secondTeam: TournamentTeam | undefined;
    fightingTeamsGroupLevel: number;
    nextMatchId: FightingTeamsGroupId | undefined;
    matchNumberInSequence: number | undefined;
    isMatchFinished: boolean;
  }) {
    this.fightingTeamsGroupId = props.fightingTeamsGroupId;
    this.firstTeam = props.firstTeam;
    this.secondTeam = props.secondTeam;
    this.fightingTeamsGroupLevel = props.fightingTeamsGroupLevel;
    this.nextMatchId = props.nextMatchId;
    this.matchNumberInSequence = props.matchNumberInSequence;
    this.isMatchFinished = props.isMatchFinished;
  }

  static fromObj(props: {
    fightingTeamsGroupId: FightingTeamsGroupId;
    firstTeam: TournamentTeam | undefined;
    secondTeam: TournamentTeam | undefined;
    fightingTeamsGroupLevel: number;
    nextMatchId: FightingTeamsGroupId | undefined;
    matchNumberInSequence: number | undefined;
    isMatchFinished: boolean;
  }): FightingTeamsGroup {
    return new FightingTeamsGroup(props);
  }
}
