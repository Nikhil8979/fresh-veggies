import {createTheme, responsiveFontSizes} from "@material-ui/core";

export const defaultTheme = responsiveFontSizes(createTheme({
    palette: {
        primary: {
            main: "#53B175",
            light: "rgba(83,177,117,0.23)",
            50: "#cac9c2",
        },
        secondary: {main: "#918f84"}
    },
}));
