import React from "react";
import {UIRouter, UIRouterReact} from "@uirouter/react";
import {CrudProvider} from "@crud/react";
import {$crud} from "../factories/CrudFactory";
import {AlertDialog, ConfirmDialog, NotifySnackbar} from "react-material-crud";
import {CrudRequest} from "@crud/core";
import {Store} from "redux";
import {Provider} from "react-redux";
import {BrandingProvider} from "../common-component/BrandingProvider";
import {MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/moment";

export function AppContainer ({
    crud = $crud,
    router,
    store,
    AppComponent
}: { crud?: CrudRequest, router: UIRouterReact, store: Store, AppComponent: any }): JSX.Element{
    // @ts-ignore
    return <Provider store={store}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <CrudProvider crud={crud}>
                <UIRouter router={router}>
                    <BrandingProvider>
                        <AppComponent/>
                        <NotifySnackbar autoHideDuration={5000}/>
                        <AlertDialog/>
                        <ConfirmDialog/>
                    </BrandingProvider>
                </UIRouter>
            </CrudProvider>
        </MuiPickersUtilsProvider>
    </Provider>;
}

