export class FightingTeamsGroupId {
    private readonly TYPE = 'FightingTeamsGroup';

    private constructor(readonly raw: string) {}

    static from(fightingTeamsGroupId: string): FightingTeamsGroupId {
        if (fightingTeamsGroupId.length <= 0) {
            throw new Error('Id cannot be empty!');
        }
        return new FightingTeamsGroupId(fightingTeamsGroupId);
    }
}
