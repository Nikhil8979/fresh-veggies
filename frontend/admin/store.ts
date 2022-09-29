import {createStore} from "redux";
import {appReducer} from "../helpers/reducer";
// @ts-ignore
const reducer = appReducer();
// @ts-ignore
export const store = createStore(reducer);
