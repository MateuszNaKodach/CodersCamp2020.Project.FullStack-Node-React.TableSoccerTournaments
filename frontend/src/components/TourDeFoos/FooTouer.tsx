import React from 'react';
import './FooTouer.css';
import './FooTouer.css';
import {StartMenuComponent} from '../StartMenuComponent'
import {grey} from "@material-ui/core/colors";
import { Button, createMuiTheme, MuiThemeProvider } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: grey[800],
      contrastText: "#E3E152"
    }
  }
});

function FooTouer() {
  return (
      <>
        <MuiThemeProvider theme={theme}>
          <StartMenuComponent/>
          <Button variant="contained" color="primary">
            Primary
          </Button>

        </MuiThemeProvider>
      </>
          );
}

export default FooTouer;
