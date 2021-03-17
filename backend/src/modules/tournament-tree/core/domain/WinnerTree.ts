import { TournamentTeam } from './TournamentTeam';
import { EntityIdGenerator } from '../../../../shared/core/application/EntityIdGenerator';
import { FightingTeamsGroup } from './FightingTeamsGroup';
import { FightingTeamsGroupId } from './FightingTeamsGroupId';

export class WinnerTree {
  readonly tournamentTeams: TournamentTeam[];
  readonly treeArray: FightingTeamsGroup[];

  private constructor(props: { tournamentTreeArray: FightingTeamsGroup[]; tournamentTeams: TournamentTeam[] }) {
    this.tournamentTeams = props.tournamentTeams;
    this.treeArray = props.tournamentTreeArray;
  }

  static createTournamentTree(props: { tournamentTeams: TournamentTeam[]; entityIdGenerator: EntityIdGenerator }): WinnerTree {
    const winnerTree = createTree(props.tournamentTeams, props.entityIdGenerator);
    const tournamentTreeProps = {
      tournamentTreeArray: winnerTree,
      tournamentTeams: props.tournamentTeams,
    };
    return new WinnerTree(tournamentTreeProps);
  }

  public getTournamentTreeArray(): FightingTeamsGroup[] {
    return this.treeArray;
  }
}

function createTree(tournamentTeams: TournamentTeam[], entityIdGenerator: EntityIdGenerator): FightingTeamsGroup[] {
  const numberOfFightingTeamsGroups = fightingTeamsGroupsNumber(tournamentTeams.length);
  let returnedTree: FightingTeamsGroup[] = [];
  const maxLevel = maxTreeLevel(numberOfFightingTeamsGroups);
  for (let currentLevel = maxLevel - 1, parentLevel: FightingTeamsGroup[] = []; currentLevel >= 0; currentLevel--) {
    const createdLevel = createEmptyLevel(currentLevel, parentLevel, entityIdGenerator);
    parentLevel = createdLevel;
    const isStartLevel = currentLevel != 0;

    returnedTree = returnedTree.concat(
      isStartLevel
        ? createdLevel.reverse()
        : putStartingTeamsOnEmptyStartingLevel(createdLevel, tournamentTeams, entityIdGenerator).reverse(),
    );
  }

  return returnedTree.reverse();
}

function createEmptyLevel(
  fightingTeamsGroupLevel: number,
  parentLevel: FightingTeamsGroup[],
  entityIdGenerator: EntityIdGenerator,
): FightingTeamsGroup[] {
  const returnedLevel: FightingTeamsGroup[] = [];
  const matchesOnLevel = parentLevel.length ? parentLevel.length * 2 : 1;

  for (let indexOfMatch = 0; indexOfMatch < matchesOnLevel; indexOfMatch++) {
    const nextMatchId = matchesOnLevel == 1 ? undefined : parentLevel[Math.floor(indexOfMatch / 2)].fightingTeamsGroupId;
    const generatedId = entityIdGenerator.generate();
    returnedLevel.push(
      FightingTeamsGroup.fromObj({
        fightingTeamsGroupId: FightingTeamsGroupId.from(generatedId),
        fightingTeamsGroupLevel: fightingTeamsGroupLevel,
        firstTeam: undefined,
        secondTeam: undefined,
        nextMatchId: nextMatchId,
      }),
    );
  }
  return returnedLevel.reverse();
}

function sortTeamArrayInStartingOrderFromTopToBottomPositionInTheOrderOfMatchesInNewEmptyStartingTree(
  teamsListWithEmptyPlace: (TournamentTeam | undefined)[],
  isRight = true,
) {
  let changeSideCounter = -1;
  const rightList: (TournamentTeam | undefined)[] = [];
  const leftList: (TournamentTeam | undefined)[] = [];
  let returnedList: (TournamentTeam | undefined)[] = [];

  for (let index = 0; index < teamsListWithEmptyPlace.length; index++) {
    if (isRight) rightList.push(teamsListWithEmptyPlace[index]);
    else leftList.push(teamsListWithEmptyPlace[index]);

    if (!++changeSideCounter) {
      changeSideCounter = -2;
      isRight = !isRight;
    }
  }

  if (rightList.length > 1)
    returnedList = returnedList.concat(
      sortTeamArrayInStartingOrderFromTopToBottomPositionInTheOrderOfMatchesInNewEmptyStartingTree(rightList, true),
    );
  else returnedList = returnedList.concat(rightList);

  if (leftList.length > 1)
    returnedList = returnedList.concat(
      sortTeamArrayInStartingOrderFromTopToBottomPositionInTheOrderOfMatchesInNewEmptyStartingTree(leftList, false),
    );
  else returnedList = returnedList.concat(leftList);

  return returnedList;
}

function putStartingTeamsOnEmptyStartingLevel(
  emptyStartLevel: FightingTeamsGroup[],
  teamsList: TournamentTeam[],
  entityIdGenerator: EntityIdGenerator,
): FightingTeamsGroup[] {
  const numberOfFightingTeamsGroups = fightingTeamsGroupsNumber(teamsList.length);
  const returnedLevel: FightingTeamsGroup[] = emptyStartLevel;
  const teamsListWithEmptyPlace: (TournamentTeam | undefined)[] = teamsList.concat(
    new Array(numberOfFightingTeamsGroups - teamsList.length),
  );
  const segregatedTeamList: (
    | TournamentTeam
    | undefined
  )[] = sortTeamArrayInStartingOrderFromTopToBottomPositionInTheOrderOfMatchesInNewEmptyStartingTree(teamsListWithEmptyPlace);

  returnedLevel.map((item, index) => {
    item.firstTeam = segregatedTeamList[index * 2];
    item.secondTeam = segregatedTeamList[index * 2 + 1];
    return item;
  });
  return returnedLevel;
}

function fightingTeamsGroupsNumber(tournamentTeamsLength: number): number {
  return Math.pow(2, Math.ceil(Math.log(tournamentTeamsLength) / Math.log(2)));
}

function maxTreeLevel(fightingTeamsGroupsNumber: number) {
  return Math.ceil(Math.sqrt(fightingTeamsGroupsNumber));
}
