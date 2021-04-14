import React, { useContext, useEffect, useState } from "react";
import { Drawer } from "@material-ui/core";
import CreatePlayerProfileForm from "../CreatePlayerProfileForm/CreatePlayerProfileForm";
import { TournamentRegistrationsContext } from "./Context";

export const CreatePlayerProfileDrawer = (props: { tournamentId: string }) => {
  const { openCreatePlayerProfileForm, toggleOpenFormState } = useContext(
    TournamentRegistrationsContext
  );
  const [drawerOpened, setDrawerOpened] = useState<boolean>(false);

  useEffect(() => {
    if (openCreatePlayerProfileForm) {
      setDrawerOpened(true);
      toggleOpenFormState();
    }
  }, [openCreatePlayerProfileForm]);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpened(open);
  };

  const onDrawerClose = () => {
    setDrawerOpened(false);
  };

  return (
    <Drawer anchor={"bottom"} open={drawerOpened} onClose={toggleDrawer(false)}>
      <CreatePlayerProfileForm
        onDrawerClose={onDrawerClose}
        tournamentId={props.tournamentId}
      />
    </Drawer>
  );
};
