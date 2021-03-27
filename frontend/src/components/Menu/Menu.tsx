import React from 'react';
import {Button, Card, CardContent, List, makeStyles,} from "@material-ui/core";
import styled from "styled-components";
import CardTitle from "../CardTitle/CardTitle";
import {VerticalSpace} from "../Shared/VerticalSpace";
import {Centered} from "../Shared/Centered";

type MenuButtonsProps = {
    readonly textName: string;
    readonly onClick: () => void;
};

type MenuComponentProps = {
    readonly title: string;
    readonly menuButtonsList: MenuButtonsProps[];
};

export const Menu = (props: MenuComponentProps) => (
    <StartMenuCard>
        <CardContent>
            <Centered>
                <CardTitle title={props.title}/>
                {MenuButtonsList(props.menuButtonsList)}
            </Centered>
        </CardContent>
    </StartMenuCard>
);

const StartMenuCard = styled(Card)({
    display: "block",
    boxSizing: "border-box",
    minWidth: "300px",
    paddingTop: "40px",
    paddingBottom: "40px",
});

const MenuButtonsList = (props: MenuButtonsProps[]) => (
    <List>
        <Centered>
            {(props.map((item, index) => (
                <li key={index}>
                    <MenuButton textName={item.textName} onClick={item.onClick}/>
                    <VerticalSpace height="1rem"/>
                </li>
            )))
            }
        </Centered>
    </List>
)

function MenuButton(props: MenuButtonsProps) {
    const classes = useStyles();
    return (
        <Button variant="contained"
                color="primary"
                onClick={props.onClick}
                className={classes.root}
        >
            {props.textName}
        </Button>);
}

const useStyles = makeStyles({
    root: {
        width: "250px",
    },
});
