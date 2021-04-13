import React, { useState } from "react";
import { Box, IconButton, Typography } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import MenuIcon from "@material-ui/icons/Menu";
import { TournamentRegistrationsActionDrawer } from "./TournamentRegistrationsActionDrawer";

export const TopNavBar = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <>
      <Box display="flex" alignItems="center" width="100%">
        <Box>
          <ArrowBackIosIcon />
        </Box>
        <Box flexGrow={1} textAlign="center">
          <Typography component="h6" variant="h6">
            Zapisy na turniej
          </Typography>
        </Box>
        <Box>
          <IconButton
            style={{ padding: 0 }}
            onClick={() => setOpenDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        </Box>
      </Box>
      <TournamentRegistrationsActionDrawer
        openDrawer={openDrawer}
        returnToPrevState={setOpenDrawer}
      />
    </>
  );
};
