import {createMuiTheme} from "@material-ui/core";
import {grey} from "@material-ui/core/colors";

export const THEME  = createMuiTheme({
    palette: {
        primary: {
            main: grey[800],
            contrastText: "#E3E152",
        },
        secondary: {
            main: "#FFD100",
            contrastText: "#000000",
        },
    },
});