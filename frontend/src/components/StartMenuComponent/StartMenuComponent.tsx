import React from 'react';
import {Card, CardContent, Typography,} from "@material-ui/core";
import styled from "styled-components";
import {APP_NAME} from "../../constants/constants";
import {CardTitle} from "../CardTitle/CardTitle";
import {Title} from "@material-ui/icons";
import { Centered } from "../shared/Centered/Centered";

export type StartMenuProps = {
    // readonly tournamentId: string;
};


export const StartMenuComponent = (props: StartMenuProps) => {
    const startMenuComponent = (
        <StartMenuCard>
            <CardContent>
                <Centered>
                <CardTitle title={undefined} />
                </Centered>
        </CardContent>
        </StartMenuCard>
    );

    return (
        startMenuComponent
    );
}

const StartMenuCard = styled(Card)({
    maxWidth: "500px",
    minHeight: "500px",
});




