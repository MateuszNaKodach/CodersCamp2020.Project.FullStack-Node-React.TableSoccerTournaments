import React, { useContext, useEffect, useState } from "react";
import { Button, Drawer, Grid } from "@material-ui/core";
import { VerticalSpace } from "../../atoms/Shared/VerticalSpace";
import { TournamentRegistrationsContext } from "./Context";

export const RegistrationsActionDrawer = (props: {
  openDrawer: boolean;
  returnToPrevState: (prevState: boolean) => void;
}) => {
  const [drawerOpened, setDrawerOpened] = useState<boolean>(false);
  const { toggleOpenFormState } = useContext(TournamentRegistrationsContext);

  useEffect(() => {
    setDrawerOpened(props.openDrawer);

    return () => {
      setDrawerOpened(false);
    };
  }, [props.openDrawer]);

  function toggleDrawer(open: boolean) {
    props.returnToPrevState(false);
    setDrawerOpened(open);
  }

  return (
    <Drawer
      anchor={"bottom"}
      open={drawerOpened}
      onClose={() => toggleDrawer(false)}
    >
      <Grid container direction={"column"} justify="center" alignItems="center">
        <VerticalSpace height="30px" />
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            toggleOpenFormState();
            toggleDrawer(false);
          }}
        >
          Dodaj i zapisz zawdonika
        </Button>
        <VerticalSpace height="20px" />
        <Button
          variant="contained"
          color="primary"
          onClick={() => console.log("second button")}
        >
          Zakończ zapisy na turniej
        </Button>
        <VerticalSpace height="30px" />
      </Grid>
    </Drawer>
  );
};
