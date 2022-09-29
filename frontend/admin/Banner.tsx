/* eslint-disable */
import * as React from "react";
import {
    Grid,
    Typography,
    Button,
    TextField,
    InputAdornment,
    MenuItem,
    makeStyles, Paper
} from "@material-ui/core";
import {Add, Search, Edit,Delete} from "@material-ui/icons";
import {ReactStateDeclaration} from "@uirouter/react";
import banner from "../../assets/static/banner1.jpg";
import {BannerDialog} from "./dialogs/BannerDialog";
const useStyles = makeStyles(theme => ({
    tableRow: {"&$hover:hover": {backgroundColor: theme.palette.primary.main}},
    header: {backgroundColor: theme.palette.primary.main},
    iconBox:{
        backgroundColor:theme.palette.primary.main,
        color:"#fff",
        padding:3,
        borderRadius:"0 0 50px"
    },
    deleteBox:{
        backgroundColor:theme.palette.primary.main,
        color:"#fff",
        padding:3,
        borderRadius:"0px 0px 0px 50px"
    }
}));

export const Banner = () => {
    const classes = useStyles({});

    return <Grid className="p-4">
        <Grid container>
            <Grid item xs>
                <Typography variant="h5" className="font-weight-normal">Bannners
                </Typography>
            </Grid>
            <Grid item xs className="d-flex justify-content-end" alignItems="center" >
                <Button
                    startIcon={<Add/>} color="primary" className="text-white" style={{fontSize: 13}} variant="contained" size="small"
                >Add Banner</Button>
            </Grid>
        </Grid>

         <Grid container className="py-3" spacing={2}>
             <Grid item xs>
                 <Grid component={Paper} className="position-relative" elevation={2}>
                    <span className={classes.iconBox} style={{position:"absolute",left:0}}>
                        <Edit/>
                    </span>
                     <span className={classes.deleteBox} style={{position:"absolute",right:0}}>
                         <Delete/>
                     </span>
                 <img className="img-fluid" src={banner}/>
                 </Grid>
             </Grid>
             <Grid item xs>
                 <Grid component={Paper} elevation={2}>
                 <img className="img-fluid" src={banner}/>
                 </Grid>
             </Grid>
             <Grid item xs>
                 <Grid component={Paper} elevation={2}>
                 <img className="img-fluid" src={banner}/>
                 </Grid>
             </Grid>
         </Grid>
        <BannerDialog/>
    </Grid>;
};

export const states: ReactStateDeclaration[] = [
    {
        name: "banners",
        url: "/banners",
        component: Banner
    }
];
