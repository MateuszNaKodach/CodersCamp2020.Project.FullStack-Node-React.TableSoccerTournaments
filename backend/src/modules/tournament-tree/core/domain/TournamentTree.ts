import { TournamentTeam } from './TournamentTeam';
import { FightingTeamsGroup } from './FightingTeamsGroup';
import { WinnerTree } from './WinnerTree';
import { EntityIdGenerator } from '../../../../shared/core/application/EntityIdGenerator';
import { DomainCommandResult } from '../../../../shared/core/domain/DomainCommandResult';
import { CurrentTimeProvider } from '../../../../shared/core/CurrentTimeProvider';
import { TournamentTreeWasCreated } from './event/TournamentTreeWasCreated';
import { TournamentTeamId } from './TournamentTeamId';

export class TournamentTree {
  readonly tournamentTeams: TournamentTeam[];
  readonly tournamentTreeArray: FightingTeamsGroup[];
  readonly tournamentId: string;
  firstPlaceTeamId: string | undefined = undefined;

  private constructor(props: { tournamentId: string; tournamentTreeArray: FightingTeamsGroup[]; tournamentTeams: TournamentTeam[] }) {
    this.tournamentTeams = props.tournamentTeams;
    this.tournamentTreeArray = props.tournamentTreeArray;
    this.tournamentId = props.tournamentId;
  }

  public static createSingleTournamentTree(props: {
    tournamentId: string;
    tournamentTeams: TournamentTeam[];
    entityIdGenerator: EntityIdGenerator;
  }): TournamentTree {
    const winnerTree = WinnerTree.createTournamentTree({
      tournamentTeams: props.tournamentTeams,
      entityIdGenerator: props.entityIdGenerator,
    });

    const tournamentTreeArray = winnerTree.getTournamentTreeArray().map((item, index) => {
      return { ...item, matchNumberInSequence: index + 1 };
    });

    const tournamentTreeProps = {
      tournamentId: props.tournamentId,
      tournamentTreeArray: tournamentTreeArray,
      tournamentTeams: props.tournamentTeams,
    };

    return new TournamentTree(tournamentTreeProps);
  }

  public static loadAlreadyCreatedTree(props: {
    tournamentId: string;
    tournamentTreeArray: FightingTeamsGroup[];
    tournamentTeams: TournamentTeam[];
  }): TournamentTree {
    return new TournamentTree({
      tournamentId: props.tournamentId,
      tournamentTreeArray: props.tournamentTreeArray,
      tournamentTeams: props.tournamentTeams,
    });
  }

  public getTournamentTreeArray(): FightingTeamsGroup[] {
    return this.tournamentTreeArray;
  }

  public getMatchesQueueReadyToBegin(): FightingTeamsGroup[] {
    return this.tournamentTreeArray.filter(({ firstTeam, secondTeam }) => firstTeam && secondTeam);
  }

  public getTournamentTreeIdArray(): string[] {
    return this.tournamentTreeArray.map((item) => item.fightingTeamsGroupId.raw);
  }

  public getMatchesQueueIdArray(): string[] {
    return this.tournamentTreeArray.filter((item) => item.firstTeam && item.secondTeam).map((item) => item.fightingTeamsGroupId.raw);
  }

  public getMatchIdFromMatchNumberInSequence(matchNumberInSequence: number): string | undefined {
    return this.tournamentTreeArray.find((match) => match.matchNumberInSequence === matchNumberInSequence)?.fightingTeamsGroupId.raw;
  }

  public finishMatch(matchId: string, winnerTeamId: string): void {
    const match = this.tournamentTreeArray.find((match) => matchId == match.fightingTeamsGroupId.raw);
    const nextMatchIdForWinner = match?.nextMatchId?.raw;

    if (!nextMatchIdForWinner) {
      this.firstPlaceTeamId = winnerTeamId;
      return;
    }

    this.tournamentTreeArray.forEach((match) => {
      if (match.fightingTeamsGroupId.raw !== nextMatchIdForWinner) return;
      if (!match.firstTeam) {
        match.firstTeam = new TournamentTeam({ teamId: TournamentTeamId.from(winnerTeamId) });
      } else {
        match.secondTeam = new TournamentTeam({ teamId: TournamentTeamId.from(winnerTeamId) });
      }
    });
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
