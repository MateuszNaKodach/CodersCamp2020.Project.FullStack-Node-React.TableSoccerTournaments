import { TextField } from "@material-ui/core";
import React, { ChangeEventHandler } from "react";

function Input(props: {
  name: string;
  label: string;
  value: string;
  error?: null;
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}) {
  return (
    <TextField
      value={props.value}
      label={props.label}
      name={props.name}
      onChange={props.onChange}
      variant={`outlined`}
      {...(props.error && { error: true, helperText: props.error })}
    />
  );
}

export default Input;
