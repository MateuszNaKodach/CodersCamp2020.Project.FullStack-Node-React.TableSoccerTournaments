import React, {useEffect} from 'react';
import styled from "styled-components";
import {Card} from '@material-ui/core';
import {MatchItem} from "../../molecules/MatchItem/MatchItem";
import {MIN_CARD_COMPONENT_WIDTH} from "../../atoms/constants/sizes";
import {MatchListItem} from "./MatchListItem";
import {MatchesListRestApi} from "../../../restapi/matches-list";
import {MatchesListDto} from "./MatchesListDto";
import {MatchStatus} from "../../atoms/MatchStatus";
import {PlayerProfileDto} from "../../../restapi/players-profiles";

const StyledMatchesList = styled(Card)({
   width: MIN_CARD_COMPONENT_WIDTH,
});

export type MatchesListProps = {
   readonly tournamentId: string;
};

export type TournamentTeamDto = {
  readonly teamId: string;
  readonly firstTeamPlayer: string;
  readonly secondTeamPlayer: string;
}

export const MatchesList = ({tournamentId}: MatchesListProps) => {

   const [expanded, setExpanded] = React.useState<string | boolean>(false);
   const [matchesListItems, setMatchesListItems] = React.useState<MatchListItem[] | undefined>();
   const [tournamentTeams, setTournamentTeams] = React.useState<TournamentTeamDto[] | undefined>();
   const [tournamentPlayersProfiles, setTournamentPlayersProfiles] = React.useState<PlayerProfileDto[] | undefined>(undefined);

   useEffect(() => {
      MatchesListRestApi()
         .getMatchesList(tournamentId)
         .then((matchesListDto) => {
            const newMatchesListItems = returnMatchListItemsFromMatchesListDto(matchesListDto);
            setMatchesListItems(newMatchesListItems)
         });
   }, [tournamentId]);

  useEffect(() => {
    //TODO: Load tournamentTeams GET /doubles-tournaments/{tournamentId}/teams
  }, [tournamentId]);

  useEffect(() => {
    if(matchesListItems === undefined || tournamentTeams === undefined){
      return;
    }
    const tournamentPlayersIds: string[] = tournamentTeams
        .map(team => [team.firstTeamPlayer, team.secondTeamPlayer])
        .reduce((teamPlayers1, teamPlayers2) => [...teamPlayers1, ...teamPlayers2], [])
    const tournamentPlayersProfiles: PlayerProfileDto[] = [] //TODO: Get Player Name for each player id and save in tournamentPlayersProfiles
  }, [matchesListItems, tournamentTeams]);

   const handleChangeExpander = (panel: string | boolean) => (event: any, isExpanded: string | boolean) => {
      setExpanded(isExpanded ? panel : false);
   };

   return (
      <StyledMatchesList>
         {matchesListItems ? matchesListItems.map((item, index) => returnMatchItem(item, index, expanded, handleChangeExpander)) : "Oczekiwanie na pobranie"}
      </StyledMatchesList>
   )
};

const returnMatchItem = (matchItem: MatchListItem, index: number, expanded: string | boolean, handleChangeExpander: (panel: string | boolean) => (event: any, isExpanded: string | boolean) => void) => (
   <MatchItem
      level={matchItem.level}
      matchNumber={matchItem.matchNumber}
      matchStatus={matchItem.matchStatus}
      onClickTeam={matchItem.onClickTeam}
      team1={matchItem.team1}
      team2={matchItem.team2}
      winnerTeamId={"aa"}
      key={matchItem.matchNumber}
      expanded={expanded}
      handleChangeExpander={handleChangeExpander}
   />
)

function callBackFunction() {
   console.log("AaaBbbCcc")
}

const returnMatchListItemsFromMatchesListDto = (matchesListDto: MatchesListDto): MatchListItem[] => {
   return matchesListDto.queue.map((matchesItem) => {

      function findStatus(): MatchStatus {
         if (matchesItem.status === "started") return MatchStatus.STARTED;
         if (matchesItem.status === "ended") return MatchStatus.FINISHED;
         if (matchesItem.status === "enqueued") return MatchStatus.NO_TABLE;
         if (matchesItem.status === "noTeams") {
            if (matchesItem.team1Id || matchesItem.team1Id) return MatchStatus.NO_ONE_TEAM;
            return MatchStatus.NO_TEAMS;
         }
         return MatchStatus.STATUS_NOT_EXIST;
      }

      return {
         onClickTeam: callBackFunction,
         matchNumber: matchesItem.matchNumber,
         level: undefined,
         matchStatus: findStatus(),
         team1: {
            player1: undefined,
            player2: undefined,
            teamId: matchesItem.team1Id,
            currentPlayerLevel: undefined,
            currentMatchNumber: undefined,
         },
         team2: {
            player1: undefined,
            player2: undefined,
            teamId: matchesItem.team2Id,
            currentPlayerLevel: undefined,
            currentMatchNumber: undefined,
         }
      }
   })
}
