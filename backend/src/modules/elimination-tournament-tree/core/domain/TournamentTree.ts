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
    let returnedTree: FightingTeamsGroup[] = [];
    const maxLevel = maxTreeLevel(fightingTeamsGroupsNumber);

// biegnę od największego drzewka
    for (let currentLevel = maxLevel-1, parentLevel: FightingTeamsGroup[] = []; currentLevel >= 0; currentLevel--) {
        const createdLevel = createEmptyLevel(currentLevel, parentLevel, entityIdGenerator);
        parentLevel = createdLevel;
        returnedTree = returnedTree.concat(createdLevel);
    }

    return returnedTree;

}

// function createEmptyLevel(fightingTeamsGroupLevel: number, matchesOnLevel: number, entityIdGenerator: EntityIdGenerator): FightingTeamsGroup[] {
function createEmptyLevel(fightingTeamsGroupLevel: number, parentLevel: FightingTeamsGroup[], entityIdGenerator: EntityIdGenerator): FightingTeamsGroup[] {
    const returnedLevel: FightingTeamsGroup[] = [];
    const matchesOnLevel = parentLevel.length ? parentLevel.length * 2 : 1;

    for (let indexOfMatch = 0; indexOfMatch < matchesOnLevel; indexOfMatch++) {
        const nextMatchId = matchesOnLevel == 1 ? undefined : parentLevel[Math.floor(indexOfMatch / 2)].fightingTeamsGroupId;
        const generatedId = entityIdGenerator.generate()
        returnedLevel.push(
            FightingTeamsGroup.fromObj({
                "fightingTeamsGroupId": FightingTeamsGroupId.from(generatedId),
                "fightingTeamsGroupLevel": fightingTeamsGroupLevel,
                "firstTeam": undefined,
                "secondTeam": undefined,
                "nextMatchId": nextMatchId,
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