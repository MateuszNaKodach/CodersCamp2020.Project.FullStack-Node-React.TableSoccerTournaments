import React from "react";
import {Button, createMuiTheme, MuiThemeProvider} from "@material-ui/core";
import {Menu} from '../Menu';
import {grey} from "@material-ui/core/colors";
import {Centered} from "../Shared/Centered";
import {TournamentRegistrations} from "../TournamentRegistrations";
import {VerticalSpace} from "../Shared/VerticalSpace";
import {APP_NAME} from "../../constants/constants";

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
                console.log("Tournament Button was clicked!")
            },
        },
        {
            textName: "Zawodnicy",
            onClick: () => {
                console.log("Tournament Button was clicked!")
            },
        }
    ];

    return (
        <MuiThemeProvider theme={theme}>

            <Centered>
                <VerticalSpace height="1rem"/>

                <Menu title={APP_NAME} menuButtonsList={menuButtonsListProps} />
                <VerticalSpace height="1rem"/>

                <Button variant="contained" color="primary">
                    Primary
                </Button>

                <VerticalSpace height="1rem"/>

                <TournamentRegistrations tournamentId="sampleTournamentId"/>

                <VerticalSpace height="1rem"/>
            </Centered>
        </MuiThemeProvider>
    );
}

export default TourDeFoos;
