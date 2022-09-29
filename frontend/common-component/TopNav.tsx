/* eslint-disable */
import * as React from "react";
import {AppBar, Hidden, Toolbar, IconButton, Grid, Tooltip,Avatar,Button} from "@material-ui/core";
import {Menu, ArrowBackIos, ArrowForwardIos, Language, Person, DriveEta} from "@material-ui/icons";
import classNames from "classnames";
import {Maximize,Minimize} from "react-feather";
// @ts-ignore
import AvatarLogo from "../../assets/static/smarg-grocery-avatar.jpg";
import {useDispatch, useSelector} from "react-redux";
import {TOGGLE_DRAWER, TOGGLE_SIDEBAR} from "../constants";
import {useCallback} from "react";
export function TopNav (){

    const sidebarOpen = useSelector(state => state.sidebarOpen);
    const dispatch = useDispatch();

    const drawerOpen = useCallback(()=>{
        dispatch({
            type:TOGGLE_DRAWER,
            drawerOpen:true
        })
    },[]);
    const TopNavListItems = [
        {
            icon:<Language fontSize="medium" color="primary"/>,
            label:"View Website"
        },
        {
            icon:<Person fontSize="medium" color="primary"/>,
            label:"User App Link"
        },
        {
            icon:<DriveEta fontSize="medium" color="primary"/>,
            label:"Driver App Link"
        }
    ];


    return <AppBar elevation={2} style={{backgroundColor:"#fff",color:"#000"}} position="static">
      <Toolbar>
       <Hidden mdUp>
         <IconButton onClick={drawerOpen} color="inherit">
           <Menu/>
         </IconButton>
       </Hidden>
          <Hidden smDown>
                <IconButton onClick={()=>{
                    dispatch({
                            type:TOGGLE_SIDEBAR,
                            sidebarOpen:!sidebarOpen
                        })
                }} className="text-center mr-1">
                    {
                        sidebarOpen ? <ArrowBackIos fontSize="small"/> : <ArrowForwardIos fontSize="small"/>
                    }
                </IconButton>
          </Hidden>
          <Grid item md={6} lg={6}>
              <div className="d-flex flex-row p-0">
                  {
                      TopNavListItems.map((item,index)=><div style={{cursor:"pointer"}} className={classNames(index !== 0 && "ml-4"," d-flex flex-row align-items-center")}>
                               <div>{item.icon}</div>
                          <span style={{fontSize:"14px"}} className="pl-2">{item.label}</span>
                      </div>)
                  }
              </div>
          </Grid>
          <Grid item className="d-flex justify-content-end align-items-center" md={6} lg={6}>
           <Tooltip className="mr-3" title={`${false ? "Exit" : "Enter"} Full Screen`}>
             <IconButton>
                 {false ? <Minimize size="18"/> : <Maximize size="18"/>}
             </IconButton>
           </Tooltip>
           <Grid item>
           <Avatar className="img-fluid" alt="hello" src={AvatarLogo}/>
           </Grid>
          </Grid>
      </Toolbar>
    </AppBar>;
}
