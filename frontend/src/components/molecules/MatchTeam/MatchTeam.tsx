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
    readonly currentMatchNumber: number |  undefined;
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
        marginTop: "3px",
        marginBottom: "3px",
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
}));

export  const  MatchTeam = (props: MatchTeamProps ) => {
    const classes = useStyles();

    const noNumber = "NN";
    const player1 = props.player1 || "player1";
    const player2 = props.player2 || "player2";
    const avatarSymbol = (typeof props.teamNumber==="string" ? props.teamNumber[0]: props.teamNumber)
    const teamNumber = avatarSymbol || noNumber;
    const currentPlayerLevel = props.currentPlayerLevel || noNumber;
    const currentMatchNumber = props.currentMatchNumber || noNumber;
    const teamNameText = "Team " + teamNumber ;
    const playersNameText = `${player1} & ${player2}`;

    return (
        <>
            <Card className={classes.teamItem}  >

                <ListItemAvatar className={classes.avatar}>
                    <Avatar className={classes.avatarColor}>{teamNumber}</Avatar>
                </ListItemAvatar>

                <ListItemText
                    primary={teamNameText}
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
};