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
   onClickTeam: (matchId: string, teamId: string) => void,
   matchNumber: number | undefined,
   matchId: string | undefined,
   level: number | undefined,
   matchStatus: MatchStatus,
   winnerTeamId: string | undefined;
   team1: {
      readonly player1: string | undefined;
      readonly player2: string | undefined;
      readonly teamId: string | undefined;
   },
   team2: {
      readonly player1: string | undefined;
      readonly player2: string | undefined;
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

export const MatchItem = (props: MatchItemProps,) => {

   const isWinnerTeam1 = props.winnerTeamId === props.team1.teamId;
   const isWinnerTeam2 = props.winnerTeamId === props.team2.teamId;

   const isMatchFinished = props.matchStatus === MatchStatus.FINISHED;
   const isMatchStarted = props.matchStatus === MatchStatus.STARTED;

   const agreeDialogCallback = (matchId: string, teamName: string): void => props.onClickTeam(matchId, teamName);


   const TeamHoverButtonComponent = (p: { matchId: string | undefined, teamId: string | undefined }) => {
      const matchId = p.matchId;
      const teamId = p.teamId;

      if (!matchId || !teamId) return <div/>;

      return (
         <TeamHoverButton>
            <AddCircleTwoToneIcon fontSize="inherit"/>
            <MatchWinnerDeterminationDialog
               agreeCallback={() => agreeDialogCallback(matchId, teamId)}
               isOpen={false}
               teamName={teamId}
            />
         </TeamHoverButton>
      );
   }

   return (
      <MatchItemWrapper elevation={3}>
         <Accordion expanded={props.expanded === `panel${props.matchNumber}`}
                    onChange={props.handleChangeExpander(`panel${props.matchNumber}`)}>
            <AccordionSummary
               expandIcon={<ExpandMoreIcon/>}
               aria-controls="panel1bh-content"
               id="panel1bh-header"
            >
               <ListItemAvatar>
                  <StyledAvatar>{props.matchNumber}</StyledAvatar>
               </ListItemAvatar>

               <ListItemText
                  primary={`- ${props.matchStatus} -`}
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
                        {(props.matchNumber || props.matchNumber === 0) ? props.matchNumber : "-"}
                        <br/>
                        <Typography
                           component="span"
                           variant="body2"
                           display="inline"
                           color="textPrimary"
                        >
                           {`Poziom: `}
                        </Typography>
                        {(props.level || props.level === 0) ? props.level : "-"}
                     </React.Fragment>
                  }
               />
            </AccordionSummary>
            <StyledAccordionDetails>

               <MatchTeamWrapper>

                  <TeamHoverButtonComponent matchId={props.matchId} teamId={props.team1.teamId}/>

                  <MatchTeam
                     isWinnerTeam={isWinnerTeam1}
                     matchStatus={props.matchStatus}
                     teamId={props.team1.teamId}
                     player1={props.team1.player1}
                     player2={props.team1.player2}
                  />

               </MatchTeamWrapper>

               <MatchTeamWrapper>
                  <TeamHoverButtonComponent matchId={props.matchId} teamId={props.team2.teamId}/>


                  <MatchTeam
                     isWinnerTeam={isWinnerTeam2}
                     matchStatus={props.matchStatus}
                     teamId={props.team2.teamId}
                     player1={props.team1.player1}
                     player2={props.team1.player2}
                  />
               </MatchTeamWrapper>

            </StyledAccordionDetails>
         </Accordion>
      </MatchItemWrapper>
   )
};

