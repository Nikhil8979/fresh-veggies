import * as React from "react";
import {useCallback, useEffect, useState} from "react";
import {Grid, makeStyles, Typography, Hidden, List, ListItem, SwipeableDrawer} from "@material-ui/core";
import classNames from "classnames";
import {useDispatch, useSelector} from "react-redux";
import {TOGGLE_DRAWER} from "../constants";

// @ts-ignore
/* disable-eslint */
const useStyles = makeStyles((theme) => ({
    container: {
        width: 250,
        position: "relative"
    },
    shrinkContainer: {width: 55},
    logoContainer: {
        height: 80,
        padding: 16,
        boxShadow: "1px 1px 4px #e0d8d8"

    },
    logo: {
        fontWeight: "bold",
        color: theme.palette.primary.main,
        fontSize: 30
    },
    menuContainer: {
        width: "250px",
        height: "calc(100vh - 80px)",
        position: "absolute",
        top: 80,
        left: 0,
        fontWeight: 500,
        color: "#5c5c5c",
        // boxShadow: 0 0 5px rgba(0, 0, 0, 0.5),
        // background-color: white;
        overflowY: "scroll",
    },
    selectMenuIcon: {color: theme.palette.primary.main},
    menuIcon: {color: theme.palette.primary[50]},
    listItem: {
        height: 50,
        position: "relative",
        cursor: "pointer"

    },
    isSelectListItem: {backgroundColor: theme.palette.primary.light},
    listItemSideBorder: {
        position: "absolute",
        left: 0,
        top: 0,
        height: 50,
        borderRadius: "5px",
        backgroundColor: theme.palette.primary.main,
        width: 5
    },
    title: {
        color: theme.palette.secondary.light,
        // fontWeight: 600,
        // fontSize: "16px"
    }

}));

export function SideNav ({sidebarLinks: linksProp}: {
    sidebarLinks: any[],
}): JSX.Element{
    const [sideNavLink, setNavLinks] = useState<any>(linksProp);

    const [isActive, setIsActive] = useState({
        onMouse: 0,
        onClick: 0
    });

    const dispatch = useDispatch();
    const sidebarOpen = useSelector(state => state.sidebarOpen);
    const drawerOpen = useSelector(state => state.drawerOpen);

    const closeDrawer = useCallback(() => {
        dispatch({
            type: TOGGLE_DRAWER,
            openDrawer: false
        });
    }, []);

    const openDrawer = useCallback(() => {
        dispatch({
            type: TOGGLE_DRAWER,
            openDrawer: true
        });
    }, []);

    useEffect(() => {
        setNavLinks(linksProp);
    }, []);

    const styles = useStyles({});

    const content = <Grid item xs container direction="column" wrap="nowrap">
        <Grid
            container direction="column" className={classNames(styles.logoContainer, "position-relative")}
            wrap="nowrap"
        >
            {
                sidebarOpen && <Typography className={classNames(styles.logo, "w-100 font-weight-bold text-center")}>Grocery
                Logo</Typography>
            }
        </Grid>
        <Grid
            container direction="column" item xs wrap="nowrap"
            className={classNames(styles.menuContainer, "menu-conatiner")}
        >
            <Grid component={List} style={{backgroundColor: "#fff"}} disablePadding container direction="column" wrap="nowrap" item xs>
                {
                    sideNavLink.map((item, index) =>
                        <React.Fragment key={item.title}>
                            <ListItem
                                component={Grid} container
                                direction="column"
                                wrap="nowrap"
                                onMouseEnter={
                                    () => setIsActive(prev => {
                                        return {
                                            ...prev,
                                            onMouse: index
                                        };
                                    })
                                }
                                onMouseLeave={
                                    () => {
                                        setIsActive(prev => {
                                            return {
                                                ...prev,
                                                onMouse: prev.onClick
                                            };
                                        });
                                    }
                                }
                                onClick={
                                    () => setIsActive(prev => {
                                        return {
                                            ...prev,
                                            onClick: index
                                        };
                                    })
                                }
                                style={{cursor: "pointer"}}
                                className={classNames((index === isActive.onClick || index === isActive.onMouse) &&  styles.isSelectListItem,  styles.listItem)}
                            >
                                <Grid
                                    item xs container alignItems="center" direction="row" wrap="nowrap"
                                    className={classNames("sideNavIcon")}
                                >
                                    <span className={(index === isActive.onClick || index === isActive.onMouse) && styles.listItemSideBorder}></span>
                                    <div className={(index === isActive.onClick || index === isActive.onMouse) ? styles.selectMenuIcon : styles.menuIcon}>{item.icon}</div>
                                    {sidebarOpen && <span className={classNames(styles.title, "pl-3")}>{item.title}</span>}
                                </Grid>
                            </ListItem>
                        </React.Fragment>
                    )
                }
            </Grid>
        </Grid>
    </Grid>;

    return <>
        <Hidden smDown>
            <Grid container direction="column" wrap="nowrap" item className={classNames(styles.container, {[styles.shrinkContainer]: !sidebarOpen})}>
                {content}
            </Grid>
        </Hidden>
        <Hidden mdUp>
            <SwipeableDrawer onOpen={openDrawer} onClose={closeDrawer} open={drawerOpen}>
                {content}
            </SwipeableDrawer>
        </Hidden>
    </>;
}
