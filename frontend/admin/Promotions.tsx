import * as React from "react";
import {useState} from "react";
import {Grid,
    Typography,
    Button,
    TextField,
    InputAdornment,
    Tooltip,
    MenuItem, Paper, makeStyles} from "@material-ui/core";
import {Add, Search, Edit, Delete} from "@material-ui/icons";
import {ReactStateDeclaration} from "@uirouter/react";
import {KeyboardDatePicker} from "@material-ui/pickers";
import classNames from "classnames";

const useStyles = makeStyles((theme) => ({
    boxBackGroundColor: {
        backgroundColor: theme.palette.primary.main,
        borderRadius: "0 0 5px 5px"
    },
    list: {
        color: "#939393",
        fontSize: 15,
        marginTop: 10
    }
}));

export const Promotions = ():JSX.Element => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const styles = useStyles({});
    return <Grid className="p-4">
        <Grid container>
            <Grid item xs>
                <Typography variant="h5" className="font-weight-normal">Promotions
                </Typography>
            </Grid>
            <Grid item xs className="d-flex justify-content-end" alignItems="center" >
                <Button
                    startIcon={<Add/>} color="primary" className="text-white" style={{fontSize: 13}} variant="contained" size="small"
                >Add Promotions</Button>
            </Grid>
        </Grid>
        <Grid container className="mt-3 justify-content-end align-items-center" spacing={1}>
            <Grid item xs sm={3} md={3} lg={3}>
                <KeyboardDatePicker
                    autoOk
                    fullWidth
                    size="small"
                    variant="inline"
                    inputVariant="outlined"
                    format="MM-DD-YYYY"
                    value={selectedDate}
                    onChange={handleDateChange}
                    label="From Date"
                />
            </Grid>
            <Grid item xs sm={3} md={3} lg={3}>
                <KeyboardDatePicker
                    autoOk
                    fullWidth
                    size="small"
                    variant="inline"
                    inputVariant="outlined"
                    format="MM-DD-YYYY"
                    value={selectedDate}
                    onChange={handleDateChange}
                    label="To Date"
                />
            </Grid>
            <Grid item xs sm={3} md={3} lg={3}>
                <TextField label="Promo Type" variant="outlined" color="primary" size="small" select fullWidth>
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="For All Users">For All Users</MenuItem>
                    <MenuItem value="For One Time User Only">For One Time User Only</MenuItem>
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

        <Grid container className="mt-3" spacing={2}>
            <Grid item xs style={{borderRadius: 20}}>
                <Grid component={Paper} style={{overflow: "hidden"}} elevation={2}>
                    <Grid className={styles.boxBackGroundColor}>
                        <Grid
                            className={"d-flex p-1 justify-content-between align-items-center"}
                        >
                            <Tooltip title="Edit">
                                <Edit style={{cursor: "pointer"}} className="text-white"/>
                            </Tooltip>
                            <Tooltip title="Delete">
                                <Delete style={{cursor: "pointer"}} className="text-white"/>
                            </Tooltip>
                        </Grid>
                        <Grid className={"text-center py-3"}>
                            <span className="font-weight-bold form-control-sm text-white">20% Off</span>
                            <Typography className="font-weight-bold text-white">Cervoxza20</Typography>
                            <p className="font-weight-normal form-control-sm text-white">Expiry Date: Aug 23,2022</p>
                        </Grid>
                    </Grid>
                    <Grid className="py-3">
                        <ul className="list" style={{listStyle: "none"}}>
                            <li className={styles.list}>Valid for first time user only</li>
                            <li className={styles.list}>Min Order Amount is 200</li>
                            <li className={styles.list}>Promo Quantity 0</li>
                        </ul>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs style={{borderRadius: 20}}>
                <Grid component={Paper} style={{overflow: "hidden"}} elevation={2}>
                    <Grid
                        className={classNames(styles.boxBackGroundColor, "d-flex p-1 justify-content-between align-items-center")}
                    >
                        <Edit className="text-white"/>
                        <Delete className="text-white"/>
                    </Grid>
                    <Grid className={classNames(styles.boxBackGroundColor, "text-center py-3")}>
                        <span className="font-weight-bold form-control-sm text-white">20% Off</span>
                        <Typography className="font-weight-bold text-white">Cervoxza20</Typography>
                        <p className="font-weight-normal form-control-sm text-white">Expiry Date: Aug 23,2022</p>
                    </Grid>
                    <Grid className="py-3">
                        <ul style={{listStyle: "none"}}>
                            <li className={styles.list}>Valid for first time user only</li>
                            <li className={styles.list}>Min Order Amount is 200</li>
                            <li className={styles.list}>Promo Quantity 0</li>
                        </ul>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs style={{borderRadius: 20}}>
                <Grid component={Paper} style={{overflow: "hidden"}} elevation={2}>
                    <Grid
                        className={classNames(styles.boxBackGroundColor, "d-flex p-1 justify-content-between align-items-center")}
                    >
                        <Edit className="text-white"/>
                        <Delete className="text-white"/>
                    </Grid>
                    <Grid className={classNames(styles.boxBackGroundColor, "text-center py-3")}>
                        <span className="font-weight-bold form-control-sm text-white">20% Off</span>
                        <Typography className="font-weight-bold text-white">Cervoxza20</Typography>
                        <p className="font-weight-normal form-control-sm text-white">Expiry Date: Aug 23,2022</p>
                    </Grid>
                    <Grid className="py-3">
                        <ul style={{listStyle: "none"}}>
                            <li className={styles.list}>Valid for first time user only</li>
                            <li className={styles.list}>Min Order Amount is 200</li>
                            <li className={styles.list}>Promo Quantity 0</li>
                        </ul>
                    </Grid>
                </Grid>
            </Grid>

        </Grid>
    </Grid>;
};

export const states: ReactStateDeclaration[] = [
    {
        name: "promotions",
        url: "/promotions",
        component: Promotions
    }
];
