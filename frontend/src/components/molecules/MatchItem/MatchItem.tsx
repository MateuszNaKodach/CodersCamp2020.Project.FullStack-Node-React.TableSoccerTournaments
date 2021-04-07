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

export type MatchItemProps = {
    onClickTeam: () => void,
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

    return (
        <>
            <MatchItemWrapper elevation={3}>
                <Accordion expanded={props.expanded === `panel${props.matchNumber}`}
                           onChange={props.handleChangeExpander(`panel${props.matchNumber}`)}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <ListItemAvatar>
                            <StyledAvatar>1</StyledAvatar>
                        </ListItemAvatar>

                        <ListItemText
                            primary={`Mecz ${props.matchStatus ? ` - ${props.matchStatus}` : '-'}`}
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
                                    {(props.level || props.level === 0) ? props.level : "-"}
                                    {/*{props.level}*/}
                                </React.Fragment>
                            }
                        />
                    </AccordionSummary>
                    <StyledAccordionDetails>

                        <MatchTeamWrapper>
                            <TeamHoverButton>
                                <AddCircleTwoToneIcon fontSize="inherit"/>
                                <MatchWinnerDeterminationDialog
                                    agreeCallback={() => agreeDialogCallback(props.team1.teamNumber)}
                                    isOpen={false}
                                    teamName={props.team1.teamNumber}
                                />
                            </TeamHoverButton>


                            <MatchTeam
                                currentMatchNumber={props.team1.currentMatchNumber}
                                teamNumber={props.team1.teamNumber}
                                currentPlayerLevel={props.team1.currentPlayerLevel}
                                player1={props.team1.player1}
                                player2={props.team1.player2}
                            />

                        </MatchTeamWrapper>

                        <MatchTeamWrapper>

                            <TeamHoverButton>
                                <AddCircleTwoToneIcon fontSize="inherit"/>
                                <MatchWinnerDeterminationDialog
                                    agreeCallback={() => agreeDialogCallback(props.team2.teamNumber)}
                                    isOpen={false}
                                    teamName={props.team2.teamNumber}
                                />
                            </TeamHoverButton>

                            <MatchTeam
                                currentMatchNumber={props.team2.currentMatchNumber}
                                teamNumber={props.team2.teamNumber}
                                currentPlayerLevel={props.team2.currentPlayerLevel}
                                player1={props.team2.player1}
                                player2={props.team2.player2}
                            />
                        </MatchTeamWrapper>

                    </StyledAccordionDetails>
                </Accordion>
            </MatchItemWrapper>
        </>
    )
};

const agreeDialogCallback = (teamName: string | number | undefined): void => {
console.log(teamName);
}
