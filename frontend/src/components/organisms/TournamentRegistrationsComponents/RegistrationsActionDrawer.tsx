import React, { useContext, useEffect, useState } from "react";
import { Button, Drawer, Grid } from "@material-ui/core";
import { VerticalSpace } from "../../atoms/Shared/VerticalSpace";
import { TournamentRegistrationsContext } from "./Context";
import { makeStyles } from "@material-ui/core/styles";
import { TournamentRegistrationsRestApi } from "../../../restapi/tournament-registrations";
import Notification from "../Notification/Notification";
import { TournamentStartRestApi } from "../../../restapi/tournament-start/TournamentStart";
import { PATH_FOR_TOURNAMENTS_SELECTION_VIEW } from "../../atoms/constants/routerPaths";

export const RegistrationsActionDrawer = (props: {
  openDrawer: boolean;
  returnToPrevState: (prevState: boolean) => void;
  tournamentId: string;
}) => {
  const { toggleOpenFormState } = useContext(TournamentRegistrationsContext);
  const [drawerOpened, setDrawerOpened] = useState<boolean>(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [textAlert, setTextAlert] = useState("");

  useEffect(() => {
    setDrawerOpened(props.openDrawer);

    return () => {
      setDrawerOpened(false);
    };
  }, [props.openDrawer]);

  const history = useHistory();
  const goTo = (path: string) => {
    history.push(path);
  };

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

  function toggleDrawer(open: boolean) {
    props.returnToPrevState(false);
    setDrawerOpened(open);
  }

  const closeRegistrationsAndStartTournament = async () => {
    try {
      await TournamentRegistrationsRestApi().closeTournamentRegistration(
        props.tournamentId
      );
      await TournamentStartRestApi().startTournament(props.tournamentId);
      toggleDrawer(false);
      goTo(PATH_FOR_TOURNAMENTS_SELECTION_VIEW);
    } catch (error) {
      onNotificationOpen(error.response.data.message);
    }
  };

  const useStyles = makeStyles(() => ({
    width: {
      width: "70%",
    },
  }));
  const classes = useStyles();

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
          <VerticalSpace height="30px" />
          <Button
            className={classes.width}
            variant="contained"
            color="primary"
            onClick={() => {
              toggleOpenFormState();
              toggleDrawer(false);
            }}
          >
            Dodaj i zapisz zawodnika
          </Button>
          <VerticalSpace height="20px" />
          <Button
            className={classes.width}
            variant="contained"
            color="primary"
            onClick={closeRegistrationsAndStartTournament}
          >
            Zakończ zapisy na turniej
          </Button>
          <VerticalSpace height="30px" />
        </Grid>
      </Drawer>
      <Notification
        text={textAlert}
        open={openAlert}
        handleClose={onNotificationClose}
        isError={true}
      />
    </>
  );
};
