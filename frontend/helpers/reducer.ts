import {SET_THEME, TOGGLE_SIDEBAR, TOGGLE_DRAWER} from "../constants";

export const appReducer = () => (state  = {
    theme: null,
    sidebarOpen: true,
    drawerOpen: false
}, action: any) => {
    const {type} = action;

    switch (type){
        case SET_THEME:
            return {
                ...state,
                theme: action.theme
            };
        case TOGGLE_SIDEBAR:
            return {
                ...state,
                sidebarOpen: action.sidebarOpen
            };
        case TOGGLE_DRAWER:
            return {
                ...state,
                drawerOpen: action.drawerOpen
            };
        default:
            return state;
    }
};
