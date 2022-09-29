import * as React from "react";
import {Grid,
    Typography,
    Button,
    TextField,
    MenuItem,
    InputAdornment,
    TableContainer,
    Table,
    TableHead,
    TableBody,
    IconButton,
    Tooltip,
    Paper,
    makeStyles,
    Switch} from "@material-ui/core";
import {Add, Search, Edit, Delete} from "@material-ui/icons";
import {ReactStateDeclaration} from "@uirouter/react";
import  {Tr, Td} from "../common-component/StyledTableCell";
import {NotificationDialog} from "./dialogs/NotificationDialog";

const useStyles = makeStyles(theme => ({
    tableRow: {"&$hover:hover": {backgroundColor: theme.palette.primary.main}},
    header: {backgroundColor: theme.palette.primary.main}
}));

export const Notifications = ():JSX.Element => {
    const classes = useStyles({});

    return <Grid className="p-4">
        <Grid container>
            <Grid item xs>
                <Typography variant="h5" className="font-weight-normal">Notifications
                </Typography>
            </Grid>
            <Grid item xs className="d-flex justify-content-end" alignItems="center" >
                <Button
                    startIcon={<Add/>} color="primary" className="text-white" style={{fontSize: 13}} variant="contained" size="small"
                >Add Notifications</Button>
            </Grid>
        </Grid>
        <Grid container className="mt-3 justify-content-end align-items-center" spacing={2}>
            <Grid item xs sm={3} md={3} lg={3}>
                <TextField label="Status" variant="outlined" color="primary" size="small" select fullWidth>
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="inactive">InActive</MenuItem>
                </TextField>
            </Grid>
            <Grid item xs sm={3} md={3} lg={3}>
                <TextField
                    color="primary"
                    InputProps={
                        {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search color="primary"/>
                                </InputAdornment>
                            )
                        }
                    }
                    variant="outlined" fullWidth size="small" label="Search"
                />
            </Grid>
        </Grid>

        <Grid container direction="column" wrap="nowrap" className="py-3">
            <Grid
                className="table-responsive" style={
                    {
                        boxShadow: "rgb(239 230 230) 2px 2px 10px",
                        borderRadius: "5px"
                    }
                }
            >
                <TableContainer component={Paper} elevation={2}>
                    <Table>
                        <TableHead className={classes.header}>
                            <Tr>
                                <Td>ID</Td>
                                <Td>Image</Td>
                                <Td>Title</Td>
                                <Td>Content</Td>
                                <Td>Created At</Td>
                                <Td>Status</Td>
                                <Td className="text-center">Actions</Td>
                            </Tr>
                        </TableHead>
                        <TableBody>
                            <Tr hover className={classes.tableRow}>
                                <Td>1</Td>
                                <Td>hello</Td>
                                <Td>Title</Td>
                                <Td>Content</Td>
                                <Td>16/01/2022</Td>
                                <Td>Active</Td>
                                <Td className="text-center">
                                    <Tooltip title="Edit">
                                        <IconButton>
                                            <Edit color="primary"/>
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Delete">
                                        <IconButton>
                                            <Delete style={{color: "red"}}/>
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Change Status">
                                        <Switch size="small" color="primary"/>
                                    </Tooltip>
                                </Td>
                            </Tr>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <NotificationDialog/>
        </Grid>
    </Grid>;
};

export const states: ReactStateDeclaration[] = [
    {
        name: "notifications",
        url: "/notifications",
        component: Notifications
    }
];
