import { FightingTeamsGroupId } from './FightingTeamsGroupId';
import {TournamentTeam} from './TournamentTeam';

export class FightingTeamsGroup {
    readonly fightingTeamsGroupId: FightingTeamsGroupId;
    firstTeam :TournamentTeam;
    secondTeam :TournamentTeam;


    constructor(props: { fightingTeamsGroupId: FightingTeamsGroupId , firstTeam: TournamentTeam, secondTeam : TournamentTeam}) {
        this.fightingTeamsGroupId = props.fightingTeamsGroupId;
        this.firstTeam = props.firstTeam;
        this.secondTeam = props.secondTeam;

    }
}
