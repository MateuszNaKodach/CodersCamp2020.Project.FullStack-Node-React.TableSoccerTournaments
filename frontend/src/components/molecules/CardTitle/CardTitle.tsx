import React from 'react';
import {Typography,} from "@material-ui/core";
import {VerticalSpace} from "../../atoms/Shared/VerticalSpace"
import {Centered} from "../../atoms/Shared/Centered";
import styled from "styled-components";

export type CardTitleProps = {
    readonly title: string;
};

const CardTitle = (props: CardTitleProps) => (
    <>
        <Centered>
            <Typography component="h5" variant="h5">
                {props.title}
            </Typography>
            <VerticalSpace height="2rem"/>
        </Centered>
    </>
);

export default styled(({...otherProps}) => (
    <CardTitle {...otherProps}   />
))`
     marginBottom: "20px",
`;
