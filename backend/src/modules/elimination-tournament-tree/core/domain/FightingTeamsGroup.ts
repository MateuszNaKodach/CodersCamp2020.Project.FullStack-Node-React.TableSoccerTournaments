import {FightingTeamsGroupId} from './FightingTeamsGroupId';
import {TournamentTeam} from './TournamentTeam';

export class FightingTeamsGroup {
    readonly fightingTeamsGroupId: FightingTeamsGroupId;
     firstTeam: TournamentTeam | undefined;
    secondTeam: TournamentTeam | undefined;
    readonly fightingTeamsGroupLevel: number;
     nextMatchId: FightingTeamsGroupId | undefined;

    private constructor(props: { fightingTeamsGroupId: FightingTeamsGroupId, firstTeam: TournamentTeam | undefined, secondTeam: TournamentTeam | undefined, fightingTeamsGroupLevel: number, nextMatchId: FightingTeamsGroupId  | undefined}) {
        this.fightingTeamsGroupId = props.fightingTeamsGroupId;
        this.firstTeam = props.firstTeam;
        this.secondTeam = props.secondTeam;
        this.fightingTeamsGroupLevel = props.fightingTeamsGroupLevel;
        this.nextMatchId = props.nextMatchId;
    }

    static fromArgs(fightingTeamsGroupId: FightingTeamsGroupId, firstTeam: TournamentTeam | undefined, secondTeam: TournamentTeam | undefined, fightingTeamsGroupLevel: number, nextMatchId: FightingTeamsGroupId | undefined): FightingTeamsGroup {
        const props = {fightingTeamsGroupId, firstTeam, secondTeam, fightingTeamsGroupLevel, nextMatchId: nextMatchId}
        return new FightingTeamsGroup(props);
    }

    static fromObj(props: { fightingTeamsGroupId: FightingTeamsGroupId, firstTeam: TournamentTeam | undefined, secondTeam: TournamentTeam | undefined, fightingTeamsGroupLevel: number, nextMatchId: FightingTeamsGroupId | undefined }): FightingTeamsGroup {
        return new FightingTeamsGroup(props);
    }
}