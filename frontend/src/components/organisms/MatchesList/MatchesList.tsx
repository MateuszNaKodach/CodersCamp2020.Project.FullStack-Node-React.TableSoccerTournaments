import React from 'react';
import styled from "styled-components";
import {Card} from '@material-ui/core';
import {MatchItem} from "../../molecules/MatchItem/MatchItem";
import {MIN_CARD_COMPONENT_WIDTH} from "../../atoms/constants/sizes";
import {MatchListProps} from "./MatchesListProps";

const exampleDataBase: MatchListProps[] = [
    {
        onClickTeam: callBackFunction,
        matchNumber: 0,
        level: 1,
        matchStatus: "aktywny",
        team1: {
            player1: "Lord Json",
            player2: "Waszmość Brzuszek",
            teamNumber: "1",
            currentPlayerLevel: 0,
            currentMatchNumber: 0,
        },
        team2: {
            player1: "Kot Długosz Maurycy",
            player2: "Kot Mańkut Leworęczny",
            teamNumber: "4",
            currentPlayerLevel: 0,
            currentMatchNumber: 0,
        }
    },
    {
        onClickTeam: () => {
            console.log("AaaBbbCcc")
        },
        matchNumber: 1,
        level: 1,
        matchStatus: "aktywny",
        team1: {
            player1: "Damian Kołodziej",
            player2: "Marcel Borkowski",
            teamNumber: "2",
            currentPlayerLevel: 0,
            currentMatchNumber: 0,
        },
        team2: {
            player1: "Bartłomiej Lis",
            player2: "Jan Wróblewski",
            teamNumber: "3",
            currentPlayerLevel: 0,
            currentMatchNumber: 0,
        }
    }
];

const StyledMatchesList = styled(Card)({
    width: MIN_CARD_COMPONENT_WIDTH,
});

export type MatchesListProps = {
    readonly tournamentId: string;
};

export const MatchesList = (props: MatchesListProps) => {

    const [expanded, setExpanded] = React.useState<string | boolean>(false);
    const handleChangeExpander = (panel: string | boolean) => (event: any, isExpanded: string | boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <>
            <StyledMatchesList>
                {exampleDataBase.map((item, index) => generateMatchItem(item, index, expanded, handleChangeExpander))}
            </StyledMatchesList>
        </>
    )
};

const generateMatchItem = (matchItem: MatchListProps, index: number, expanded: string | boolean, handleChangeExpander: (panel: string | boolean) => (event: any, isExpanded: string | boolean) => void) => (
    <MatchItem
        level={matchItem.level}
        matchNumber={matchItem.matchNumber}
        matchStatus={matchItem.matchStatus}
        onClickTeam={matchItem.onClickTeam}
        team1={matchItem.team1}
        team2={matchItem.team2}
        key={matchItem.matchNumber}
        expanded={expanded}
        handleChangeExpander={handleChangeExpander}
    />
)

function callBackFunction() {
    console.log("AaaBbbCcc")
}
