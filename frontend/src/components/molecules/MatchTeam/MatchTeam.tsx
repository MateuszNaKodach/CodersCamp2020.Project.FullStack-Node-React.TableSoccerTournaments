import React from 'react';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import {makeStyles} from "@material-ui/core/styles";
import {Typography} from "@material-ui/core";
import {Card} from '@material-ui/core';

export type MatchTeamProps = {
   readonly player1: string | undefined;
   readonly player2: string | undefined;
   readonly teamId: number | string | undefined;
   readonly isWinnerTeam: boolean;
   readonly isMatchFinished: boolean;
   readonly   isMatchReadyToStart: boolean;
};

const useStyles = makeStyles((theme) => ({
   root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
   },

   teamItem: {
      boxSizing: "border-box",
      display: "inline-flex",
      width: '100%',
      paddingLeft: "30px",
   },

   avatar: {
      padding: "15px 0"
   },

   avatarColor: {
      color: theme.palette.getContrastText(theme.palette.primary.main),
      backgroundColor: theme.palette.primary.main,
   },

   inline: {
      display: 'inline',
   },

   waitingForTeam: {
      display: 'inline',
      color: 'red'
   },

}));

export const MatchTeam = ({
                             player1,
                             player2,
                             isMatchFinished,
                             isWinnerTeam,
                             teamId,
                             isMatchReadyToStart
                          }: MatchTeamProps) => {
   const classes = useStyles();

   const isWaitingForTeam = !(teamId);
   const WaitingForTeam = <span className={classes.waitingForTeam}>"Oczekiwanie na drużynę"</span>;

   const player1Text = player1 || "player1";
   const player2Text = player2 || "player2";

   const playersNameText = <><span className={classes.inline}>{player1Text}</span><br/><span
      className={classes.inline}> & {player2Text} </span></>;
   const avatarSymbol = (player1Text[0].toUpperCase() + player2Text[0].toUpperCase())
   const playersTitle = isWaitingForTeam ? WaitingForTeam : playersNameText;

   const isWaitingForEnemyTeamDescription = !(isMatchFinished || isMatchReadyToStart || isWaitingForTeam);
   const WaitingForEnemyTeamDescription = (
      <>"Oczekiwanie na "
         <Typography
            component="span"
            variant="body2"
            className={classes.inline}
            color="textPrimary"
         >
            `przeciwnika`
         </Typography>
      </>
   )

   const isReadyToStartMatchDescription = !isMatchFinished && isMatchReadyToStart && !isWaitingForTeam;
   const ReadyToStartMatchDescription = (
      <>
         "Aby ustawić zwycięzcę -"
         <Typography
            component="span"

            variant="body2"
            className={classes.inline}
            color="textPrimary"
         >
            `Kliknij tu!`
         </Typography>
      </>
   )

   const isFinishedMatchDescription = isMatchFinished;
   const FinishedMatchDescription = (
      <Typography
         component="span"
         variant="body2"
         className={classes.inline}
         color="textPrimary"
      >
         {isWinnerTeam ? `Zwycięzca!` : `Przegrany!`}
      </Typography>
   )

   return (
      <Card className={classes.teamItem}>

         <ListItemAvatar className={classes.avatar}>
            <Avatar className={classes.avatarColor}>{isWaitingForTeam ? "..." : avatarSymbol}</Avatar>
         </ListItemAvatar>

         <ListItemText
            primary={playersTitle}
            secondary=
               {<>
                  {isFinishedMatchDescription && FinishedMatchDescription}
                  {isReadyToStartMatchDescription && ReadyToStartMatchDescription}
                  {isWaitingForEnemyTeamDescription && WaitingForEnemyTeamDescription}
               </>}
         />
      </Card>
   )
}

