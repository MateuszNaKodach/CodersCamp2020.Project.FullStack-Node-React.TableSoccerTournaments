import ArrowBackButton from "../../atoms/Shared/ArrowBack/ArrowBackButton";
import {Card, Grid, Typography} from "@material-ui/core";
import styled from "styled-components";
import React from "react";
import {Centered} from "../../atoms/Shared/Centered";
import {PATH_FOR_HOME_VIEW} from "../../atoms/constants/routerPaths";

const arrowBackButtonProps = {
    onLink: PATH_FOR_HOME_VIEW
}

type cardTitleWithNavButtonProps = {
    readonly title: string;
}

const CardTitleWithNavButton = (props: cardTitleWithNavButtonProps) => {
    return (
        <PageTitleBox>
            <Grid item xs={3}>
                <ArrowBackButton onLink={arrowBackButtonProps.onLink}/>
            </Grid>
            <Grid item xs={6}>
                <Centered>
                    <Typography component="h5" variant="h5">{props.title}</Typography>
                </Centered>
            </Grid>
            <Grid item xs={3}></Grid>
        </PageTitleBox>
    )
}

const PageTitleBox = styled(Card)({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minWidth: "300px",
    maxHeight: "150px",
});

export default CardTitleWithNavButton;