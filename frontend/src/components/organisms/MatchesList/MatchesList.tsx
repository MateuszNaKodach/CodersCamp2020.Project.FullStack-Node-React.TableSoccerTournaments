import React, {useEffect} from 'react';
import styled from "styled-components";
import {Card} from '@material-ui/core';
import {MatchItem} from "../../molecules/MatchItem/MatchItem";
import {MIN_CARD_COMPONENT_WIDTH} from "../../atoms/constants/sizes";
import {MatchListItem} from "./MatchListItem";
import {MatchesListRestApi} from "../../../restapi/matches-list";
import {MatchesListDto} from "./MatchesListDto";
import {MatchStatus} from "./MatchStatus";

const StyledMatchesList = styled(Card)({
    width: MIN_CARD_COMPONENT_WIDTH,
});

export type MatchesListProps = {
    readonly tournamentId: string;
};

export const MatchesList = ({tournamentId}: MatchesListProps) => {

    const [expanded, setExpanded] = React.useState<string | boolean>(false);
    const [matchesListItems, setMatchesListItems] = React.useState<MatchListItem[] | undefined>();

    useEffect(() => {
        MatchesListRestApi()
            .getMatchesList(tournamentId)
            .then((matchesListDto) => {
                const newMatchesListItems = createMatchListItemsFromMatchesListDto(matchesListDto);
                setMatchesListItems(newMatchesListItems)
            });
    }, [tournamentId]);

    const handleChangeExpander = (panel: string | boolean) => (event: any, isExpanded: string | boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <>
            <StyledMatchesList>
                {matchesListItems ? matchesListItems.map((item, index) => generateMatchItem(item, index, expanded, handleChangeExpander)) : "Oczekiwanie na pobranie"}
            </StyledMatchesList>
        </>
    )
};

const generateMatchItem = (matchItem: MatchListItem, index: number, expanded: string | boolean, handleChangeExpander: (panel: string | boolean) => (event: any, isExpanded: string | boolean) => void) => (
    <MatchItem
        level={matchItem.level}
        matchNumber={matchItem.matchNumber}
        matchStatus={matchItem.matchStatus}
        onClickTeam={matchItem.onClickTeam}
        team1={matchItem.team1}
        team2={matchItem.team2}
        winnerTeamId={"aa"}
        key={matchItem.matchNumber}
        expanded={expanded}
        handleChangeExpander={handleChangeExpander}
    />
)

function callBackFunction() {
    console.log("AaaBbbCcc")
}



const createMatchListItemsFromMatchesListDto = (matchesListDto: MatchesListDto): MatchListItem[] => {
    return matchesListDto.queue.map((matchesItem) => {
        function findStatus(): string | undefined {
            if (matchesItem.started) return MatchStatus.FINISHED;
            if (!(matchesItem.team1Id && matchesItem.team2Id)) return MatchStatus.NO_PLAYERS;
            // TODO: jeśli brak stołu - proponowane rozszerzenie w przyszłości
            if (false) return MatchStatus.NO_TABLE;
            return MatchStatus.CALLED;
        }

        return {
            onClickTeam: callBackFunction,
            matchNumber: matchesItem.matchNumber,
            level: undefined,
            matchStatus: findStatus(),
            team1: {
                player1: undefined,
                player2: undefined,
                teamId: matchesItem.team1Id,
                currentPlayerLevel: undefined,
                currentMatchNumber: undefined,
            },
            team2: {
                player1: undefined,
                player2: undefined,
                teamId: matchesItem.team2Id,
                currentPlayerLevel: undefined,
                currentMatchNumber: undefined,
            }

        } as MatchListItem
    })
}