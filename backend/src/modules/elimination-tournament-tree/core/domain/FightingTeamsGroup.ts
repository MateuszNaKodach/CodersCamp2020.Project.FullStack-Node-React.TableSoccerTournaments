import {FightingTeamsGroupId} from './FightingTeamsGroupId';
import {TournamentTeam} from './TournamentTeam';

export class FightingTeamsGroup {
    readonly fightingTeamsGroupId: FightingTeamsGroupId;
    readonly firstTeam: TournamentTeam | undefined;
    readonly secondTeam: TournamentTeam | undefined;
    readonly fightingTeamsGroupLevel: number;

    constructor(props: { fightingTeamsGroupId: FightingTeamsGroupId, firstTeam: TournamentTeam | undefined, secondTeam: TournamentTeam | undefined, fightingTeamsGroupLevel: number }) {
        this.fightingTeamsGroupId = props.fightingTeamsGroupId;
        this.firstTeam = props.firstTeam;
        this.secondTeam = props.secondTeam;
        this.fightingTeamsGroupLevel = props.fightingTeamsGroupLevel;
    }
}
