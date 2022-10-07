import ReactDom from "react-dom";
import {AppComponent} from "./AppComponent";
import * as React from "react";
import {AppContainer} from "../common-component/AppContainer";
import {store} from "./store";
import {router} from "./router";

ReactDom.render(React.createElement(AppContainer, {
    router,
    store,
    AppComponent
}), document.querySelector("#app"));
