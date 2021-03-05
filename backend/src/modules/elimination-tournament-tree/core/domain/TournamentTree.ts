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

    const numberOfFightingTeamsGroups = fightingTeamsGroupsNumber(props.tournamentTeams.length);
    const winnerTree = createWinnerTree(props.tournamentTeams, numberOfFightingTeamsGroups, props.entityIdGenerator);
    return winnerTree;

}

function createWinnerTree(tournamentTeams: TournamentTeam[], fightingTeamsGroupsNumber: number, entityIdGenerator: EntityIdGenerator,): FightingTeamsGroup[] {
    let returnedTree: FightingTeamsGroup[] = [];
    const maxLevel = maxTreeLevel(fightingTeamsGroupsNumber);
// biegnę od największego drzewka
    for (let currentLevel = maxLevel - 1, parentLevel: FightingTeamsGroup[] = []; currentLevel >= 0; currentLevel--) {
        const createdLevel = createEmptyLevel(currentLevel, parentLevel, entityIdGenerator);
        parentLevel = createdLevel;
        returnedTree = returnedTree.concat(currentLevel != 0 ? createdLevel : setStarterValueOnLevel(createdLevel, tournamentTeams));
    }
    // returnedTree = setStarterLevel(returnedTree, tournamentTeams);
    return returnedTree;
}

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
    return returnedLevel.reverse();
}

function setStarterValueOnLevel(emptyStartLevel: FightingTeamsGroup[], teamsList: TournamentTeam[]): FightingTeamsGroup[] {
    const numberOfFightingTeamsGroups = fightingTeamsGroupsNumber(teamsList.length);
    // const returnedLevel: (TournamentTeam | undefined)[ ] = new Array(numberOfFightingTeamsGroups);
    const teamsListWithEmptyPlace: (TournamentTeam | undefined)[ ] = teamsList.concat(new Array(numberOfFightingTeamsGroups - teamsList.length));

    const returnedLevel: FightingTeamsGroup[] = emptyStartLevel;
    returnedLevel.map((item, index) => {
        const theBestTeam = teamsListWithEmptyPlace.shift();
        const theWorstTeam = teamsListWithEmptyPlace.pop();
        console.log(teamsListWithEmptyPlace.reverse().pop());
        console.log(teamsListWithEmptyPlace);

    })
    // TODO:  tablica z przygotowanymi w kolejności drużynami
    // const returnedLevel: (TournamentTeam | undefined)[ ] = new Array(numberOfFightingTeamsGroups);
    // console.log(returnedLevel);
    // returnedLevel.map(item => {
    //
    // })


    // teamsListWithEmptyPlace.


// returnedTree.map((item)=>{
//     if(item.fightingTeamsGroupLevel ==0){
//         item.firstTeam =
//     }
// })

    return returnedLevel;
}

function fightingTeamsGroupsNumber(tournamentTeamsLength: number): number {
    return Math.pow(2, Math.ceil(Math.log(tournamentTeamsLength) / Math.log(2)));
}

function maxTreeLevel(fightingTeamsGroupsNumber: number) {
    return Math.floor(Math.sqrt(fightingTeamsGroupsNumber));
}