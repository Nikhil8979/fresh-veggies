import * as React from "react";
import ReactDom from "react-dom";
import {router} from "./router";
import {AppContainer} from "./AppContainer";
import {AppComponent} from "./AppComponent";
import {store} from "./store";

ReactDom.render(React.createElement(AppContainer, {
    router,
    store,
    AppComponent
}), document.querySelector("#app"));
