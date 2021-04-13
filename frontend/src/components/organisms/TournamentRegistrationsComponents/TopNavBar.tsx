import React, { useState } from "react";
import { Box, IconButton, Typography } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import MenuIcon from "@material-ui/icons/Menu";
import { RegistrationsActionDrawer } from "./RegistrationsActionDrawer";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

export const TopNavBar = (props: { tournamentId: string }) => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const history = useHistory();
  const goBack = () => {
    history.goBack();
  };

  const useStyles = makeStyles(() => ({
    padding: {
      padding: 0,
      paddingTop: "2px",
    },
  }));
  const classes = useStyles();

  return (
    <>
      <Box display="flex" alignItems="center" width="100%">
        <Box>
          <IconButton className={classes.padding} onClick={goBack}>
            <ArrowBackIosIcon />
          </IconButton>
        </Box>
        <Box flexGrow={1} textAlign="center">
          <Typography component="h6" variant="h6">
            Zapisy na turniej
          </Typography>
        </Box>
        <Box>
          <IconButton
            data-testid="hamburgerMenu"
            className={classes.padding}
            onClick={() => setOpenDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        </Box>
      </Box>
      <RegistrationsActionDrawer
        openDrawer={openDrawer}
        returnToPrevState={setOpenDrawer}
        tournamentId={props.tournamentId}
      />
    </>
  );
};
