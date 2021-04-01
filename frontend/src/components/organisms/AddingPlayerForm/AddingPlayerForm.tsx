import React from "react";
import { Button, Grid, TextField, Typography } from "@material-ui/core";
import { VerticalSpace } from "../../atoms/Shared/VerticalSpace";
import { useFormik } from "formik";
import * as yup from "yup";
import { UserProfileRestApi } from "../../../restapi/players-profiles";
import { EntityIdGenerator } from "../../idGenerator/EntityIdGenerator";

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
});

function AddingPlayerForm() {
  //TODO dead code below might be used for TODO below
  // const tournamentId = useParams();
  // console.log(tournamentId);
  // const tourIdString: string = (Object.values(
  //   tournamentId
  // )[0] as string).substring(1);
  // console.log(tourIdString);

  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      email: "",
      phone: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await UserProfileRestApi().postPlayersProfile({
          playerId: EntityIdGenerator.generate(),
          firstName: values.name,
          lastName: values.surname,
          phoneNumber: values.phone,
          emailAddress: values.email,
        });
        window.location.reload();
        //TODO add modal window with confirmation AND add
      } catch (error) {
        alert(error.response.data.message);
      }
    },
  });

  return (
    <Grid container direction={"column"} justify="center" alignItems="center">
      <VerticalSpace height="10px" />
      <Typography component="h6" variant="h6">
        Nowy zawodnik
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
            id="Imię"
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
            id="Nazwisko"
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
            id="Adres e-mail"
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
            id="Numer telefonu"
            value={formik.values.phone}
            label="Numer telefonu"
            name="phone"
            variant="outlined"
            onChange={formik.handleChange}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
          />

          <VerticalSpace height="1rem" />
          <Button type="submit" variant="contained" color="primary">
            Zapisz zawodnika
          </Button>
          <VerticalSpace height="1rem" />
        </Grid>
      </form>
    </Grid>
  );
}

export default AddingPlayerForm;
