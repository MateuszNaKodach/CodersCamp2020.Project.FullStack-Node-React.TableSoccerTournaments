import { Typography, Box, Toolbar, AppBar } from "@material-ui/core";
import useStyles from "./styles";
import { Centered } from "../../atoms/Shared/Centered";
import React from "react";
import { PATH_FOR_IMAGES } from "../../atoms/constants/paths";

const Header = ({ text = "Wrocławski Klub Piłki Stołowej" }) => {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar className={classes.header} data-testid="header">
        <Box flexGrow={1}>
          <img
            src={`${PATH_FOR_IMAGES}/logo.png`}
            alt="logo"
            className={classes.logo}
          />
        </Box>
        <Box flexGrow={2}>
          <Centered>
            <Typography variant="h6" className={classes.title}>
              {text}
            </Typography>
          </Centered>
        </Box>
        <Box flexGrow={1} />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
