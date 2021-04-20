import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { MIN_CARD_COMPONENT_WIDTH } from "../../atoms/constants/sizes";
import {
  Button,
  Card,
  CardContent,
  Drawer,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import { Centered } from "../../atoms/Centered";
import { VerticalSpace } from "../../atoms/VerticalSpace";
import * as yup from "yup";
import { useFormik } from "formik";
import Notification from "../../organisms/Notification/Notification";
import { RegisterUserForm } from "../../organisms/RegisterUserForm.tsx/RegisterUserForm";

const useStyles = makeStyles((theme) => ({
  root: {
    width: MIN_CARD_COMPONENT_WIDTH,
  },
}));

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Niepoprawny adres e-mail.")
    .required("To pole jest wymagane."),
  password: yup
    .string()
    .min(5, "Blędne hasło")
    .required("To pole jest wymagane."),
});

export function LoginView() {
  const [openAlert, setOpenAlert] = useState(false);
  const [textAlert, setTextAlert] = useState("");
  const [drawerOpened, setDrawerOpened] = useState<boolean>(false);

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

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpened(open);
  };

  const onDrawerClose = () => {
    setDrawerOpened(false);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        console.log("zalogowano");
      } catch (error) {
        onNotificationOpen(error.response.data.message);
      }
    },
  });

  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent>
        <Centered>
          <Typography component="h6" variant="h6">
            Zaloguj się w TourDeFoos
          </Typography>
          <VerticalSpace height="20px" />

          <form onSubmit={formik.handleSubmit}>
            <Grid
              container
              direction={"column"}
              justify="center"
              alignItems="center"
            >
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
                id="password"
                value={formik.values.password}
                type="password"
                label="Hasło"
                name="password"
                variant="outlined"
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />

              <VerticalSpace height="1rem" />
              <Button type="submit" variant="contained" color="primary">
                Zaloguj się
              </Button>
              <VerticalSpace height="1rem" />
            </Grid>
          </form>
          <Button
            variant="contained"
            color="primary"
            onClick={toggleDrawer(true)}
          >
            Zarejestruj się
          </Button>

          <Drawer
            anchor={"bottom"}
            open={drawerOpened}
            onClose={toggleDrawer(false)}
          >
            <RegisterUserForm onDrawerClose={onDrawerClose} />
          </Drawer>

          <Notification
            text={textAlert}
            open={openAlert}
            handleClose={onNotificationClose}
            isError={true}
          />
        </Centered>
      </CardContent>
    </Card>
  );
}
