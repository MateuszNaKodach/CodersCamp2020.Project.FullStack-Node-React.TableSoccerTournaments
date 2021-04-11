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
    readonly teamNumber: number | string | undefined;
    readonly currentPlayerLevel: number | undefined;
    readonly currentMatchNumber: number | undefined;
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

export const MatchTeam = (props: MatchTeamProps) => {
    const classes = useStyles();

    const noInformation = "Brak danych";
    const WaitingForTeam = <span className={classes.waitingForTeam}>"Oczekiwanie"</span>;
    const player1 = props.player1 || "player1";
    const player2 = props.player2 || "player2";
    const avatarSymbol = (typeof props.teamNumber === "string" ? props.teamNumber[0] : props.teamNumber)
    const teamName = props.teamNumber;
    const currentPlayerLevel = (props.currentPlayerLevel || props.currentPlayerLevel === 0) ? props.currentPlayerLevel : noInformation;
    const currentMatchNumber = (props.currentMatchNumber || props.currentMatchNumber === 0) ? props.currentPlayerLevel
        : noInformation;
    const teamNameTitle = <span>Team: <br/> {teamName ? teamName?.toString().slice(0,15):WaitingForTeam }...</span>;
    const playersNameText = <><span className={classes.inline}>{player1}</span><br/><span className={classes.inline}> & {player2} </span></>;

    return (
        <>
            <Card className={classes.teamItem}>

                <ListItemAvatar className={classes.avatar}>
                    <Avatar className={classes.avatarColor}>{avatarSymbol}</Avatar>
                </ListItemAvatar>

                <ListItemText
                    primary={teamNameTitle}
                    secondary={
                        <React.Fragment>
                            {playersNameText}
                            <br/>
                            <Typography
                                component="span"
                                variant="body2"
                                className={classes.inline}
                                color="textPrimary"
                            >
                                {`Aktualny Poziom: `}
                            </Typography>
                            {currentPlayerLevel}
                            <br/>
                            <Typography
                                component="span"
                                variant="body2"
                                className={classes.inline}
                                color="textPrimary"
                            >
                                {`Aktualny Mecz: `}
                            </Typography>
                            {currentMatchNumber}
                        </React.Fragment>
                    }
                />

            </Card>
        </>
    )
}