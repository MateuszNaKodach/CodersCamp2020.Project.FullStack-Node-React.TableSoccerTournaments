import React, { useState } from "react";

import * as yup from "yup";
import { useFormik } from "formik";
import { EntityIdGenerator } from "../../atoms/idGenerator/EntityIdGenerator";
import { Button, Grid, TextField, Typography } from "@material-ui/core";
import { VerticalSpace } from "../../atoms/VerticalSpace";
import Notification from "../Notification/Notification";

const validationSchema = yup.object({
  name: yup.string().required("To pole jest wymagane."),
  surname: yup.string().required("To pole jest wymagane."),
  email: yup
    .string()
    .email("Niepoprawny adres e-mail.")
    .required("To pole jest wymagane."),
  phone: yup
    .string()
    .min(9, "Wprowadź przynajmniej 9 znaków.")
    .required("To pole jest wymagane."),
  password: yup
    .string()
    .min(5, "Wprowadź przynajmniej 5 znaków.")
    .required("To pole jest wymagane."),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Hasła nie pasują do siebie")
    .required("To pole jest wymagane."),
});

export function RegisterUserForm(props: { onDrawerClose: () => void }) {
  const [openAlert, setOpenAlert] = useState(false);
  const [textAlert, setTextAlert] = useState("");

  const onNotificationOpen = (errorMessage: string) => {
    setTextAlert(errorMessage);
    setOpenAlert(true);
  };

  const onNotificationClose = (
    event?: React.SyntheticEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      email: "",
      phone: "",
      password: "",
      passwordConfirmation: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const playerId = EntityIdGenerator.generate();
        //TODO add player here
        console.log("it works");
        props.onDrawerClose();
      } catch (error) {
        onNotificationOpen(error.response.data.message);
      }
    },
  });

  return (
    <Grid container direction={"column"} justify="center" alignItems="center">
      <VerticalSpace height="10px" />
      <Typography component="h6" variant="h6">
        Uzupełnij formularz
      </Typography>
      <VerticalSpace height="10px" />

      <form onSubmit={formik.handleSubmit}>
        <Grid
          container
          direction={"column"}
          justify="center"
          alignItems="center"
        >
          <TextField
            id="name"
            value={formik.values.name}
            label="Imię"
            name="name"
            variant="outlined"
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <VerticalSpace height="10px" />

          <TextField
            id="surname"
            value={formik.values.surname}
            label="Nazwisko"
            name="surname"
            variant="outlined"
            onChange={formik.handleChange}
            error={formik.touched.surname && Boolean(formik.errors.surname)}
            helperText={formik.touched.surname && formik.errors.surname}
          />
          <VerticalSpace height="10px" />

          <TextField
            id="emailAddress"
            value={formik.values.email}
            label="Adres e-mail"
            name="email"
            variant="outlined"
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <VerticalSpace height="10px" />

          <TextField
            id="phoneNumber"
            value={formik.values.phone}
            label="Numer telefonu"
            name="phone"
            variant="outlined"
            onChange={formik.handleChange}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
          />
          <VerticalSpace height="10px" />

          <TextField
            id="password"
            value={formik.values.password}
            type="password"
            label="Hasło"
            name="password"
            variant="outlined"
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <VerticalSpace height="10px" />

          <TextField
            id="passwordConfirmation"
            value={formik.values.passwordConfirmation}
            type="password"
            label="Powtórz hasło"
            name="passwordConfirmation"
            variant="outlined"
            onChange={formik.handleChange}
            error={
              formik.touched.passwordConfirmation &&
              Boolean(formik.errors.passwordConfirmation)
            }
            helperText={
              formik.touched.passwordConfirmation &&
              formik.errors.passwordConfirmation
            }
          />

          <VerticalSpace height="1rem" />
          <Button type="submit" variant="contained" color="primary">
            Utwórz nowe konto
          </Button>
          <VerticalSpace height="1rem" />
        </Grid>
      </form>
      <Notification
        text={textAlert}
        open={openAlert}
        handleClose={onNotificationClose}
        isError={true}
      />
    </Grid>
  );
}
