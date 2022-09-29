import React from "react";
import {Grid, makeStyles} from "@material-ui/core";
import classNames from "classnames";

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.primary.main,
        color: "#fff"
    }
}));

export const ModalHeader = (props:{
    children?:any,
    className?:string
}) => {
    const styles = useStyles({});
    return <Grid container alignItems="center" className={classNames(styles.root, props.className)}>
        {props.children}
    </Grid>;
};
