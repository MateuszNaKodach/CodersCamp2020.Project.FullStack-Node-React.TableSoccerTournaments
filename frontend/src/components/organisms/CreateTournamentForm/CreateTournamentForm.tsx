import React, { useEffect, useState } from "react";
import { Button, Drawer, Grid, TextField, Typography } from "@material-ui/core";
import * as yup from "yup";
import { useFormik } from "formik";
import Notification from "../Notification/Notification";
import { TournamentRegistrationsRestApi } from "../../../restapi/tournament-registrations";
import { TournamentDetailsRestApi } from "../../../restapi/tournament-details/TournamentDetailsRestApi";
import { TournamentTablesRestApi } from "../../../restapi/tournament-tables/TournamentTablesRestApi";
import {EntityIdGenerator} from "../../atoms/idGenerator/EntityIdGenerator";
import {VerticalSpace} from "../../atoms/VerticalSpace";

const validationSchema = yup.object({
  name: yup.string().required("To pole jest wymagane."),
  tablesQuantity: yup
    .number()
    .required("To pole jest wymagane.")
    .min(1, "Minimalna liczba to 1")
    .max(20, "Maksymalna liczba to 20"),
});

type Table = {
  tableNumber: number;
  tableName: string;
  isFree: boolean;
};

export type TablesList = {
  tables: Table[];
};

export const CreateTournamentForm = (props: {
  openDrawer: boolean;
  returnToPrevState: (prevState: boolean) => void;
  reloadData: () => void;
}) => {
  const [drawerOpened, setDrawerOpened] = useState<boolean>(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [textAlert, setTextAlert] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setDrawerOpened(props.openDrawer);
  }, [props.openDrawer]);

  const onNotificationOpen = (errorMessage: string, isError: boolean) => {
    setTextAlert(errorMessage);
    setIsError(isError);
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

  function toggleDrawer(open: boolean) {
    props.returnToPrevState(false);
    setDrawerOpened(open);
    formik.resetForm();
  }

  function createTablesPostBody(numberOfTables: number): TablesList {
    const tablesList: TablesList = { tables: [] };
    for (let i = 0; i < numberOfTables; i++) {
      tablesList.tables.push({
        tableNumber: i + 1,
        tableName: `Stół numer ${i + 1}`,
        isFree: true,
      });
    }
    return tablesList;
  }

  const formik = useFormik<{
    name: string;
    tablesQuantity: number | undefined;
  }>({
    initialValues: {
      name: "",
      tablesQuantity: undefined,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const tournamentId = EntityIdGenerator.generate();
        await TournamentRegistrationsRestApi().createTournament({
          tournamentId: tournamentId,
        });
        await TournamentDetailsRestApi().addTournamentName({
          tournamentId: tournamentId,
          tournamentName: values.name,
        });
        const addTablesPostBody: TablesList = createTablesPostBody(
          values.tablesQuantity!
        );
        await TournamentTablesRestApi().addTournamentsTables({
          tournamentId: tournamentId,
          tablesBody: addTablesPostBody,
        });
        toggleDrawer(false);
        onNotificationOpen("Pomyślnie utworzono nowy turniej", false);
        props.reloadData();
      } catch (error) {
        onNotificationOpen(error.response.data.message, true);
      }
    },
  });

  return (
    <>
      <Drawer
        anchor={"bottom"}
        open={drawerOpened}
        onClose={() => toggleDrawer(false)}
      >
        <Grid
          container
          direction={"column"}
          justify="center"
          alignItems="center"
        >
          <VerticalSpace height="10px" />
          <Typography component="h6" variant="h6">
            Nowy turniej
          </Typography>
          <VerticalSpace height="10px" />
          <form onSubmit={formik.handleSubmit}>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <TextField
                id="name"
                value={formik.values.name}
                label="Nazwa turnieju"
                name="name"
                variant="outlined"
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
              <VerticalSpace height="10px" />

              <TextField
                id="tablesQuantity"
                value={formik.values.tablesQuantity}
                label="Liczba stołów"
                name="tablesQuantity"
                type="number"
                variant="outlined"
                onChange={formik.handleChange}
                error={
                  formik.touched.tablesQuantity &&
                  Boolean(formik.errors.tablesQuantity)
                }
                helperText={
                  formik.touched.tablesQuantity && formik.errors.tablesQuantity
                }
              />
              <VerticalSpace height="1rem" />
              <Button type="submit" variant="contained" color="primary">
                Utwórz nowy turniej
              </Button>
              <VerticalSpace height="1rem" />
            </Grid>
          </form>
        </Grid>
      </Drawer>
      <Notification
        text={textAlert}
        open={openAlert}
        handleClose={onNotificationClose}
        isError={isError}
      />
    </>
  );
};
