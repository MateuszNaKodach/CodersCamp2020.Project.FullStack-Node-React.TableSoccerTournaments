import React, { useContext, useEffect, useState } from "react";
import { Drawer } from "@material-ui/core";
import CreatePlayerProfileForm from "../CreatePlayerProfileForm/CreatePlayerProfileForm";
import { FormContext } from "../../pages/TournamentRegistrations";

export const CreatePlayerProfileDrawer = (props: {
  clearInputCreateAndRegisterPlayer: (name: string, surname: string) => void;
  tournamentId: string;
}) => {
  const { openForm, toggleOpenFormState } = useContext(FormContext);
  const [drawerOpened, setDrawerOpened] = useState<boolean>(false);

  useEffect(() => {
    if (openForm) {
      setDrawerOpened(true);
      toggleOpenFormState();
    }
  }, [openForm]);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpened(open);
  };

  const onPlayerProfileCreated = (name: string, surname: string) => {
    setDrawerOpened(false);
    props.clearInputCreateAndRegisterPlayer(name, surname);
  };

  return (
    <Drawer anchor={"bottom"} open={drawerOpened} onClose={toggleDrawer(false)}>
      <CreatePlayerProfileForm
        onPlayerProfileCreated={onPlayerProfileCreated}
        tournamentId={props.tournamentId}
      />
    </Drawer>
  );
};
