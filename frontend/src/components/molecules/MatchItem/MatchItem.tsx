import React from 'react';
import styled from "styled-components";
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import {Avatar, withStyles} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import {Divider, List, Typography, useTheme} from "@material-ui/core";
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
import {deepOrange, deepPurple,green, lightGreen ,yellow,grey} from "@material-ui/core/colors";
import {THEME_MUI} from "../../atoms/constants/ThemeMUI";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';
import AddCircleTwoToneIcon from '@material-ui/icons/AddCircleTwoTone';

const exampleDataBase = {
    onClickTeam: () => {
    },
    matchNumber: 0,
    level: 1,
    matchStatus: "aktywny",
    team1: {
        player1: "Lord Json",
        player2: "Waszmość Brzuszek",
        teamNumber: "xyz",
        currentPlayerLevel: 0,
        currentMatchNumber: 0,
    },
    team2: {
        player1: "Lord Json",
        player2: "Waszmość Brzuszek",
        teamNumber: "xyz",
        currentPlayerLevel: 0,
        currentMatchNumber: 0,
    }
};

export type MatchItemProps = {
    onClickTeam: () => {},
    matchNumber: number | undefined,
    level: number | undefined,
    matchStatus: string | undefined
    team1: {
        readonly player1: string | undefined;
        readonly player2: string | undefined;
        readonly teamNumber: number | string | undefined;
        readonly currentPlayerLevel: number | undefined;
        readonly currentMatchNumber: number | undefined;
    },
    team2: {
        readonly player1: string | undefined;
        readonly player2: string | undefined;
        readonly teamNumber: string | undefined;
        readonly currentPlayerLevel: number | undefined;
        readonly currentMatchNumber: number | undefined;
    }
};

const TeamHover = styled("div")({
    "zIndex" : 1,
    boxSizing: "border-box",
    display: 'inline-flex',
    position: "absolute",
    width: "100%",
    height: "100%",
    margin: 0,
    padding: 0,
    "justify-content": "center" ,
    "align-items": "center" ,
    fontSize: "65px",
    backgroundColor: THEME_MUI.palette.success.light,
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
    backgroundColor: THEME_MUI.palette.background.default,
    // marginBottom: "30px",
});

const StyledAvatar = withStyles({
    root: {
        color: THEME_MUI.palette.getContrastText(THEME_MUI.palette.secondary.main),
        backgroundColor: THEME_MUI.palette.secondary.main,
    },
})(Avatar);

const MatchItemWrapper = withStyles({
    root: {
        width: "100%"
    }
})(Card);



const MatchItem = (props: MatchItemProps) => {
    const [expanded, setExpanded] = React.useState<string | boolean>(false);

    const handleChangeExpander = (panel: string | boolean) => (event: any, isExpanded: string | boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <>
            <MatchItemWrapper elevation={3} >
                <Accordion expanded={expanded === 'panel1'} onChange={handleChangeExpander('panel1')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <ListItemAvatar>
                            <StyledAvatar>1</StyledAvatar>
                        </ListItemAvatar>

                        <ListItemText
                            primary={`Mecz ${exampleDataBase.matchStatus ? ` - ${exampleDataBase.matchStatus}` : '-'}`}
                            // primary={`Mecz - ${props.matchStatus}`}
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
                                    {(exampleDataBase.matchNumber || exampleDataBase.matchNumber === 0)  ? exampleDataBase.matchNumber : "-"}
                                    {/*{props.mechNumber}*/}
                                    <br/>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        display="inline"
                                        color="textPrimary"
                                    >
                                        {`Poziom: `}
                                    </Typography>
                                    {(exampleDataBase.level || exampleDataBase.level === 0  ) ? exampleDataBase.level : "-"}
                                    {/*{props.level}*/}
                                </React.Fragment>
                            }
                        />
                    </AccordionSummary>
                    <StyledAccordionDetails>

                        <MatchTeamWrapper>
                            <TeamHover onClick={() => exampleDataBase.onClickTeam()}>
                                <AddCircleTwoToneIcon fontSize="inherit" />
                            </TeamHover>
                            {/*<MatchTeam*/}
                            {/*currentMatchNumber={props.team1.currentMatchNumber}*/}
                            {/*teamNumber={props.team1.teamNumber}*/}
                            {/*currentPlayerLevel={props.team1.currentPlayerLevel}*/}
                            {/*player1={props.team1.player1}*/}
                            {/*player2={props.team1.player2}*/}
                            {/*/>*/}

                            <MatchTeam
                                currentMatchNumber={exampleDataBase.team1.currentMatchNumber}
                                teamNumber={exampleDataBase.team1.teamNumber}
                                currentPlayerLevel={exampleDataBase.team1.currentPlayerLevel}
                                player1={exampleDataBase.team1.player1}
                                player2={exampleDataBase.team1.player2}
                            />

                        </MatchTeamWrapper>

                        <MatchTeamWrapper>

                            <TeamHover onClick={() => exampleDataBase.onClickTeam()}>
                                <AddCircleTwoToneIcon fontSize="inherit" />
                            </TeamHover>
                            {/*<MatchTeam*/}
                            {/*    currentMatchNumber={props.team2.currentMatchNumber}*/}
                            {/*    teamNumber={props.team2.teamNumber}*/}
                            {/*    currentPlayerLevel={props.team2.currentPlayerLevel}*/}
                            {/*    player1={props.team2.player1}*/}
                            {/*    player2={props.team2.player2}*/}
                            {/*/>*/}

                            <MatchTeam
                                currentMatchNumber={exampleDataBase.team1.currentMatchNumber}
                                teamNumber={exampleDataBase.team1.teamNumber}
                                currentPlayerLevel={exampleDataBase.team1.currentPlayerLevel}
                                player1={exampleDataBase.team1.player1}
                                player2={exampleDataBase.team1.player2}
                            />
                        </MatchTeamWrapper>

                    </StyledAccordionDetails>
                </Accordion>
            </MatchItemWrapper>


        </>
    )
};


export default styled(({...otherProps}) => (
    <MatchItem {...otherProps}   />
))`
     marginBottom: "20px",
     backGround: "black",
`;
