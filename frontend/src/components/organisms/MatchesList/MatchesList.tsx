import React, {useEffect} from 'react';
import styled from "styled-components";
import {Card} from '@material-ui/core';
import {MatchItem} from "../../molecules/MatchItem/MatchItem";
import {MIN_CARD_COMPONENT_WIDTH} from "../../atoms/constants/sizes";
import {MatchListItem} from "./MatchListItem";
import {MatchesListRestApi, MatchInformationRestApi} from "../../../restapi/matches-list";
import {MatchesListDto} from "./MatchesListDto";
import {MatchStatus} from "../../atoms/MatchStatus";
import {PlayerProfileDto, UserProfileRestApi} from "../../../restapi/players-profiles";
import {MatchInformationDto} from "./MatchInformationDto";
import {TeamsListDto} from "./TeamsListDto";
import {TeamsListRestApi} from "../../../restapi/teams-list/TeamsListRestAPI";

const StyledMatchesList = styled(Card)({
   width: MIN_CARD_COMPONENT_WIDTH,
});

export type MatchesListProps = {
   readonly tournamentId: string;
};

export const MatchesList = ({tournamentId}: MatchesListProps) => {

   const [expanded, setExpanded] = React.useState<string | boolean>(false);
   const [matchesListItems, setMatchesListItems] = React.useState<MatchListItem[] | undefined>();
   const [matchesDetailsListDto, setMatchesDetailsListDto] = React.useState<MatchInformationDto[] | undefined>(undefined);
   const [teamsListDto, setTeamsListDto] = React.useState<TeamsListDto | undefined>();
   const [playersProfilesListDto, setPlayersProfilesListDto] = React.useState<PlayerProfileDto[] | undefined>(undefined);

   useEffect(() => {
      MatchesListRestApi()
         .getMatchesList(tournamentId)
         .then((matchesListDto) => {
            const newMatchesListItems = returnMatchListItemsFromMatchesListDto(matchesListDto);
            setMatchesListItems(newMatchesListItems)
         });
   }, [tournamentId]);

   useEffect(() => {
      if (!matchesListItems) return;

      Promise.all(matchesListItems
         .map((matchListItem) => getMatchInformationDto(`${tournamentId}_${matchListItem.matchNumber}`)))
         .then(matchesDetails => setMatchesDetailsListDto(matchesDetails))

      getTeamsListDto(tournamentId)
         .then(teamsListDto => setTeamsListDto(teamsListDto))

   }, [matchesListItems]);

   useEffect(() => {
      async function setPlayersProfilesList(): Promise<void> {
         if (!teamsListDto) return;

         const tournamentPlayersIds = teamsListDto.items
            .map(({firstTeamPlayer, secondTeamPlayer}) =>
               [firstTeamPlayer, secondTeamPlayer]
            ).reduce((acc, teamPlayers) => acc.concat(teamPlayers))

         const playersProfilesList = await Promise.all(tournamentPlayersIds.map((item) => getPlayerProfileDto(item)));
         setPlayersProfilesListDto(playersProfilesList);
      }

      setPlayersProfilesList().then();
   }, [teamsListDto]);


   const handleChangeExpander = (panel: string | boolean) => (event: any, isExpanded: string | boolean) => {
      setExpanded(isExpanded ? panel : false);
   };

   return (
      <StyledMatchesList>
         {matchesListItems ? matchesListItems.map((item, index) => returnMatchItem(item, index, expanded, handleChangeExpander)) : "Oczekiwanie na pobranie"}
      </StyledMatchesList>
   )
};


const returnMatchItem = (matchItemBase: MatchListItem, index: number, expanded: string | boolean, handleChangeExpander: (panel: string | boolean) => (event: any, isExpanded: string | boolean) => void) => (
   <MatchItem
      level={matchItemBase.level}
      matchNumber={matchItemBase.matchNumber}
      matchId={matchItemBase.matchId}
      matchStatus={matchItemBase.matchStatus}
      onClickTeam={matchItemBase.onClickTeam}
      team1={matchItemBase.team1}
      team2={matchItemBase.team2}
      winnerTeamId={matchItemBase.winnerId}
      key={matchItemBase.matchNumber}
      expanded={expanded}
      handleChangeExpander={handleChangeExpander}
   />
)

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
         onClickTeam: setMatchWinner,
         matchNumber: matchesItem.matchNumber,
         matchId: `${matchesListDto.tournamentId}_${matchesItem.matchNumber}`,
         winnerId: undefined,
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

const getMatchInformationDto = (matchId: string): Promise<MatchInformationDto> => MatchInformationRestApi()
   .getMatchesList(matchId)
   .then(matchInformationDto => ({
      matchId: matchInformationDto.matchId,
      firstMatchSideId: matchInformationDto.firstMatchSideId,
      secondMatchSideId: matchInformationDto.secondMatchSideId,
      winnerId: matchInformationDto.winnerId

   }));


const getPlayerProfileDto = (playerId: string): Promise<PlayerProfileDto> => UserProfileRestApi()
   .getPlayerProfile(playerId)
   .then(playerProfileDto => ({
      playerId: playerProfileDto.playerId,
      firstName: playerProfileDto.firstName,
      lastName: playerProfileDto.lastName,
      phoneNumber: playerProfileDto.phoneNumber,
      emailAddress: playerProfileDto.emailAddress,
   }));


const getTeamsListDto = (tournamentId: string): Promise<TeamsListDto> => TeamsListRestApi()
   .getMatchesList(tournamentId)
   .then(teamsList => {
      return teamsList
   });

const setMatchWinner = (matchId: string, winnerPlayerId: string) => {
   console.log("x X x X x X x");
   console.log(matchId);
   console.log(winnerPlayerId);

   MatchInformationRestApi()
      .postMatchWinner(matchId, winnerPlayerId)
      .then();
}

