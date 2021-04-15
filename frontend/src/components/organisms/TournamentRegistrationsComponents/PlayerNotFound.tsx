import React, { useContext } from "react";
import { Centered } from "../../atoms/Centered";
import { Alert, AlertTitle } from "@material-ui/lab";
import { VerticalSpace } from "../../atoms/VerticalSpace";
import { Button } from "@material-ui/core";
import { TournamentRegistrationsContext } from "./Context";

export const PlayerNotFound = () => {
  const { toggleOpenFormState } = useContext(TournamentRegistrationsContext);

  return (
    <Centered>
      <Alert severity="info">
        <AlertTitle>Nie znaleziono zawodnika?</AlertTitle>
        Zapisz nowego poniżej.
      </Alert>
      <VerticalSpace height="1rem" />
      <Button
        variant="contained"
        color="primary"
        onClick={() => toggleOpenFormState()}
      >
        Dodaj i zapisz
      </Button>
    </Centered>
  );
};
