import * as React from "react";
import {ReactStateDeclaration} from "@uirouter/react";
import {Grid, makeStyles, Typography, Hidden} from "@material-ui/core";
import {Lock, Visibility, VisibilityOff} from "@material-ui/icons";
import {useState} from "react";
import classNames from "classnames";
import {LoginParams, $user} from "../factories/UserFactorys";

const useStyles = makeStyles(theme => ({
    leftSide: {padding: 10},
    logo: {fontSize: "28px"},
    heading: {
        fontSize: "58px",
        fontWeight: 600,
        textAlign: "center"
    },
    subheading: {
        fontSize: "40px",
        fontWeight: 600,
        color: "#fff"
    },
    lock: {
        backgroundColor: theme.palette.primary.main,
        marginTop: 20,
        textAlign: "center",
        width: "60px",
        lineHeight: "60px",
        height: "60px",
        borderRadius: "50%"
    },
    customInput: {
        outline: "none",
        width: "100%",
        padding: 15,
        borderRadius: 20,
        border: "none",
        margin: "10px 0",
        backgroundColor: theme.palette.primary.light,
        fontSize: "15px",
        color: "#686666",
        // fontWeight: "bold"
    },
    button: {
        outline: "none",
        width: "100%",
        margin: "10px 0",
        borderRadius: 20,
        padding: 15,
        backgroundColor: theme.palette.primary.main,
        border: "none",
        color: "#fff",
        fontWeight: 500
    },
    rightSide: {
        backgroundColor: theme.palette.primary.main,
        padding: 50,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    rightSidebutton: {
        outline: "none",
        // width: "100%",
        margin: "20px 0",
        borderRadius: 20,
        padding: "10px 50px",
        backgroundColor: "#fff",
        border: "none",
        color: theme.palette.primary.main,
        fontWeight: 500
    }
}));

export function LoginPage (){
    const classes = useStyles({});
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [params, setParams] = useState<Partial<LoginParams>>({});

    const login = async () => {
        try {
            setLoading(true);
            const token = await $user.login(params);

            if (token.type === "login"){
                // window.location.href = "/admin";
            }
        } finally {
            setLoading(false);
        }
    };

    return <Grid container style={{height: "100vh"}}>
        <Grid item className={classes.leftSide} xs={12} sm={8} lg={8} md={8}>
            <Typography className={classes.logo} variant="h2">Logo</Typography>
            <Grid
                style={
                    {
                        height: "80%",
                        width: "100%",
                        display: "flex"
                    }
                } alignItems="center" justifyContent="center"
            >
                <Grid>
                    <Hidden xsDown>
                        <Typography className={classes.heading} variant="h2">Login to Your Account</Typography>
                    </Hidden>
                    <Hidden smUp>
                        <Typography
                            style={
                                {
                                    fontSize: "30px",
                                    fontWeight: "bold"
                                }
                            } variant="h2"
                        >Login to Your Account</Typography>
                    </Hidden>
                    <Grid className="d-flex justify-content-center align-items-center">
                        <div className={classes.lock}>
                            <Lock style={{color: "#fff"}} fontSize="large"/>
                        </div>
                    </Grid>
                    <Grid className="mt-3 login-input">
                        <input
                            autoComplete="off" type="text" onChange={
                                e => {
                                    const {value: userName} = e.target;

                                    setParams(prev => {
                                        return {
                                            ...prev,
                                            userName
                                        };
                                    });
                                }
                            } className={classes.customInput} placeholder="Email"
                        />
                        <div style={{position: "relative"}}>
                            <input
                                onKeyPress={
                                    () => {
                                        login();
                                    }
                                }
                                autoComplete="off" onChange={
                                    e => {
                                        const {value: password} = e.target;

                                        setParams(prev => {
                                            return {
                                                ...prev,
                                                password
                                            };
                                        });
                                    }
                                } type={!visible ? "password" : "text"} className={classes.customInput}
                                placeholder="Password"
                            />
                            {
                                !visible ? <Visibility
                                    onClick={() => setVisible(true)}
                                    style={
                                        {
                                            position: "absolute",
                                            right: 10,
                                            top: "30%",
                                            color: "#686666"
                                        }
                                    }
                                /> : <VisibilityOff
                                    onClick={() => setVisible(false)}
                                    style={
                                        {
                                            position: "absolute",
                                            right: 10,
                                            top: "30%",
                                            color: "#686666"
                                        }
                                    }
                                />
                            }
                        </div>
                        <button
                            disabled={loading}
                            onClick={
                                () => {
                                    login();
                                }
                            } className={classes.button}
                        > {loading ? "Signing In" : "Sign In"}
                        </button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
        <Hidden xsDown>
            <Grid className={classes.rightSide} item xs={12} sm={4} lg={4} md={4}>
                <Grid className="text-center">
                    <Typography className={classes.subheading} variant="h2">Welcome Back!</Typography>
                    <Typography className="mt-3 text-white" variant="body1">To Keep connected with us please login with
                        your personal information.</Typography>
                    <button
                        className={classNames(classes.rightSidebutton)}
                    >
                        View Website
                    </button>
                </Grid>
            </Grid>
        </Hidden>
    </Grid>;
}

export const states: ReactStateDeclaration[] = [
    {
        name: "login",
        url: "/login",
        component: LoginPage
    }
];
