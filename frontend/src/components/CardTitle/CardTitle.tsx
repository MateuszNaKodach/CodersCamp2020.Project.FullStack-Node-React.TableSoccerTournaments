import React from 'react';
import {Card, CardContent, Typography, } from "@material-ui/core";
import styled from "styled-components";
import {APP_NAME} from "../../constants/constants";
import {VerticalSpace} from "../shared/VerticalSpace"
import {Title} from "@material-ui/icons";

export type TitleProps = {
    readonly title: string |undefined;
};


export const CardTitle = (props: TitleProps | undefined) => {
    const titleComponent = (
        <>
            <CardContent>
                <Typography component="h6" variant="h6">
                    {props?.title || APP_NAME}
                </Typography>
                <VerticalSpace height="1rem" />
            </CardContent>
        </>
    );

    return (
        titleComponent
    );
}
//
// const StartMenuCard = styled(Card)({
//     maxWidth: "500px",
//     minHeight: "500px",
// });

// const CardTitle = styled(Typography)({
//     maxWidth: "500px",
//     minHeight: "500px",
// });


