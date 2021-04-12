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
import {TeamsListRestApi} from "../../../restapi/matches-list/TeamsListRestAPI";

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

   const [matchesInformationListDto, setMatchesInformationListDto] = React.useState<MatchInformationDto[] | undefined>(undefined);

   const [teamsListDto, setTeamsListDto] = React.useState<TeamsListDto | undefined>();
   // const [tournamentPlayersProfiles, setTournamentPlayersProfiles] = React.useState<PlayerProfileDto[] | undefined>(undefined);

   console.log("tuuuuuuu");
   console.log(matchesInformationListDto)
   console.log(teamsListDto)

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

      async function setMatchesInformationListDtoState(): Promise<void> {
         if (!matchesListItems) return;
         const returnedMatchesInformationListDto = await Promise.all(matchesListItems
            .map(async (matchListItem) => {
                  const matchId = tournamentId + matchListItem.matchNumber;
                  return await getMatchInformationDto(matchId)
               }
            ))
         await setMatchesInformationListDto(returnedMatchesInformationListDto);
      }

      async function setTeamsListDtoState(): Promise<void> {
         if (!matchesListItems) return;
         const teamsListDto = await getTeamsListDto(tournamentId)
         await setTeamsListDto(teamsListDto);
      }

      setTeamsListDtoState().then();
      setMatchesInformationListDtoState().then();

   }, [matchesListItems]);


   //TODO:
//  useEffect(() => {
//    async function setPlayersProfilesListDto(): Promise<void> {
//       if (!matchesInformationListDto) return;
//       const returnedPlayersProfilesListDto = await Promise.all(matchesListItems
//          .map(async (matchInformationDto,index) => {
//                // const matchId = tournamentId + matchListItem.matchNumber;
//               return await getPlayerProfileDto(matchInformationDto.team1.player1)
//             }
//          ))
//       await setMatchesInformationsListDto(returnedMatchesInformationListDto);
//    }
//     setPlayersProfilesListDto().then();
// }, [matchesInformationListDto]);


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


const getMatchInformationDto = (matchId: string): Promise<MatchInformationDto> => {
   return MatchInformationRestApi()
      .getMatchesList(matchId)
      .then(matchInformationDto => {
         return {
            matchId: matchInformationDto.matchId,
            firstMatchSideId: matchInformationDto.firstMatchSideId,
            secondMatchSideId: matchInformationDto.secondMatchSideId,
            winnerId: matchInformationDto.winnerId
         }
      });
}

const getPlayerProfileDto = (playerId: string): Promise<PlayerProfileDto> => {
   return UserProfileRestApi()
      .getPlayerProfile(playerId)
      .then(playerProfileDto => {
         return {
            playerId: playerProfileDto.playerId,
            firstName: playerProfileDto.firstName,
            lastName: playerProfileDto.lastName,
            phoneNumber: playerProfileDto.phoneNumber,
            emailAddress: playerProfileDto.emailAddress,
         }
      });
}

const getTeamsListDto = (tournamentId: string): Promise<TeamsListDto> => {
   return TeamsListRestApi()
      .getMatchesList(tournamentId)
      .then(teamsList => {
         return teamsList
      });
}

