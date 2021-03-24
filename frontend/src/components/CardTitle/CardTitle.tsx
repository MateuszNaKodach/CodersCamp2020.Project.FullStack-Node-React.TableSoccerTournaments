import React from 'react';
import { CardContent, Typography, } from "@material-ui/core";
import {APP_NAME} from "../../constants/constants";
import {VerticalSpace} from "../shared/VerticalSpace"

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