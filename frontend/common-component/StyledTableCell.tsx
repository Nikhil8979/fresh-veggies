import React, {ReactElement} from "react";
import {withStyles, TableCell, TableRow} from "@material-ui/core";

export const Td:React.ReactElement<any | string> = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.primary.main,
        color: "#fff!important"
    },
    body: {fontSize: 14},
}))(TableCell);
export const Tr:React.ComponentType = withStyles((theme) => ({root: {"&:nth-of-type(odd)": {backgroundColor: theme.palette.action.hover}}}))(TableRow);
