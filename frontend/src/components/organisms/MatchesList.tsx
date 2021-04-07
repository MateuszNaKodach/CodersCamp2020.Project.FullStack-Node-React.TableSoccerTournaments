import React from 'react';
import styled from "styled-components";
import {Card} from '@material-ui/core';
import {MatchItem} from "../molecules/MatchItem/MatchItem";
import {MIN_CARD_COMPONENT_WIDTH} from "../atoms/constants/sizes";

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
        matchNumber: 0,
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

export type MatchListProps = {
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
    }
};
const StyledMatchesList = styled(Card)({
    minWidth: MIN_CARD_COMPONENT_WIDTH,
});

export const MatchesList = () => {

    return (
        <>
            <StyledMatchesList>
                {exampleDataBase.map(generateMatchItem)}
            </StyledMatchesList>
        </>
    )
};

const generateMatchItem = (matchItem: MatchListProps, index: number) => (<MatchItem
        level={matchItem.level}
        matchNumber={matchItem.matchNumber}
        matchStatus={matchItem.matchStatus}
        onClickTeam={matchItem.onClickTeam}
        team1={matchItem.team1}
        team2={matchItem.team2}
        key={index}
    />
)

function callBackFunction() {
    console.log("AaaBbbCcc")
}
