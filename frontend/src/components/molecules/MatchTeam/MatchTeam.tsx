import React from 'react';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import {makeStyles} from "@material-ui/core/styles";
import {Card, Typography} from "@material-ui/core";
import {MatchStatusTexts} from "../../atoms/constants/MatchStatusTexts";

export type MatchTeamProps = {
   readonly player1: string | undefined;
   readonly player2: string | undefined;
   readonly teamId: string | undefined;
   readonly isWinnerTeam: boolean;
   readonly matchStatus: MatchStatusTexts;
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

export const MatchTeam = (
   {
      player1,
      player2,
      isWinnerTeam,
      teamId,
      matchStatus
   }: MatchTeamProps) => {
   const classes = useStyles();

   const isStartedMatch = matchStatus === MatchStatusTexts.STARTED;
   const isFinishedMatch = matchStatus === MatchStatusTexts.FINISHED;
   const isWaitingForOneTeam = matchStatus === MatchStatusTexts.NO_ONE_TEAM;
   const isWaitingForBothTeams = matchStatus === MatchStatusTexts.NO_TEAMS;
   const isWaitingForTable = matchStatus === MatchStatusTexts.NO_TABLE
   const isWaitingForThisTeam = !(teamId);
   const isWaitingForEnemyTeam = isWaitingForOneTeam && !isWaitingForThisTeam;

   const player1Text = player1 || "NoNamePlayer1";
   const player2Text = player2 || "NoNamePlayer2";

   const WaitingForTeam = <span className={classes.waitingForTeam}>"Oczekiwanie na drużynę"</span>;
   const playersNameText = <><span className={classes.inline}>{player1Text}</span>
      <br/><span className={classes.inline}> & {player2Text} </span></>;

   const avatarSymbol = (player1Text[0].toUpperCase() + player2Text[0].toUpperCase())
   const playersTitle = isWaitingForThisTeam ? WaitingForTeam : playersNameText;

   const WaitingForEnemyTeamDescription = (
      <>
         "Oczekiwanie na
         <Typography
            component="span"
            variant="body2"
            className={classes.inline}
            color="textPrimary"
         >
            {` przeciwnika`}
         </Typography>
         ".
      </>
   )

   const WaitingForTableDescription = (
      <span>"W oczekiwaniu na wolne stoły..."</span>
   )

   const ReadyToStartMatchDescription = (
      <>
         Aby ustawić zwycięzcę -
         <Typography component="span" variant="body2" className={classes.inline} color="textPrimary">
            Kliknij tu!
         </Typography>
      </>
   )

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
            <Avatar className={classes.avatarColor}>{isWaitingForThisTeam ? "..." : avatarSymbol}</Avatar>
         </ListItemAvatar>

         <ListItemText
            primary={playersTitle}
            secondary=
               {<>
                  {isFinishedMatch && FinishedMatchDescription}
                  {isStartedMatch && ReadyToStartMatchDescription}
                  {isWaitingForEnemyTeam && WaitingForEnemyTeamDescription}
                  {isWaitingForTable && WaitingForTableDescription}
               </>}
         />
      </Card>
   )
}

