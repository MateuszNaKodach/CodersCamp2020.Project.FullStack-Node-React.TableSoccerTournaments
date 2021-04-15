import React from "react";
import { Button, Card, CardContent, List, makeStyles } from "@material-ui/core";
import styled from "styled-components";
import CardTitle from "../../molecules/CardTitle/CardTitle";
import { VerticalSpace } from "../../atoms/VerticalSpace";
import { Centered } from "../../atoms/Centered";
import { Link } from "react-router-dom";
import { MIN_CARD_COMPONENT_WIDTH } from "../../atoms/constants/sizes";

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
        <CardTitle title={props.title} />
        {MenuButtonsList(props.menuButtonsList)}
      </Centered>
    </CardContent>
  </StartMenuCard>
);

const StartMenuCard = styled(Card)({
  display: "block",
  boxSizing: "border-box",
  minWidth: MIN_CARD_COMPONENT_WIDTH,
  paddingTop: "40px",
  paddingBottom: "40px",
});

const MenuButtonsList = (props: MenuButtonsProps[]) => (
  <List>
    <Centered>
      {props.map((item, index) => (
        <li key={index}>
          <MenuButton
            textName={item.textName}
            onClick={item.onClick}
            onLink={item.onLink}
          />
          <VerticalSpace height="1rem" />
        </li>
      ))}
    </Centered>
  </List>
);

function MenuButton({ textName, onClick, onLink }: MenuButtonsProps) {
  const classes = useStyles();
  return (
    <>
      {onLink ? (
        <Link to={onLink} style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={onClick}
            className={classes.root}
          >
            {textName}
          </Button>
        </Link>
      ) : (
        <Button
          variant="contained"
          color="primary"
          onClick={onClick}
          className={classes.root}
        >
          {textName}
        </Button>
      )}
    </>
  );
}

const useStyles = makeStyles({
  root: {
    width: "250px",
  },
});
