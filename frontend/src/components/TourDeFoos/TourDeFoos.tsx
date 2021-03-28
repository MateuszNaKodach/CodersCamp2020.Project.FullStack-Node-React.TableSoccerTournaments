import React from "react";
import {Button, createMuiTheme, MuiThemeProvider} from "@material-ui/core";
import {Menu} from '../Menu';
import {grey} from "@material-ui/core/colors";
import {Centered} from "../Shared/Centered";
import {VerticalSpace} from "../Shared/VerticalSpace";
import {APP_NAME} from "../../constants/names";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {
    PATH_FOR_CREATING_NEW_TOURNAMENT_VIEW,
    PATH_FOR_LOGIN_VIEW, PATH_FOR_PLAYER_PROFILE_CREATION_VIEW, PATH_FOR_PLAYERS_PROFILES_VIEW,
    PATH_FOR_HOME_VIEW, PATH_FOR_TOURNAMENT_REGISTRATIONS_VIEW,
    PATH_FOR_TOURNAMENTS_SELECTION_VIEW
} from "../../constants/paths";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: grey[800],
            contrastText: "#E3E152",
        },
    },
});

function TourDeFoos() {
    const menuButtonsListProps = [
        {
            textName: "Turniej",
            onClick: () => {
                console.log("Menu button was clicked!")
            },
            onLink: PATH_FOR_TOURNAMENTS_SELECTION_VIEW
        },
        {
            textName: "Zawodnicy",
            onClick: () => {
                console.log("Menu button was clicked!")
            },
            onLink: PATH_FOR_PLAYERS_PROFILES_VIEW
        }
    ];

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
                        <Route path={PATH_FOR_TOURNAMENT_REGISTRATIONS_VIEW} exact>
                            PATH_FOR_TOURNAMENT_REGISTRATIONS_VIEW
                        </Route>
                        <Route path={PATH_FOR_PLAYERS_PROFILES_VIEW} exact>
                            PATH_FOR_PLAYERS_PROFILES_VIEW
                        </Route>
                        <Route path={PATH_FOR_PLAYER_PROFILE_CREATION_VIEW} exact>
                            PATH_FOR_PLAYER_PROFILE_CREATION_VIEW
                        </Route>

                        <Route path={PATH_FOR_HOME_VIEW} exact>
                            <VerticalSpace height="1rem"/>
                            <Menu title={APP_NAME} menuButtonsList={menuButtonsListProps}/>
                            <VerticalSpace height="1rem"/>
                        </Route>

                    </Switch>
                </Centered>
            </MuiThemeProvider>
        </Router>
    );
}

export default TourDeFoos;
