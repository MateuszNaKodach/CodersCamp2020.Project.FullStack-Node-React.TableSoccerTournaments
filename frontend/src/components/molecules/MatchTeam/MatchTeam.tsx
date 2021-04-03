import React from 'react';
import styled from "styled-components";
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import {makeStyles} from "@material-ui/core/styles";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import {Divider, List, Typography} from "@material-ui/core";
// import {makeStyles} from "@material-ui/core/styles";
import {MDCRipple} from '@material/ripple';
// import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
// import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {SwipeableDrawer} from '@material-ui/core';

import {Card} from '@material-ui/core';
import {deepOrange, deepPurple} from "@material-ui/core/colors";


export type MatchTeamProps = {
    readonly title: string;
};

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: '36ch',
        backgroundColor: theme.palette.background.paper,
    },

    teamItemList: {
        display: "flex",
        flexDirection: "column"
    },
    teamItem: {

        boxSizing: "border-box",
        display: "inline-flex",
        width: '100%',
        paddingLeft: "30px",
        marginTop: "3px",
        marginBottom: "3px",

        "&:hover":{
            backgroundColor:"rgba(0,255,0,0.2)",
        }
    },

    background: {
        width: '100%',
        height: '100%',
        backgroundColor: "#F00",
    },

    orange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
    },
    purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
    },

    inline: {
        display: 'inline',
    },
    avatar: {
        padding: "15px 0"
    },
}));

// export  const  MatchTeam = (props: MatchTeamProps) => {
export const MatchTeam = () => {

    const classes = useStyles();
    const player1 = "player1";
    const player2 = "player2";

    const teamNameText = "Nazwa drużyny";
    const playersNameText = `${player1} & ${player2}`;


    return (
        <>

            <Card className={classes.teamItem}  >
                <ListItemAvatar className={classes.avatar}>
                    <Avatar className={classes.orange}>1</Avatar>
                </ListItemAvatar>

                <ListItemText
                    primary="Team 1"
                    secondary={
                        <React.Fragment>
                            {"(Piotr Rynio & Kot Json)"}
                            <br/>
                            <Typography
                                component="span"
                                variant="body2"
                                className={classes.inline}
                                color="textPrimary"
                            >
                                Aktualny Poziom:
                            </Typography>
                            {" 0"}
                            <br/>
                            <Typography
                                component="span"
                                variant="body2"
                                className={classes.inline}
                                color="textPrimary"
                            >
                                Aktualny Mecz::
                            </Typography>
                            {" 0"}
                        </React.Fragment>
                    }
                />

            </Card>


        </>
    )
};

// export default styled(({...otherProps}) => (
//     <MatchTeam {...otherProps}   />
// ))`
//      marginBottom: "20px",
// `;
