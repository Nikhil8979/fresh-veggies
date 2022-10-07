import {createStore} from "redux";
import {appReducer} from "../helpers/reducer";
const reducer = <any>appReducer();

export const store = createStore(reducer);
