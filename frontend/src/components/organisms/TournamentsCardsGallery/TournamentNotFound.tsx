import { Alert, AlertTitle } from "@material-ui/lab";
import { VerticalSpace } from "../../atoms/Shared/VerticalSpace";
import { Button, createStyles, Theme } from "@material-ui/core";
import { Centered } from "../../atoms/Shared/Centered";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minHeight: "320px",
    },
  })
);

export const TournamentNotFound = (props: {
  openForm: (open: boolean) => void;
}) => {
  const classes = useStyles();
  return (
    <Centered className={classes.root}>
      <Alert severity="info">
        <AlertTitle>Ależ tu pusto!</AlertTitle>
        Stwórz nowy turniej.
      </Alert>
      <VerticalSpace height="20px" />
      <Button
        variant="contained"
        color="primary"
        onClick={() => props.openForm(true)}
      >
        Dodaj nowy turniej
      </Button>
    </Centered>
  );
};
