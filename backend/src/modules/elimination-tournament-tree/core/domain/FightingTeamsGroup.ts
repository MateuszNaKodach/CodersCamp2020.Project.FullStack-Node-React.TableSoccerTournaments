import {FightingTeamsGroupId} from './FightingTeamsGroupId';
import {TournamentTeam} from './TournamentTeam';

export class FightingTeamsGroup {
    readonly fightingTeamsGroupId: FightingTeamsGroupId;
    readonly firstTeam: TournamentTeam | undefined;
    readonly secondTeam: TournamentTeam | undefined;
    readonly fightingTeamsGroupLevel: number;
    readonly nextMatchId: FightingTeamsGroupId;

    private constructor(props: { fightingTeamsGroupId: FightingTeamsGroupId, firstTeam: TournamentTeam | undefined, secondTeam: TournamentTeam | undefined, fightingTeamsGroupLevel: number, nextMatchId: FightingTeamsGroupId }) {
        this.fightingTeamsGroupId = props.fightingTeamsGroupId;
        this.firstTeam = props.firstTeam;
        this.secondTeam = props.secondTeam;
        this.fightingTeamsGroupLevel = props.fightingTeamsGroupLevel;
        this.nextMatchId = props.nextMatchId;
    }


    // fromArray( propsArray = [ FightingTeamsGroupId,  TournamentTeam | undefined, TournamentTeam | undefined,  number ]) {
    //     this.fightingTeamsGroupId =fightingTeamsGroupId;
    //     this.firstTeam = firstTeam;
    //     this.secondTeam = props.secondTeam;
    //     this.fightingTeamsGroupLevel = props.fightingTeamsGroupLevel;
    //
    //     return new FightingTeamsGroup();
    // }

    // constructor( fightingTeamsGroupId: FightingTeamsGroupId, firstTeam: TournamentTeam | undefined, secondTeam: TournamentTeam | undefined, fightingTeamsGroupLevel: number ) {
    //     this.fightingTeamsGroupId =fightingTeamsGroupId;
    //     this.firstTeam = firstTeam;
    //     this.secondTeam = secondTeam;
    //     this.fightingTeamsGroupLevel = fightingTeamsGroupLevel;
    // }


    static fromArgs(fightingTeamsGroupId: FightingTeamsGroupId, firstTeam: TournamentTeam | undefined, secondTeam: TournamentTeam | undefined, fightingTeamsGroupLevel: number, nextMatchId: FightingTeamsGroupId): FightingTeamsGroup {
        const props = {fightingTeamsGroupId, firstTeam, secondTeam, fightingTeamsGroupLevel, nextMatchId: nextMatchId}
        return new FightingTeamsGroup(props);
    }

    static fromArray(array: Array<any>): FightingTeamsGroup {
        const props = {
            "fightingTeamsGroupId": array[0],
            "firstTeam": array[1],
            "secondTeam": array[2],
            "fightingTeamsGroupLevel": array[3],
            "nextMatchId": array[3]
        }
        return new FightingTeamsGroup(props);
    }

    static fromObj(props: { fightingTeamsGroupId: FightingTeamsGroupId, firstTeam: TournamentTeam | undefined, secondTeam: TournamentTeam | undefined, fightingTeamsGroupLevel: number, nextMatchId: FightingTeamsGroupId }): FightingTeamsGroup {
        return new FightingTeamsGroup(props);
    }
}