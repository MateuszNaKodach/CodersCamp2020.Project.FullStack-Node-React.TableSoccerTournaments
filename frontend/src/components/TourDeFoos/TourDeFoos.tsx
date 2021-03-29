import {Button, createMuiTheme, MuiThemeProvider} from "@material-ui/core";
import {grey} from "@material-ui/core/colors";
import {Centered} from "../Shared/Centered";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {
    PATH_FOR_CREATING_NEW_TOURNAMENT_VIEW,
    PATH_FOR_LOGIN_VIEW, PATH_FOR_PLAYER_PROFILE_CREATION_VIEW, PATH_FOR_PLAYERS_PROFILES_VIEW,
    PATH_FOR_HOME_VIEW, PATH_FOR_TOURNAMENT_REGISTRATIONS_VIEW,
    PATH_FOR_TOURNAMENTS_SELECTION_VIEW
} from "../../constants/paths";
import {HomeMenu} from "../HomeMenu/HomeMenu";
import {TournamentRegistrations} from "../TournamentRegistrations";
import Footer from "../Footer/Footer"; 

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
        <Router>
            <MuiThemeProvider theme={theme}>
                <Centered>
                    <Switch>
                        <Route path={PATH_FOR_LOGIN_VIEW} exact>
                            <Button>PATH_FOR_LOGIN_VIEW</Button>
                        </Route>
                        <Route path={PATH_FOR_TOURNAMENTS_SELECTION_VIEW} exact>
                            PATH_FOR_TOURNAMENTS_SELECTION_VIEW
                        </Route>
                        <Route path={PATH_FOR_CREATING_NEW_TOURNAMENT_VIEW} exact>
                            PATH_FOR_CREATING_NEW_TOURNAMENT_VIEW
                        </Route>
                        <Route path={PATH_FOR_TOURNAMENT_REGISTRATIONS_VIEW + `/:tournamentId`}>
                            <Centered>
                                <TournamentRegistrations/>
                            </Centered>
                        </Route>
                        <Route path={PATH_FOR_PLAYERS_PROFILES_VIEW} exact>
                            PATH_FOR_PLAYERS_PROFILES_VIEW
                        </Route>
                        <Route path={PATH_FOR_PLAYER_PROFILE_CREATION_VIEW} exact>
                            PATH_FOR_PLAYER_PROFILE_CREATION_VIEW
                        </Route>

                        <Route path={PATH_FOR_HOME_VIEW} exact>
                            <HomeMenu/>
                        </Route>
                    </Switch>
                    <Footer />
                </Centered>
            </MuiThemeProvider>
        </Router>
    );
}

export default TourDeFoos;
