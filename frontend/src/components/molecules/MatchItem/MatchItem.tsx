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
import {Divider, List, Typography} from "@material-ui/core";
// import {makeStyles} from "@material-ui/core/styles";
import {MatchTeam} from "../MatchTeam/MatchTeam";
import {MDCRipple} from '@material/ripple';
// import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
// import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import {Card} from '@material-ui/core';
import {deepOrange, deepPurple} from "@material-ui/core/colors";


const exampleDataBase = [{
    level: 0,
    number: 1,
    status: "active",
    teamName1: "team1",
    teamNumber1: "1",
    teamName2: "team2",
    teamNumber2: "2",
}]

export type MatchItemProps = {
    readonly title: string;
};

const useStyles = makeStyles((theme) => ({
    root: {
        position: "relative",

        width: '100%',
        maxWidth: '36ch',
        backgroundColor: theme.palette.background.paper,
    },

    header:{
    },

    teamItemList: {
        display: "flex",
        flexDirection: "column",
        backgroundColor:"rgba(0,0,0,0.05)",
        // marginBottom: "30px",
    },
    teamItem: {
        position: "relative",
// zIndex: 5,
//         "&:hover": {opacity: 0,}

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
}));


function onClick(){
    console.log("aaa");
}

const MatchItem = (props: MatchItemProps) => {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState<string | boolean>(false);

    const handleChange = (panel: string | boolean) => (event: any, isExpanded: string | boolean) => {
        setExpanded(isExpanded ? panel : false);
    };



    return (
        <>
            <Card elevation={3} className={classes.root}>
                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                        className={classes.header}
                    >
                        <ListItemAvatar >
                            <Avatar className={classes.orange}>1</Avatar>
                        </ListItemAvatar>

                        <ListItemText
                            primary="Mecz - aktywny"
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        className={classes.inline}
                                        color="textPrimary"
                                    >
                                        Numer meczu:
                                    </Typography>
                                    {" 1"}
                                    <br/>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        className={classes.inline}
                                        color="textPrimary"
                                    >
                                        Poziom:
                                    </Typography>
                                    {" 0"}
                                </React.Fragment>
                            }
                        />
                    </AccordionSummary>
                    <AccordionDetails
                        className={classes.teamItemList}>
                        <div onClick={()=>onClick()}>
                            <MatchTeam  />
                        </div>
                        <Divider variant="inset"/>

                        <MatchTeam/>


                    </AccordionDetails>
                </Accordion>

                <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                        className={classes.header}
                    >
                        <ListItemAvatar >
                            <Avatar className={classes.orange}>1</Avatar>
                        </ListItemAvatar>

                        <ListItemText
                            primary="Mecz - aktywny"
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        className={classes.inline}
                                        color="textPrimary"
                                    >
                                        Numer meczu:
                                    </Typography>
                                    {" 1"}
                                    <br/>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        className={classes.inline}
                                        color="textPrimary"
                                    >
                                        Poziom:
                                    </Typography>
                                    {" 0"}
                                </React.Fragment>
                            }
                        />
                    </AccordionSummary>
                    <AccordionDetails
                        className={classes.teamItemList}>
                        <div onClick={()=>onClick()}>
                            <MatchTeam  />
                        </div>
                        <Divider variant="inset"/>

                        <MatchTeam/>


                    </AccordionDetails>
                </Accordion>

                <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                        className={classes.header}
                    >
                        <ListItemAvatar >
                            <Avatar className={classes.orange}>1</Avatar>
                        </ListItemAvatar>

                        <ListItemText
                            primary="Mecz - aktywny"
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        className={classes.inline}
                                        color="textPrimary"
                                    >
                                        Numer meczu:
                                    </Typography>
                                    {" 1"}
                                    <br/>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        className={classes.inline}
                                        color="textPrimary"
                                    >
                                        Poziom:
                                    </Typography>
                                    {" 0"}
                                </React.Fragment>
                            }
                        />
                    </AccordionSummary>
                    <AccordionDetails
                        className={classes.teamItemList}>
                        <div onClick={()=>onClick()}>
                            <MatchTeam  />
                        </div>
                        <Divider variant="inset"/>

                        <MatchTeam/>


                    </AccordionDetails>
                </Accordion>
            </Card>


        </>
    )
};


export default styled(({...otherProps}) => (
    <MatchItem {...otherProps}   />
))`
     marginBottom: "20px",
     backGround: "black",
`;
