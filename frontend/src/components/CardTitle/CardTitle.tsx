import React from 'react';
import { Typography,} from "@material-ui/core";
import {APP_NAME} from "../../constants/constants";
import {VerticalSpace} from "../shared/VerticalSpace"
import {Centered} from "../shared/Centered";
import styled from "styled-components";

export type TitleProps = {
    readonly title: string | undefined;
};

const CardTitleComponent = (props: TitleProps | undefined) => {
    const titleComponent = (
        <>
            <Centered>
                <Typography component="h5" variant="h5">
                    {props?.title || APP_NAME}
                </Typography>
                <VerticalSpace height="2rem"/>
            </Centered>
        </>
    );

    return (
        titleComponent
    );
}

export default styled(({ ...otherProps }) => (
    <CardTitleComponent {...otherProps}   />
))`
     marginBottom: "20px",
`;
