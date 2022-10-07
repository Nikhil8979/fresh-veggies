import * as React from "react";
import {Grid} from "@material-ui/core";
import {UIView} from "@uirouter/react";
import {ProgressIndicator} from "react-material-crud";

export function AppComponent (){
    return <Grid container direction="column" wrap="nowrap">
        <Grid item xs container direction="column">
            <UIView/>
        </Grid>
        <ProgressIndicator/>
    </Grid>;
}
