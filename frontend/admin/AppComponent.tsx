import * as React from "react";
import {UIView} from "@uirouter/react";
import {Grid} from "@material-ui/core";
import {Dashboard, Category} from "@material-ui/icons";
import {SideNav} from "../common-component/SideNav";
import {TopNav} from "../common-component/TopNav";

export function AppComponent (): JSX.Element{
    const sidebarNav = [
        {
            title: "Dashboard",
            sref: "",
            icon: <Dashboard fontSize={"medium"}/>
        },
        {
            title: "Categories",
            sref: "",
            icon: <Category fontSize="medium"/>
        },
        {
            title: "Products",
            sref: "",
            icon: <Category/>
        },
        {
            title: "Agents",
            sref: "",
            icon: <Category/>
        },
        {
            title: "Brands & Units",
            sref: "",
            icon: <Category/>
        },
        {
            title: "Orders",
            sref: "",
            icon: <Category/>
        },
        {
            title: "Banners",
            sref: "",
            icon: <Category/>
        },
        {
            title: "Promotions",
            sref: "",
            icon: <Category/>
        },
        {
            title: "Loyalty Card",
            sref: "",
            icon: <Category/>
        },
        {
            title: "Notifications",
            sref: "",
            icon: <Category/>
        },
        {
            title: "Users",
            sref: "",
            icon: <Category/>
        },
        {
            title: "Feedback",
            sref: "",
            icon: <Category/>
        },
        {
            title: "Settings",
            sref: "",
            icon: <Category/>
        },
        {
            title: "LogOut",
            sref: "",
            icon: <Category/>
        },

    ];

    return <>
        <Grid container wrap="nowrap">
            <Grid item xs container>
                <SideNav sidebarLinks={sidebarNav}/>
                <Grid item xs container direction="column">
                    <TopNav/>
                    <Grid
                        item xs container direction="column" wrap="nowrap"
                        // className="app-container"
                    >
                        <UIView/>
                    </Grid>
                </Grid>
            </Grid>

        </Grid>
    </>;
}
