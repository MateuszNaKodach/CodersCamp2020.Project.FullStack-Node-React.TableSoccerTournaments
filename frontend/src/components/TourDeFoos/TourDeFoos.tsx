import React from "react";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import { Centered } from "../Shared/Centered";
import { TournamentRegistrations } from "../TournamentRegistrations";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: grey[800],
      contrastText: "#E3E152",
    },
  },
});

function TourDeFoos() {
  return (
    <MuiThemeProvider theme={theme}>
      <Centered>
        <TournamentRegistrations tournamentId="sampleTournamentId" />
      </Centered>
    </MuiThemeProvider>
  );
}

export default TourDeFoos;
