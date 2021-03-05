import {TournamentTeam} from "./TournamentTeam";
import {EntityIdGenerator} from "../../../../shared/core/application/EntityIdGenerator";
import {FightingTeamsGroup} from "./FightingTeamsGroup";
import {FightingTeamsGroupId} from "./FightingTeamsGroupId";

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

// biegnę od największego drzewka
    for (let currentLevel = maxLevel; currentLevel >= 0; currentLevel--) {


    }

    return "x" as unknown as FightingTeamsGroup[];

}

// function createEmptyLevel(fightingTeamsGroupLevel: number, matchesOnLevel: number, entityIdGenerator: EntityIdGenerator): FightingTeamsGroup[] {
function createEmptyLevel(fightingTeamsGroupLevel: number, parentLevel: FightingTeamsGroup[], entityIdGenerator: EntityIdGenerator): FightingTeamsGroup[] {
    const returnedLevel: FightingTeamsGroup[] = [];
    const matchesOnLevel = parentLevel.length ? parentLevel.length * 2 : 1;

    for (let index = 0; index < matchesOnLevel; index++) {
        returnedLevel.push(
            FightingTeamsGroup.fromObj({
                "fightingTeamsGroupId": FightingTeamsGroupId.from(entityIdGenerator.generate()),
                "fightingTeamsGroupLevel": fightingTeamsGroupLevel,
                "firstTeam": undefined,
                "secondTeam": undefined,
                "nextMatchId": undefined,
            })
        )
    }

    return returnedLevel;
}

function nearestBiggerPow2Integer(aSize: number) {
    return Math.pow(2, Math.ceil(Math.log(aSize) / Math.log(2)));
}

function maxTreeLevel(fightingTeamsGroupsNumber: number) {
    return Math.floor(Math.sqrt(fightingTeamsGroupsNumber));
}