import React, { useState } from "react";
import { Box, IconButton, Typography } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import MenuIcon from "@material-ui/icons/Menu";
import { RegistrationsActionDrawer } from "./RegistrationsActionDrawer";
import { makeStyles } from "@material-ui/core/styles";

export const TopNavBar = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const useStyles = makeStyles(() => ({
    arrowPadding: {
      paddingTop: "5px",
    },
    hamburgerButton: {
      padding: 0,
      paddingTop: "2px",
    },
  }));
  const classes = useStyles();

  return (
    <>
      <Box display="flex" alignItems="center" width="100%">
        <Box>
          <ArrowBackIosIcon className={classes.arrowPadding} />
        </Box>
        <Box flexGrow={1} textAlign="center">
          <Typography component="h6" variant="h6">
            Zapisy na turniej
          </Typography>
        </Box>
        <Box>
          <IconButton
            data-testid="hamburgerMenu"
            className={classes.hamburgerButton}
            onClick={() => setOpenDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        </Box>
      </Box>
      <RegistrationsActionDrawer
        openDrawer={openDrawer}
        returnToPrevState={setOpenDrawer}
      />
    </>
  );
};
