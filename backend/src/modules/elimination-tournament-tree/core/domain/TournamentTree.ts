import {TournamentTeam} from "./TournamentTeam";
import {FightingTeamsGroup} from "./FightingTeamsGroup";
import {WinnerTree} from "./WinnerTree";
import {EntityIdGenerator} from "../../../../shared/core/application/EntityIdGenerator";
import {CreateTournamentTree} from "../application/command/CreateTournamentTree";
import {DomainCommandResult} from "../../../../shared/core/domain/DomainCommandResult";
import {CurrentTimeProvider} from "../../../../shared/core/CurrentTimeProvider";
import {TournamentTreeWasCreated} from "./event/TournamentTreeWasCreated";

export class TournamentTree {
    readonly tournamentTeams: TournamentTeam[];
    readonly tournamentTreeArray: FightingTeamsGroup[];
    readonly tournamentId: string;


    private constructor(
        props: { tournamentId: string, tournamentTreeArray: FightingTeamsGroup[], tournamentTeams: TournamentTeam[] }
    ) {
        this.tournamentTeams = props.tournamentTeams;
        this.tournamentTreeArray = props.tournamentTreeArray;
        this.tournamentId = props.tournamentId
    }

    static createSingleTournamentTree(
        props: {
            tournamentId: string,
            tournamentTeams: TournamentTeam[],
            entityIdGenerator: EntityIdGenerator,
        }
    ): TournamentTree {
        const winnerTree = WinnerTree.createTournamentTree({
            tournamentTeams: props.tournamentTeams,
            entityIdGenerator: props.entityIdGenerator
        });
        const tournamentTreeProps = {
            tournamentId: props.tournamentId,
            tournamentTreeArray: winnerTree.getTournamentTreeArray(),
            tournamentTeams: props.tournamentTeams
        };
        return new TournamentTree(tournamentTreeProps);
    }

    public getTournamentTreeArray(): FightingTeamsGroup[] {
        return this.tournamentTreeArray;
    }
}


export function createTournamentTree(
    state: TournamentTree | undefined,
    command: { tournamentId: string, tournamentTeams: TournamentTeam[] },
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
    }

    const tournamentTree = TournamentTree.createSingleTournamentTree(props);
    const tournamentTreeWasCreatedEvent = new TournamentTreeWasCreated(command.tournamentId, tournamentTree, currentTime());
    // const state = {tournamentId: command.tournamentId , tournamentTree: TournamentTree, }
    return {
        state: tournamentTree, events: [tournamentTreeWasCreatedEvent]
    }
}

