import React from 'react';
import {Button, Card, CardContent, List, makeStyles,} from "@material-ui/core";
import styled from "styled-components";
import CardTitle from "../CardTitle/CardTitle";
import {VerticalSpace} from "../Shared/VerticalSpace";
import {Centered} from "../Shared/Centered";
import {Link} from "react-router-dom";

type MenuButtonsProps = {
    readonly textName: string;
    readonly onClick: () => void;
    readonly onLink: string;
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
                    <MenuButton textName={item.textName} onClick={item.onClick} onLink={item.onLink}/>
                    <VerticalSpace height="1rem"/>
                </li>
            )))
            }
        </Centered>
    </List>
)

function MenuButton({textName, onClick, onLink}: MenuButtonsProps) {
    const classes = useStyles();
    return (
        <>
            {onLink
            ?
            <Link to={onLink}>
            <Button variant="contained"
                    color="primary"
                    onClick={onClick}
                    className={classes.root}
            >
                {textName}
            </Button>
            </Link>
            :
                <Button variant="contained"
                        color="primary"
                        onClick={onClick}
                        className={classes.root}
                >
                    {textName}
                </Button>
            }
        </>
    )
}

const useStyles = makeStyles({
    root: {
        width: "250px",
    },
});
