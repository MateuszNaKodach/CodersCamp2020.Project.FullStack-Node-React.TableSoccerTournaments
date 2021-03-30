import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";

export function useForm(
  initialFormValues: any,
  validateOnChange: boolean = false,
  validate: any
) {
  const [values, setValues] = useState(initialFormValues);
  const [errors, setErrors] = useState(initialFormValues);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    if (validateOnChange) {
      validate({ [name]: value });
    }
  };

  return {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
  };
}

const useStyle = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "90%",
      margin: theme.spacing(1),
    },
  },
}));

export function Form(props: any) {
  const classes = useStyle();
  const { children, ...other } = props;
  return (
    <form className={classes.root} {...other}>
      {props.children}
    </form>
  );
}
