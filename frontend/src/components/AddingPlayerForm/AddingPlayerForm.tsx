import React from "react";
import { Button, TextField, Typography } from "@material-ui/core";
import { Centered } from "../Shared/Centered";
import { VerticalSpace } from "../Shared/VerticalSpace";

function AddingPlayerForm() {
  return (
    <Centered>
      <VerticalSpace height="1rem" />
      <Typography component="h6" variant="h6">
        Nowy zawodnik
      </Typography>
      <VerticalSpace height="1rem" />

      <form>
        <Centered>
          <TextField
            key={"name"}
            id={`outlined-name`}
            label={"Imię"}
            variant={`outlined`}
          />
          <VerticalSpace height="1rem" />

          <TextField
            key={"surname"}
            id={`outlined-surname`}
            label={"Nazwisko"}
            variant={`outlined`}
          />
          <VerticalSpace height="1rem" />

          <TextField
            key={"email"}
            id={`outlined-email`}
            label={"Adres e-mail"}
            variant={`outlined`}
          />
          <VerticalSpace height="1rem" />

          <TextField
            key={"phone"}
            id={`outlined-phone`}
            label={"Numer telefonu"}
            variant={`outlined`}
          />
          <VerticalSpace height="1rem" />
        </Centered>

        <Centered>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              console.log("zapisz zawodnika");
            }}
          >
            Zapisz zawodnika
          </Button>
          <VerticalSpace height="1rem" />
        </Centered>
      </form>
    </Centered>
  );
}

export default AddingPlayerForm;
