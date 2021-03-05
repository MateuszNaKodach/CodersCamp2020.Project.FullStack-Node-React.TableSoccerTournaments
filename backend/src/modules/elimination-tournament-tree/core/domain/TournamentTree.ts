import {TournamentTeam} from "./TournamentTeam";
import {EntityIdGenerator} from "../../../../shared/core/application/EntityIdGenerator";
import {FightingTeamsGroup} from "./FightingTeamsGroup";

export class TournamentTree {
    readonly tournamentTeams: TournamentTeam[];

    constructor(
        props: { tournamentTeams: TournamentTeam[] }
    ) {
        this.tournamentTeams = props.tournamentTeams;
    }

}

export function createTournamentTree(
    props: {
        tournamentTeams: TournamentTeam[],
        entityIdGenerator: EntityIdGenerator,
    }
): FightingTeamsGroup[] {

    const fightingTeamsGroupsNumber = nearestBiggerPow2Integer(props.tournamentTeams.length);

    const winnerTree = createWinnerTree(props.tournamentTeams, fightingTeamsGroupsNumber, props.entityIdGenerator);

    return winnerTree as unknown as FightingTeamsGroup[];
}

function createWinnerTree(tournamentTeams: TournamentTeam[], fightingTeamsGroupsNumber: number, entityIdGenerator: EntityIdGenerator,): FightingTeamsGroup[] {
    const returnedTree: FightingTeamsGroup[] = [];
    const maxLevel = maxTreeLevel(fightingTeamsGroupsNumber);


    for (let currentLevel = maxLevel; currentLevel >= 0; currentLevel--) {
        returnedTree.push(
            FightingTeamsGroup.fromObj({
                fightingTeamsGroupId: entityIdGenerator,
                fightingTeamsGroupLevel: 0,
                firstTeam: undefined,
                nextMatchId: undefined,
                secondTeam: undefined
            })
        );
    }

    return "x" as unknown as FightingTeamsGroup[];

}

function nearestBiggerPow2Integer(aSize: number) {
    return Math.pow(2, Math.ceil(Math.log(aSize) / Math.log(2)));
}

function maxTreeLevel(fightingTeamsGroupsNumber: number) {
    return Math.floor(Math.sqrt(fightingTeamsGroupsNumber));
}