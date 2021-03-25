import React from 'react';
import {Button, Card, CardContent,} from "@material-ui/core";
import styled from "styled-components";
import CardTitle from "../CardTitle/CardTitle";
import {VerticalSpace} from "../Shared/VerticalSpace";
import {Centered} from "../Shared/Centered";

export const StartMenuComponent = () => {
    const startMenuComponent = (
        <StartMenuCard>
            <CardContent>
                <Centered>
                    <CardTitle title={undefined}/>
                    <Button variant="contained" color="primary">
                        Turniej
                    </Button>
                    <VerticalSpace height="1rem"/>
                    <Button variant="contained" color="primary">
                        Zawodnicy
                    </Button>
                </Centered>
            </CardContent>
        </StartMenuCard>
    );
    return (
        startMenuComponent
    );
}

const StartMenuCard = styled(Card)({
    display:"block",
    boxSizing: "border-box",
    minWidth: "300px",
    paddingTop: "40px",
    paddingBottom: "40px",
});




