import React from "react";
import {Grid, Paper, Typography, IconButton, Divider, makeStyles} from "@material-ui/core";
import {Add, Edit} from "@material-ui/icons";
import {ReactStateDeclaration} from "@uirouter/react";
import classNames from "classnames";

const useStyles = makeStyles(theme => ({
    listItemSideBorder: {
        position: "absolute",
        left: 0,
        top: 0,
        height: 50,
        borderRadius: "5px",
        backgroundColor: theme.palette.primary.main,
        width: 5
    },
    listItem: {backgroundColor: theme.palette.primary.light}
}));

export function BrandUnit (){
    const styles = useStyles({});
    return <Grid className="p-4">
        <Grid container>
            <Grid item xs>
                <Typography variant="h5" className="font-weight-normal">Brands & Units
                </Typography>
            </Grid>
        </Grid>
        <Grid container spacing={2} className="py-4" >
            <Grid item xs={12} sm={4} md={4} lg={4}>
                <Grid component={Paper} elevation={2}>
                    <Grid container className="p-1 px-2">
                        <Grid item xs className="d-flex align-items-center">
                            <Typography variant="h5">Units</Typography>
                        </Grid>
                        <Grid item xs className="d-flex justify-content-end align-items-center">
                            <div>
                                <IconButton color="primary">
                                    <Add fontSize="medium"/>
                                </IconButton>
                            </div>
                        </Grid>

                    </Grid>

                    <Grid container direction="column" wrap="nowrap" style={{position: "relative"}}>
                        <Divider/>
                        <Grid container direction="column" wrap="nowrap">
                            <span className={styles.listItemSideBorder}></span>

                            <Grid container className={classNames(styles.listItem, "px-2")}>
                                <Grid item xs className="d-flex justify-content-start align-items-center">
                                    <Typography variant="h6" className="font-weight-normal">Kg</Typography>
                                </Grid>
                                <Grid item xs className="d-flex justify-content-end align-items-center">
                                    <IconButton color="primary">
                                        <Edit color="primary"/>
                                    </IconButton>
                                </Grid>
                            </Grid>

                        </Grid>
                    </Grid>
                </Grid>

            </Grid>

            <Grid item xs={12} sm={4} md={4} lg={4}>
                <Grid component={Paper} elevation={2}>
                    <Grid container className="p-1 px-2">
                        <Grid item xs className="d-flex align-items-center">
                            <Typography variant="h5">Brands</Typography>
                        </Grid>
                        <Grid item xs className="d-flex justify-content-end align-items-center">
                            <div>
                                <IconButton color="primary">
                                    <Add fontSize="medium"/>
                                </IconButton>
                            </div>
                        </Grid>

                    </Grid>

                    <Grid container direction="column" wrap="nowrap" style={{position: "relative"}}>
                        <Divider/>
                        <Grid container direction="column" wrap="nowrap">
                            <span className={styles.listItemSideBorder}></span>

                            <Grid container className={classNames(styles.listItem, "px-2")}>
                                <Grid item xs className="d-flex justify-content-start align-items-center">
                                    <Typography variant="h6" className="font-weight-normal">Surf Excel</Typography>
                                </Grid>
                                <Grid item xs className="d-flex justify-content-end align-items-center">
                                    <IconButton color="primary">
                                        <Edit color="primary"/>
                                    </IconButton>
                                </Grid>
                            </Grid>

                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </Grid>;
}

export const states: ReactStateDeclaration[] = [
    {
        name: "brandUnit",
        url: "/brand-and-unit",
        component: BrandUnit
    }
];
