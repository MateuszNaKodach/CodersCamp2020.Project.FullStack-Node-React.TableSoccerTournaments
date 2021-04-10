import { Button, Grid, MuiThemeProvider } from "@material-ui/core";
import { Centered } from "../../atoms/Shared/Centered";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React from "react";
import {
  PATH_FOR_CREATING_NEW_TOURNAMENT_VIEW,
  PATH_FOR_LOGIN_VIEW,
  PATH_FOR_PLAYER_PROFILE_CREATION_VIEW,
  PATH_FOR_PLAYERS_PROFILES_VIEW,
  PATH_FOR_HOME_VIEW,
  PATH_FOR_TOURNAMENT_REGISTRATIONS_VIEW,
  PATH_FOR_TOURNAMENTS_SELECTION_VIEW,
  PATH_FOR_PLAYER_MATCHES_VIEW,
} from "../../atoms/constants/paths";

import { MatchesList } from "../../organisms/MatchesList";
import { THEME } from "../../atoms/constants/ThemeMUI";
import Footer from "../../organisms/Footer/Footer";
import { HomeMenu } from "../HomeMenu/HomeMenu";
import { VerticalSpace } from "../../atoms/Shared/VerticalSpace";
import Header from "../../organisms/Header/Header";
import { TournamentRegistrationsRoute } from "../Routes/TournamentRegistrationsRoutes";
import { StyledBackground } from "../../atoms/Background/StyledBackground";
import TournamentsList from "../TournamentsList/TournamentsList";

function TourDeFoos() {
  return (
    <Router>
      <StyledBackground />
      <MuiThemeProvider theme={THEME}>
        <Centered>
          <Header />
          <VerticalSpace height="20px" />
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: "75vh" }}
          >
            <Switch>
              <Route path={PATH_FOR_LOGIN_VIEW} exact>
                <Button>PATH_FOR_LOGIN_VIEW</Button>
              </Route>
              <Route path={PATH_FOR_TOURNAMENTS_SELECTION_VIEW} exact>
                <TournamentsList/>
              </Route>
              <Route path={PATH_FOR_CREATING_NEW_TOURNAMENT_VIEW} exact>
                PATH_FOR_CREATING_NEW_TOURNAMENT_VIEW
              </Route>
              <Route
                path={PATH_FOR_TOURNAMENT_REGISTRATIONS_VIEW + `/:tournamentId`}
              >
                <Centered>
                  <TournamentRegistrationsRoute />
                </Centered>
              </Route>
              <Route path={PATH_FOR_PLAYERS_PROFILES_VIEW} exact>
                PATH_FOR_PLAYERS_PROFILES_VIEW
              </Route>
              <Route path={PATH_FOR_PLAYER_PROFILE_CREATION_VIEW} exact>
                PATH_FOR_PLAYER_PROFILE_CREATION_VIEW
              </Route>
              <Route path={PATH_FOR_PLAYER_MATCHES_VIEW} exact>
                <Centered>
                  <MatchesList />
                </Centered>
              </Route>

              <Route path={PATH_FOR_HOME_VIEW} exact>
                <HomeMenu />
              </Route>
            </Switch>
          </Grid>
          <VerticalSpace height="55px" />
          <Footer />
        </Centered>
      </MuiThemeProvider>
    </Router>
  );
}

export default TourDeFoos;
