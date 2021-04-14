import React from 'react';
import styled from "styled-components";
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import {Avatar, Card, Typography, withStyles} from '@material-ui/core';
import {MatchTeam} from "../MatchTeam/MatchTeam";
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {THEME} from "../../atoms/constants/ThemeMUI";
import AddCircleTwoToneIcon from '@material-ui/icons/AddCircleTwoTone';
import MatchWinnerDeterminationDialog from "../MatchWinnerDeterminationDialog/MatchWinnerDeterminationDialog";
import {MatchStatus} from "../../atoms/MatchStatus";

export type MatchItemProps = {
   level: number | undefined,
   matchId: string | undefined,
   matchNumber: number | undefined,
   matchStatus: MatchStatus,
   onClickTeam: (matchId: string, teamId: string) => void,
   tableNumber: number | undefined,
   winnerTeamId: string | undefined;
   team1: {
      readonly firstPlayerName: string | undefined;
      readonly secondPlayerName: string | undefined;
      readonly teamId: string | undefined;
   },
   team2: {
      readonly firstPlayerName: string | undefined;
      readonly secondPlayerName: string | undefined;
      readonly teamId: string | undefined;
   },
   expanded: string | boolean,
   handleChangeExpander: (panel: string | boolean) => (event: any, isExpanded: string | boolean) => void,
};

const TeamHoverButton = styled("div")({
   "zIndex": 1,
   boxSizing: "border-box",
   display: 'inline-flex',
   position: "absolute",
   width: "100%",
   height: "100%",
   margin: 0,
   padding: 0,
   "justify-content": "center",
   "align-items": "center",
   fontSize: "65px",
   backgroundColor: THEME.palette.success.light,
   opacity: 0,
   cursor: "pointer",
   transition: "opacity 1s",
   '&:hover': {
      opacity: 0.8,
   },
});

const MatchTeamWrapper = styled(Card)({
   position: "relative",
   margin: "3px"
});

const StyledAccordionDetails = styled(AccordionDetails)({
   display: "flex",
   flexDirection: "column",
   backgroundColor: THEME.palette.background.default,
});

const StyledAvatar = withStyles({
   root: {
      color: THEME.palette.getContrastText(THEME.palette.secondary.main),
      backgroundColor: THEME.palette.secondary.main,
   },
})(Avatar);

const MatchItemWrapper = withStyles({
   root: {
      width: "100%"
   }
})(Card);

export const MatchItem = (
   {
      expanded,
      handleChangeExpander,
      level,
      matchId,
      matchNumber,
      matchStatus,
      onClickTeam,
      team1,
      team2,
      winnerTeamId
   }: MatchItemProps,) => {

   const isWinnerTeam1 = winnerTeamId === team1.teamId;
   const isWinnerTeam2 = winnerTeamId === team2.teamId;

   const isMatchFinished = matchStatus === MatchStatus.FINISHED;
   const isMatchStarted = matchStatus === MatchStatus.STARTED;

   const agreeDialogCallback = (matchId: string, teamName: string): void => onClickTeam(matchId, teamName);


   return (
      <MatchItemWrapper elevation={3}>
         <Accordion expanded={expanded === `panel${matchNumber}`}
                    onChange={handleChangeExpander(`panel${matchNumber}`)}>
            <AccordionSummary
               expandIcon={<ExpandMoreIcon/>}
               aria-controls="panel1bh-content"
               id="panel1bh-header"
            >
               <ListItemAvatar>
                  <StyledAvatar>{matchNumber}</StyledAvatar>
               </ListItemAvatar>

               <ListItemText
                  primary={`- ${matchStatus} -`}
                  secondary={
                     <React.Fragment>
                        <Typography
                           component="span"
                           variant="body2"
                           display="inline"
                           color="textPrimary"
                        >
                           {`Numer meczu: `}
                        </Typography>
                        {(matchNumber || matchNumber === 0) ? matchNumber : "-"}
                        <br/>
                        <Typography
                           component="span"
                           variant="body2"
                           display="inline"
                           color="textPrimary"
                        >
                           {`Poziom: `}
                        </Typography>
                        {(level || level === 0) ? level : "-"}
                     </React.Fragment>
                  }
               />
            </AccordionSummary>
            <StyledAccordionDetails>

               <MatchTeamWrapper>
                  <TeamHoverButtonComponent
                     matchId={matchId}
                     teamId={team1.teamId}
                     firstPlayerName={team1.firstPlayerName}
                     secondPlayerName={team1.secondPlayerName}
                     agreeDialogCallback={agreeDialogCallback}
                  />
                  <MatchTeam
                     isWinnerTeam={isWinnerTeam1}
                     matchStatus={matchStatus}
                     teamId={team1.teamId}
                     player1={team1.firstPlayerName}
                     player2={team1.secondPlayerName}
                  />
               </MatchTeamWrapper>

               <MatchTeamWrapper>
                  <TeamHoverButtonComponent
                     matchId={matchId}
                     teamId={team2.teamId}
                     firstPlayerName={team2.firstPlayerName}
                     secondPlayerName={team2.secondPlayerName}
                     agreeDialogCallback={agreeDialogCallback}
                  />
                  <MatchTeam
                     isWinnerTeam={isWinnerTeam2}
                     matchStatus={matchStatus}
                     teamId={team2.teamId}
                     player1={team2.firstPlayerName}
                     player2={team2.secondPlayerName}
                  />
               </MatchTeamWrapper>

            </StyledAccordionDetails>
         </Accordion>
      </MatchItemWrapper>
   )
};

const TeamHoverButtonComponent = (props: {
   matchId: string | undefined,
   teamId: string | undefined,
   firstPlayerName: string | undefined,
   secondPlayerName: string | undefined,
   agreeDialogCallback: (matchId: string, teamId: string) => void
}) => {
   const matchId = props.matchId;
   const teamId = props.teamId;
   const firstPlayerName = props.firstPlayerName;
   const secondPlayerName = props.secondPlayerName;

   if (!matchId || !teamId) return <div/>;

   return (
      <TeamHoverButton>
         <AddCircleTwoToneIcon fontSize="inherit"/>
         <MatchWinnerDeterminationDialog
            agreeCallback={() => props.agreeDialogCallback(matchId, teamId)}
            isOpen={false}
            teamPlayersNames={`"${firstPlayerName} & ${secondPlayerName}"`}
         />
      </TeamHoverButton>
   );
}