import {TournamentTeam} from './TournamentTeam';
import {FightingTeamsGroup} from './FightingTeamsGroup';
import {WinnerTree} from './WinnerTree';
import {EntityIdGenerator} from '../../../../shared/core/application/EntityIdGenerator';
import {CreateTournamentTree} from '../application/command/CreateTournamentTree';
import {DomainCommandResult} from '../../../../shared/core/domain/DomainCommandResult';
import {CurrentTimeProvider} from '../../../../shared/core/CurrentTimeProvider';
import {TournamentTreeWasCreated} from './event/TournamentTreeWasCreated';

export class TournamentTree {
    readonly tournamentTeams: TournamentTeam[];
    readonly tournamentTreeArray: FightingTeamsGroup[];
    readonly tournamentId: string;

    private constructor(props: { tournamentId: string; tournamentTreeArray: FightingTeamsGroup[]; tournamentTeams: TournamentTeam[] }) {
        this.tournamentTeams = props.tournamentTeams;
        this.tournamentTreeArray = props.tournamentTreeArray;
        this.tournamentId = props.tournamentId;
    }

    static createSingleTournamentTree(props: {
        tournamentId: string;
        tournamentTeams: TournamentTeam[];
        entityIdGenerator: EntityIdGenerator;
    }): TournamentTree {
        const winnerTree = WinnerTree.createTournamentTree({
            tournamentTeams: props.tournamentTeams,
            entityIdGenerator: props.entityIdGenerator,
        });
        const tournamentTreeProps = {
            tournamentId: props.tournamentId,
            tournamentTreeArray: winnerTree.getTournamentTreeArray(),
            tournamentTeams: props.tournamentTeams,
        };
        return new TournamentTree(tournamentTreeProps);
    }

    static setTournamentTreeFromDataBase(props: { tournamentId: string; tournamentTreeArray: FightingTeamsGroup[]; tournamentTeams: TournamentTeam[] }) {
        return new TournamentTree({
            tournamentId: props.tournamentId,
            tournamentTreeArray: props.tournamentTreeArray,
            tournamentTeams: props.tournamentTeams,
        });
    }

    public getTournamentTreeArray(): FightingTeamsGroup[] {
        return this.tournamentTreeArray;
    }

    public getTournamentTreeIdArray(): string[] {
        return this.tournamentTreeArray.map((item) => item.fightingTeamsGroupId.raw);
    }

    public getMatchesQueueIdArray(): string[] {
        return this.tournamentTreeArray.filter((item) => item.firstTeam && item.secondTeam).map((item) => item.fightingTeamsGroupId.raw);
    }

    public finishMatch(matchId: string, winnerId: string): void {
    }
}

export function createTournamentTree(
    state: TournamentTree | undefined,
    command: { tournamentId: string; tournamentTeams: TournamentTeam[] },
    currentTime: CurrentTimeProvider,
    entityIdGenerator: EntityIdGenerator,
): DomainCommandResult<TournamentTree> {
    if (state !== undefined) {
        throw new Error('This tournament already exists.');
    }
    if (command.tournamentTeams.length < 2) {
        throw new Error('Tournament must have at least 2 fighting teams.');
    }

    const props = {
        tournamentId: command.tournamentId,
        tournamentTeams: command.tournamentTeams,
        entityIdGenerator: entityIdGenerator,
    };

    const tournamentTree = TournamentTree.createSingleTournamentTree(props);
    const tournamentTreeWasCreatedEvent = new TournamentTreeWasCreated(command.tournamentId, currentTime());


    return {
        state: tournamentTree,
        events: [tournamentTreeWasCreatedEvent],
    };
}
