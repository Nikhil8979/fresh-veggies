import * as React from "react";
import {Grid,
    Typography,
    Button,
    TextField,
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
    CardActions,
    IconButton,
    Tooltip,
    InputAdornment} from "@material-ui/core";
import {Add, Search, Edit, Delete} from "@material-ui/icons";
import {ReactStateDeclaration} from "@uirouter/react";
import Banner from "../../assets/static/banner2.jpg";
import {LoyalityDialog} from "./dialogs/LoyalityDialog";

export const LoyalityCard = ():JSX.Element => {
    return <Grid className="p-4">
        <Grid container>
            <Grid item xs>
                <Typography variant="h5" className="font-weight-normal">Loyality Cards
                </Typography>
            </Grid>
            <Grid item xs className="d-flex justify-content-end" alignItems="center" >
                <Button
                    startIcon={<Add/>} color="primary" className="text-white" style={{fontSize: 13}} variant="contained" size="small"
                >Add Promotions</Button>
            </Grid>
        </Grid>
        <Grid container className="mt-3">
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

        <Grid container spacing={1} className="mt-3">
            <Grid item xs>
                <Card>
                    <CardActionArea>
                        <CardMedia style={{height: 200}} className="img-fluid" image={Banner}/>
                        <CardContent className="text-center">
                            <Typography className="font-weight-bold">Bronze</Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
            Amount Per Point: 20%
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
            Loyality Points: 0
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions className="d-flex justify-content-center align-items-center">
                        <Tooltip title="Edit">
                            <IconButton color="primary">
                                <Edit/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                            <IconButton style={{color: "red"}}>
                                <Delete/>
                            </IconButton>
                        </Tooltip>
                    </CardActions>
                </Card>
            </Grid>

            <Grid item xs>
                <Card>
                    <CardActionArea>
                        <CardMedia style={{height: 200}} className="img-fluid" image={Banner}/>
                        <CardContent className="text-center">
                            <Typography className="font-weight-bold">Bronze</Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
            Amount Per Point: 20%
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
            Loyality Points: 0
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions className="d-flex justify-content-center align-items-center">
                        <Tooltip title="Edit">
                            <IconButton color="primary">
                                <Edit/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                            <IconButton style={{color: "red"}}>
                                <Delete/>
                            </IconButton>
                        </Tooltip>
                    </CardActions>
                </Card>
            </Grid>

            <Grid item xs>
                <Card>
                    <CardActionArea>
                        <CardMedia style={{height: 200}} className="img-fluid" image={Banner}/>
                        <CardContent className="text-center">
                            <Typography className="font-weight-bold">Bronze</Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
            Amount Per Point: 20%
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
            Loyality Points: 0
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions className="d-flex justify-content-center align-items-center">
                        <Tooltip title="Edit">
                            <IconButton color="primary">
                                <Edit/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                            <IconButton style={{color: "red"}}>
                                <Delete/>
                            </IconButton>
                        </Tooltip>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>
        <LoyalityDialog/>
    </Grid>;
};

export const states: ReactStateDeclaration[] = [
    {
        name: "loyalityCard",
        url: "/loyality-card",
        component: LoyalityCard
    }
];
