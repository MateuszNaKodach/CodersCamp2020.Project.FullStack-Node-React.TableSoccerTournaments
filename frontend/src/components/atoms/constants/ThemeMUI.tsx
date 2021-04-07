import {createMuiTheme} from "@material-ui/core";
import {grey} from "@material-ui/core/colors";

export const THEME_MUI = createMuiTheme({
    palette: {
        primary: {
            main: grey[800],
            contrastText: "#E3E152",
        },
    },
});