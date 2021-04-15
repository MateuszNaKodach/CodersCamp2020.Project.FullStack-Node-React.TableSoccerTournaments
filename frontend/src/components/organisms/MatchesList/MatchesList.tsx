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


   console.log("tuuuu");
   console.log(expanded);
   console.log(tournamentMatchesListDto);
   console.log(matchesDetailsListDto);
   console.log(tournamentTeamsListDto);
   console.log(playersProfilesListDto);
   console.log(matchesList);


   useEffect(() => {
      reloadAllList()
   }, [tournamentId]);

   useEffect(() => {
      if (!tournamentMatchesListDto) return;

      Promise.all(tournamentMatchesListDto.queue
         .map((tournamentMatchesItem) => getMatchDetailsDto(`${tournamentId}_${tournamentMatchesItem.matchNumber}`, tournamentMatchesItem.team1Id, tournamentMatchesItem.team2Id)))
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
         .getTournamentMatch(tournamentId)
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
   {level, matchId, matchNumber, matchStatus, onClickTeam, tableNumber, team1, team2, winnerId}: MatchItemType,
   index: number,
   expanded: string | boolean,
   handleChangeExpander: (panel: string | boolean) => (event: any, isExpanded: string | boolean) => void
) => (
   <MatchItem
      key={matchNumber}
      level={level}
      matchNumber={matchNumber}
      matchId={matchId}
      matchStatus={matchStatus}
      onClickTeam={onClickTeam}
      tableNumber={tableNumber}
      winnerTeamId={winnerId}
      team1={team1}
      team2={team2}
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

            const teamPlayersNames = (teamId: string | undefined): string[] => {
               if(!teamId){
                  return []
               }
               const playersTeam = tournamentTeamsList.find(team => team.teamId === teamId)
               if(!playersTeam){
                  return [];
               }
               const playersIdsInTeam = [playersTeam.firstTeamPlayer, playersTeam.secondTeamPlayer]
               return playersProfilesList
                   .filter(playerProfile => playersIdsInTeam.includes(playerProfile.playerId))
                   .map(playerProfile => `${playerProfile.firstName} ${playerProfile.lastName}`);
            }

            function findStatus(): MatchStatus {
               if (status.toLowerCase() === "started") return MatchStatus.STARTED;
               if (status.toLowerCase() === "ended") return MatchStatus.FINISHED;
               if (status.toLowerCase() === "enqueued") return MatchStatus.NO_TABLE;
               if (status.toLowerCase() === "noTeams") {
                  if (team1Id || team1Id) return MatchStatus.NO_ONE_TEAM;
                  else return MatchStatus.NO_TEAMS;
               }
               return MatchStatus.STATUS_NOT_EXIST;
            }

            const team1Players = teamPlayersNames(team1Id)
            const team2Players = teamPlayersNames(team2Id)
            return {
               level: findLevel(),
               matchId: findMatchId(),
               matchNumber: matchNumber,
               matchStatus: findStatus(),
               onClickTeam: (matchId: string, winnerPlayerId: string) => setMatchWinner(matchId, winnerPlayerId, reloadAllList),
               tableNumber: tableNumber,
               winnerId: findWinnerId(),
               team1: {
                  firstPlayerName: team1Players[0],
                  secondPlayerName: team1Players[1],
                  teamId: team1Id,
               },
               team2: {
                  firstPlayerName: team2Players[0],
                  secondPlayerName: team2Players[1],
                  teamId: team2Id,
               }
            }
         }
      )
}

const getMatchDetailsDto = (matchId: string, team1: string | undefined, team2: string | undefined): Promise<MatchDetailsDto> => MatchDetailsRestAPI()
   .getTournamentMatch(matchId)
   .then(({firstMatchSideId, matchId, secondMatchSideId, winnerId}) => ({
      matchId: matchId,
      firstMatchSideId: firstMatchSideId,
      secondMatchSideId: secondMatchSideId,
      winnerId: winnerId
   }))
   .catch(() => ({
      matchId: matchId,
      firstMatchSideId: team1,
      secondMatchSideId: team2,
      winnerId: undefined
   })
)

const getPlayerProfileDto = (playerId: string): Promise<PlayerProfileDto> => UserProfileRestApi()
   .getPlayerProfile(playerId)
   .then(({emailAddress, firstName, lastName, phoneNumber, playerId}) => (
      {playerId, firstName, lastName, phoneNumber, emailAddress,}));

const getTournamentTeamsListDto = (tournamentId: string): Promise<TournamentTeamsListDto> => TournamentTeamsListRestApi()
   .getTournamentMatch(tournamentId)
   .then(teamsList => teamsList);

const setMatchWinner = (matchId: string, winnerPlayerId: string, reloadAllList: () => void) => MatchDetailsRestAPI()
   .postMatchWinner(matchId, winnerPlayerId)
   .then(() => reloadAllList());


