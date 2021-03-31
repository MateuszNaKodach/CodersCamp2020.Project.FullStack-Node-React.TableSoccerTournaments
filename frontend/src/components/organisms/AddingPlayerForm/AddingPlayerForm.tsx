import React, { useEffect, useState } from "react";
import { Button, Grid, TextField, Typography } from "@material-ui/core";
import { VerticalSpace } from "../../atoms/Shared/VerticalSpace";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  PlayerProfileDto,
  UserProfileRestApi,
} from "../../../restapi/players-profiles";
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
  const [players, setPlayers] = useState<PlayerProfileDto[]>([]);

  useEffect(() => {
    UserProfileRestApi()
      .getPlayersProfiles()
      .then((playerProfilesList) => {
        setPlayers(playerProfilesList.items);
      });
  }, []);

  function checkIfExists(email: string): boolean {
    return players.some((player) => player.emailAddress === email);
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      email: "",
      phone: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (!checkIfExists(values.email)) {
        await UserProfileRestApi().postPlayersProfile({
          playerId: EntityIdGenerator.generate(),
          firstName: values.name,
          lastName: values.surname,
          phoneNumber: values.phone,
          emailAddress: values.email,
        });
      } else {
        //TODO throw error or do sth
        alert("cos");
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
        {/*</form>*/}
      </form>
    </Grid>
  );
}

export default AddingPlayerForm;

// import React, { useState } from "react";
// import { Button, Grid, TextField, Typography } from "@material-ui/core";
// import { VerticalSpace } from "../../atoms/Shared/VerticalSpace";
// import { UserProfileRestApi } from "../../../restapi/players-profiles";
// import { EntityIdGenerator } from "../../idGenerator/EntityIdGenerator";
//
// const initialFormValues = {
//   name: "",
//   surname: "",
//   email: "",
//   phone: "",
// };
//
// function AddingPlayerForm() {
//   const [values, setValues] = useState(initialFormValues);
//   const [errors, setErrors] = useState(initialFormValues);
//
//   const validate = (fieldValues = values) => {
//     const temp = { ...initialFormValues };
//     if ("name" in fieldValues) {
//       temp.name =
//           fieldValues.name.trim() !== "" ? "" : "To pole jest wymagane.";
//     }
//     if ("surname" in fieldValues) {
//       temp.surname =
//           fieldValues.surname.trim() !== "" ? "" : "To pole jest wymagane.";
//     }
//     if ("email" in fieldValues) {
//       temp.email = /\S+@\S+\.\S+/.test(fieldValues.email)
//           ? ""
//           : "Niepoprawny adres e-mail.";
//     }
//     if ("phone" in fieldValues) {
//       temp.phone =
//           fieldValues.phone.trim().length >= 9
//               ? ""
//               : "Numer telefonu powinien zawierać przynajmniej 9 znaków";
//     }
//     setErrors({ ...temp });
//
//     if (fieldValues === values) {
//       return Object.values(temp).every((value: string) => value === "");
//     }
//   };
//
//   const handleSubmit = async (
//       event: React.MouseEvent<HTMLButtonElement, MouseEvent>
//   ) => {
//     event.preventDefault();
//     if (validate()) {
//       //TODO refresh page - close form and go back to tournament players list
//       await UserProfileRestApi().postPlayersProfile({
//         playerId: EntityIdGenerator.generate(),
//         firstName: values.name,
//         lastName: values.surname,
//         phoneNumber: values.phone,
//         emailAddress: values.email,
//       });
//     } else {
//     }
//   };
//
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     console.log("name: ", name);
//     console.log("value: ", value);
//     setValues({
//       ...values,
//       [name]: value,
//     });
//     //TODO fix this
//     validate({ ...values, [name]: value });
//     // validate();
//   };
//
//   return (
//       <Grid container direction={"column"} justify="center" alignItems="center">
//         <VerticalSpace height="10px" />
//         <Typography component="h6" variant="h6">
//           Nowy zawodnik
//         </Typography>
//         <VerticalSpace height="10px" />
//
//         <form>
//           <Grid
//               container
//               direction={"column"}
//               justify="center"
//               alignItems="center"
//           >
//             <TextField
//                 value={values.name}
//                 label="Imię"
//                 name="name"
//                 variant="outlined"
//                 onChange={handleInputChange}
//                 error={errors.name !== ""}
//                 helperText={errors.name !== "" ? errors.name : ""}
//             />
//             <VerticalSpace height="10px" />
//
//             <TextField
//                 value={values.surname}
//                 label="Nazwisko"
//                 name="surname"
//                 variant="outlined"
//                 onChange={handleInputChange}
//                 // error = {(errors && { error: true, helperText: errors })}
//             />
//             <VerticalSpace height="10px" />
//
//             <TextField
//                 value={values.email}
//                 label="Adres e-mail"
//                 name="email"
//                 variant="outlined"
//                 onChange={handleInputChange}
//                 // error = {(errors && { error: true, helperText: errors })}
//             />
//             <VerticalSpace height="10px" />
//
//             <TextField
//                 value={values.phone}
//                 label="Numer telefonu"
//                 name="phone"
//                 variant="outlined"
//                 onChange={handleInputChange}
//                 // error = {(errors && { error: true, helperText: errors })}
//             />
//
//             <VerticalSpace height="1rem" />
//             <Button
//                 type="submit"
//                 variant="contained"
//                 color="primary"
//                 onClick={(event) => handleSubmit(event)}
//             >
//               Zapisz zawodnika
//             </Button>
//             <VerticalSpace height="1rem" />
//           </Grid>
//           {/*</form>*/}
//         </form>
//       </Grid>
//   );
// }
//
// export default AddingPlayerForm;
