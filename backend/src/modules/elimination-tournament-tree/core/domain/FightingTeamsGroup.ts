import { FightingTeamsGroupId } from './FightingTeamsGroupId';

export class FightingTeamsGroup {
    readonly fightingTeamsGroupId: FightingTeamsGroupId;

    constructor(props: { fightingTeamsGroupId: FightingTeamsGroupId }) {
        this.fightingTeamsGroupId = props.fightingTeamsGroupId;
    }
}
