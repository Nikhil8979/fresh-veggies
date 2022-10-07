import {app} from "../app";
import {apps} from "../helpers/apps";
import root from "app-root-path";
import {wrapRequestHandler} from "../helpers/response";
import fs from "fs";

const appAssets = apps.reduce((assets, {assetsDirectory, name}) => {
    try {
        console.log(assetsDirectory, name, "/assets.json");
        assets[name] = JSON.parse(fs.readFileSync(`${root}/assets/apps/${assetsDirectory ?? name}/assets.json`).toString());
    } catch (e){
        assets[name] = undefined;
    }

    return assets;
}, {});

apps.filter(({context}) => context !== undefined).forEach(({context, name, title}) => {
    app.get(`/${context}`, wrapRequestHandler(async (req, res) => {

        res.render("index", {
            appName: name,
            assets: appAssets[name],
            title
        });
    }));
});
