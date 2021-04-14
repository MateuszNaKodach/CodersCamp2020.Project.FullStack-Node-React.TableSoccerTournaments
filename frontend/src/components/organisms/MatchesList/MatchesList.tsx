import React, {useEffect} from 'react';
import styled from "styled-components";
import {Card} from '@material-ui/core';
import {MatchItem} from "../../molecules/MatchItem/MatchItem";
import {MIN_CARD_COMPONENT_WIDTH} from "../../atoms/constants/sizes";
import {MatchItemType} from "./MatchItemType";
import {TournamentMatchesListRestAPI} from "../../../restapi/tournament-matches-list";
import {TournamentMatchesListDto} from "../../../restapi/tournament-matches-list/TournamentMatchesListDto";
import {MatchStatus} from "../../atoms/MatchStatus";
import {PlayerProfileDto, UserProfileRestApi} from "../../../restapi/players-profiles";
import {MatchDetailsDto} from "../../../restapi/match-details/MatchDetailsDto";
import {TournamentTeamsListDto} from "../../../restapi/tournament-teams-list/TournamentTeamsListDto";
import {TournamentTeamsListRestApi} from "../../../restapi/tournament-teams-list/TournamentTeamsListRestApi";
import {MatchDetailsRestAPI} from "../../../restapi/match-details";

const StyledMatchesList = styled(Card)({
   width: MIN_CARD_COMPONENT_WIDTH,
});

export type MatchesListProps = {
   readonly tournamentId: string;
};

export const MatchesList = ({tournamentId}: MatchesListProps) => {

   const [expanded, setExpanded] = React.useState<string | boolean>(false);
   const [tournamentMatchesListDto, setTournamentMatchesListDto] = React.useState<TournamentMatchesListDto | undefined>();
   const [matchesDetailsListDto, setMatchesDetailsListDto] = React.useState<MatchDetailsDto[] | undefined>(undefined);
   const [tournamentTeamsListDto, setTournamentTeamsListDto] = React.useState<TournamentTeamsListDto | undefined>();
   const [playersProfilesListDto, setPlayersProfilesListDto] = React.useState<PlayerProfileDto[] | undefined>(undefined);
   const [matchesList, setMatchesList] = React.useState<MatchItemType[] | undefined>();

   useEffect(() => {
      reloadAllList()
   }, [tournamentId]);

   useEffect(() => {
      if (!tournamentMatchesListDto) return;

      Promise.all(tournamentMatchesListDto.queue
         .map((tournamentMatchesItem) => getMatchDetailsDto(`${tournamentId}_${tournamentMatchesItem.matchNumber}`)))
         .then(matchesDetailsDto => setMatchesDetailsListDto(matchesDetailsDto))

      getTournamentTeamsListDto(tournamentId)
         .then(tournamentTeamsListDto => setTournamentTeamsListDto(tournamentTeamsListDto))
   }, [tournamentMatchesListDto]);

   useEffect(() => {
      async function setPlayersProfilesListDtoIntoState(): Promise<void> {
         if (!tournamentTeamsListDto) return;

         const tournamentPlayersIds = tournamentTeamsListDto.items
            .map(({firstTeamPlayer, secondTeamPlayer}) =>
               [firstTeamPlayer, secondTeamPlayer]
            ).reduce((acc, teamPlayers) => acc.concat(teamPlayers))

         const playersProfilesList = await Promise.all(tournamentPlayersIds
            .map((item) => getPlayerProfileDto(item)));

         setPlayersProfilesListDto(playersProfilesList);
      }

      setPlayersProfilesListDtoIntoState().then();
   }, [tournamentTeamsListDto]);

   useEffect(() => {
      if (tournamentMatchesListDto
         && matchesDetailsListDto
         && tournamentTeamsListDto
         && playersProfilesListDto
      ) {
         const matchList = returnMatchList(
            tournamentMatchesListDto,
            matchesDetailsListDto,
            tournamentTeamsListDto,
            playersProfilesListDto,
            reloadAllList
         );
         setMatchesList(matchList);
      }

   }, [playersProfilesListDto])

   const handleChangeExpander = (panel: string | boolean) => (event: any, isExpanded: string | boolean) => {
      setExpanded(isExpanded ? panel : false);
   };

   function reloadAllList() {
      TournamentMatchesListRestAPI()
         .getTournamentTeamsList(tournamentId)
         .then((tournamentMatchesListDto) => setTournamentMatchesListDto(tournamentMatchesListDto));
   }

   return (
      <StyledMatchesList>
         {matchesList
            ? matchesList
               .map((item, index) => returnMatchItem(item, index, expanded, handleChangeExpander))
            : "Oczekiwanie na pobranie..."}
      </StyledMatchesList>
   )
};

const returnMatchItem = (
   matchItem: MatchItemType,
   index: number,
   expanded: string | boolean,
   handleChangeExpander: (panel: string | boolean) => (event: any, isExpanded: string | boolean) => void
) => (
   <MatchItem
      key={matchItem.matchNumber}
      level={matchItem.level}
      matchNumber={matchItem.matchNumber}
      matchId={matchItem.matchId}
      matchStatus={matchItem.matchStatus}
      onClickTeam={matchItem.onClickTeam}
      tableNumber={matchItem.tableNumber}
      winnerTeamId={matchItem.winnerId}
      team1={matchItem.team1}
      team2={matchItem.team2}
      expanded={expanded}
      handleChangeExpander={handleChangeExpander}
   />
)

const returnMatchList = (
   tournamentMatchesListDto: TournamentMatchesListDto,
   matchesDetailsListDto: MatchDetailsDto[],
   tournamentTeamsListDto: TournamentTeamsListDto,
   playersProfilesListDto: PlayerProfileDto[],
   reloadAllList: () => void
): MatchItemType[] => {

   const tournamentId = tournamentMatchesListDto.tournamentId;
   const tournamentMatchesList = {...tournamentMatchesListDto}.queue;
   const matchesDetailsList = [...matchesDetailsListDto];
   const tournamentTeamsList = {...tournamentTeamsListDto}.items;
   const playersProfilesList = [...playersProfilesListDto];

   return tournamentMatchesList
      .map(
         ({
             matchNumber,
             status,
             tableNumber,
             team1Id,
             team2Id
          }) => {

            const findMatchId = (): string => `${tournamentId}_${matchNumber}`;

            const findWinnerId = (): string | undefined => matchesDetailsList
               .find(matchDetails => matchDetails.matchId === findMatchId())
               ?.winnerId;

            const findLevel = (): number | undefined => undefined;

            type TeamPlayersNames = {
               firstTeam: {
                  firstPlayerName: string | undefined,
                  secondPlayerName: string | undefined
               },
               secondTeam: {
                  firstPlayerName: string | undefined,
                  secondPlayerName: string | undefined
               }
            };

            const findTeamPlayersNames = (): TeamPlayersNames => ({
               firstTeam: {
                  firstPlayerName:
                     `${
                        playersProfilesList
                           .find(({playerId}) => playerId === tournamentTeamsList
                              .find(tournamentTeam => tournamentTeam.teamId === team1Id)
                              ?.firstTeamPlayer
                           )?.firstName
                     } ${
                        playersProfilesList
                           .find(({playerId}) => playerId === tournamentTeamsList
                              .find(({teamId}) => teamId === team1Id)
                              ?.firstTeamPlayer
                           )?.lastName
                     }`,
                  secondPlayerName:
                     `${
                        playersProfilesList
                           .find(({playerId}) => playerId === tournamentTeamsList
                              .find(({teamId}) => teamId === team1Id)
                              ?.secondTeamPlayer
                           )?.firstName
                     } ${
                        playersProfilesList
                           .find(({playerId}) => playerId === tournamentTeamsList
                              .find(({teamId}) => teamId === team1Id)
                              ?.secondTeamPlayer
                           )?.lastName
                     }`,
               },
               secondTeam: {
                  firstPlayerName:
                     `${
                        playersProfilesList
                           .find(({playerId}) => playerId === tournamentTeamsList
                              .find(tournamentTeam => tournamentTeam.teamId === team2Id)
                              ?.firstTeamPlayer
                           )?.firstName
                     } ${
                        playersProfilesList
                           .find(({playerId}) => playerId === tournamentTeamsList
                              .find(({teamId}) => teamId === team2Id)
                              ?.firstTeamPlayer
                           )?.lastName
                     }`,
                  secondPlayerName:
                     `${
                        playersProfilesList
                           .find(({playerId}) => playerId === tournamentTeamsList
                              .find(({teamId}) => teamId === team2Id)
                              ?.secondTeamPlayer
                           )?.firstName
                     } ${
                        playersProfilesList
                           .find(({playerId}) => playerId === tournamentTeamsList
                              .find(({teamId}) => teamId === team2Id)
                              ?.secondTeamPlayer
                           )?.lastName
                     }`,
               },
            });

            function findStatus(): MatchStatus {
               if (status === "started") return MatchStatus.STARTED;
               if (status === "ended") return MatchStatus.FINISHED;
               if (status === "enqueued") return MatchStatus.NO_TABLE;
               if (status === "noTeams") {
                  if (team1Id || team1Id) return MatchStatus.NO_ONE_TEAM;
                  else return MatchStatus.NO_TEAMS;
               }
               return MatchStatus.STATUS_NOT_EXIST;
            }

            return {
               level: findLevel(),
               matchId: findMatchId(),
               matchNumber: matchNumber,
               matchStatus: findStatus(),
               onClickTeam: (matchId: string, winnerPlayerId: string) => setMatchWinner(matchId, winnerPlayerId, reloadAllList),
               tableNumber: tableNumber,
               winnerId: findWinnerId(),
               team1: {
                  firstPlayerName: findTeamPlayersNames().firstTeam.firstPlayerName,
                  secondPlayerName: findTeamPlayersNames().firstTeam.secondPlayerName,
                  teamId: team1Id,
               },
               team2: {
                  firstPlayerName: findTeamPlayersNames().secondTeam.firstPlayerName,
                  secondPlayerName: findTeamPlayersNames().secondTeam.secondPlayerName,
                  teamId: team2Id,
               }
            }
         }
      )

}

const getMatchDetailsDto = (matchId: string): Promise<MatchDetailsDto> => MatchDetailsRestAPI()
   .getTournamentTeamsList(matchId)
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

const getTournamentTeamsListDto = (tournamentId: string): Promise<TournamentTeamsListDto> => TournamentTeamsListRestApi()
   .getTournamentTeamsList(tournamentId)
   .then(teamsList => teamsList);

const setMatchWinner = (matchId: string, winnerPlayerId: string, reloadAllList: () => void) => MatchDetailsRestAPI()
   .postMatchWinner(matchId, winnerPlayerId)
   .then(() => reloadAllList());


