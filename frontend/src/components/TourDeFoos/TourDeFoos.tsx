import React from "react";
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core";
import {Menu} from '../Menu';
import {grey} from "@material-ui/core/colors";
import {Centered} from "../Shared/Centered";
import {VerticalSpace} from "../Shared/VerticalSpace";
import {APP_NAME} from "../../constants/names";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import {
    PATH_FOR_CREATING_NEW_TOURNAMENT_VIEW,
    PATH_FOR_LOGIN_VIEW, PATH_FOR_PLAYER_PROFILE_CREATION_VIEW, PATH_FOR_PLAYERS_PROFILES_VIEW,
    PATH_FOR_START_VIEW, PATH_FOR_TOURNAMENT_REGISTRATIONS_VIEW,
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
        },
        {
            textName: "Zawodnicy",
            onClick: () => {
                console.log("Menu button was clicked!")
            },
        }
    ];

    return (
        <Router>
            <MuiThemeProvider theme={theme}>

                <Switch>
                    <Centered>
                        <Route path={PATH_FOR_START_VIEW}>
                            <VerticalSpace height="1rem"/>
                            <Menu title={APP_NAME} menuButtonsList={menuButtonsListProps}/>
                            <VerticalSpace height="1rem"/>
                        </Route>
                        <Route path={PATH_FOR_LOGIN_VIEW}>
                        </Route>
                        <Route path={PATH_FOR_LOGIN_VIEW}>
                        </Route>
                        <Route path={PATH_FOR_TOURNAMENTS_SELECTION_VIEW}>
                        </Route>
                        <Route path={PATH_FOR_CREATING_NEW_TOURNAMENT_VIEW}>
                        </Route>
                        <Route path={PATH_FOR_TOURNAMENT_REGISTRATIONS_VIEW}>
                        </Route>
                        <Route path={PATH_FOR_PLAYERS_PROFILES_VIEW}>
                        </Route>
                        <Route path={PATH_FOR_PLAYER_PROFILE_CREATION_VIEW}>
                        </Route>
                    </Centered>
                </Switch>
            </MuiThemeProvider>
        </Router>
    );
}

export default TourDeFoos;
