import React from "react";
import { Button, TextField, Typography } from "@material-ui/core";
import { Centered } from "../Shared/Centered";
import { VerticalSpace } from "../Shared/VerticalSpace";

function AddingPlayerForm(props: { title: string; inputs: string[] }) {
  return (
    <Centered>
      <VerticalSpace height="1rem" />
      <Typography component="h6" variant="h6">
        {props.title}
      </Typography>
      <VerticalSpace height="1rem" />

      <form>
        {props.inputs.map((inputName) => (
          <Centered>
            <TextField
              key={inputName}
              id={`outlined-${inputName}`}
              label={`${inputName}`}
              variant={`outlined`}
            />
            <VerticalSpace height="1rem" />
          </Centered>
        ))}
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
