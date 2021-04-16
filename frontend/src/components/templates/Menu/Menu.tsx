import React from "react";
import { Button, CardContent, List, makeStyles } from "@material-ui/core";
import CardTitle from "../../molecules/CardTitle/CardTitle";
import { VerticalSpace } from "../../atoms/VerticalSpace";
import { Centered } from "../../atoms/Centered";
import { Link } from "react-router-dom";
import {StyledCard} from "../../atoms/StyledCard/StyledCard";

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
  <StyledCard>
    <CardContent>
      <Centered>
        <CardTitle title={props.title} />
        {MenuButtonsList(props.menuButtonsList)}
      </Centered>
    </CardContent>
  </StyledCard>
);

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
