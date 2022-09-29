import React from "react";
import {ThemeProvider, makeStyles} from "@material-ui/core";
import {defaultTheme} from "../themes/default";
/* eslint-disable */
const useGlobalStyles = makeStyles(theme => ({
    "@global": {
        body: {fontFamily: theme.typography.fontFamily},
        ".app-container": {
            backgroundColor: "#fff",
            overflowY: "auto",
            overflowScrolling: "touch"
        },
    },
}));

function GlobalStyles ({children}){
    useGlobalStyles();
    return children;
}

export function BrandingProvider ({children}:{children:any}):JSX.Element{
    return <ThemeProvider theme={defaultTheme}>
        <GlobalStyles>{children}</GlobalStyles>
    </ThemeProvider>;
}
