import React from "react";
import { Grid, Typography } from "@material-ui/core";
import Controls from "../../atoms/Shared/controls/Controls";
import { VerticalSpace } from "../../atoms/Shared/VerticalSpace";
import { useForm, Form } from "../useForm/useForm";

const initialFormValues = {
  name: "",
  surname: "",
  email: "",
  phone: "",
};

function AddingPlayerForm() {
  const validate = (fieldValues = values) => {
    const temp = {
      name: "",
      surname: "",
      email: "",
      phone: "",
    };
    if ("name" in fieldValues) {
      temp.name =
        fieldValues.name.trim() !== "" ? "" : "To pole jest wymagane.";
    }
    if ("surname" in fieldValues) {
      temp.surname =
        fieldValues.surname.trim() !== "" ? "" : "To pole jest wymagane.";
    }
    if ("email" in fieldValues) {
      temp.email = /\S+@\S+\.\S+/.test(fieldValues.email)
        ? ""
        : "Niepoprawny adres e-mail.";
    }
    if ("phone" in fieldValues) {
      temp.phone =
        fieldValues.phone.trim().length >= 9
          ? ""
          : "Numer telefonu powinien zawierać przynajmniej 9 znaków";
    }
    setErrors({ ...temp });

    if (fieldValues === values) {
      return Object.values(temp).every((value: string) => value === "");
    }
  };

  const { values, setValues, errors, setErrors, handleInputChange } = useForm(
    initialFormValues,
    true,
    validate
  );

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    if (validate()) {
      window.alert("Form is valid!");
    }
  };

  return (
    <Grid container direction={"column"} justify="center" alignItems="center">
      <VerticalSpace height="1rem" />
      <Typography component="h6" variant="h6">
        Nowy zawodnik
      </Typography>

      <Form onSubmit={handleSubmit}>
        <Grid
          container
          direction={"column"}
          justify="center"
          alignItems="center"
        >
          <Controls.Input
            value={values.name}
            label={"Imię"}
            name={"name"}
            onChange={handleInputChange}
            error={errors.name}
          />

          <Controls.Input
            value={values.surname}
            label={"Nazwisko"}
            name={"surname"}
            onChange={handleInputChange}
            error={errors.surname}
          />

          <Controls.Input
            value={values.email}
            label={"Adres e-mail"}
            name={"email"}
            onChange={handleInputChange}
            error={errors.email}
          />

          <Controls.Input
            value={values.phone}
            label={"Numer telefonu"}
            name={"phone"}
            onChange={handleInputChange}
            error={errors.phone}
          />

          <VerticalSpace height="1rem" />
          <Controls.Button
            type={"submit"}
            onClick={() => {
              console.log("zapisz zawodnika");
            }}
            text={"Zapisz zawodnika"}
          />
          <VerticalSpace height="1rem" />
        </Grid>
      </Form>
    </Grid>
  );
}

export default AddingPlayerForm;
