import express from "express";
import cors from "cors";
import useragent from "express-useragent";
import * as os from "os";
import fileUpload from "express-fileupload";
import cookieSession from "cookie-session";
require("dotenv").config();
import {JWT_SIGNING_KEY} from "./constant";
export const app = express();

app.use(fileUpload({
    useTempFiles: true,
    preserveExtension: true,
    tempFileDir: os.tmpdir(),
    parseNested: true
}));

app.use(cookieSession({
    name: "session",
    keys: [JWT_SIGNING_KEY],
    maxAge: 24 * 60 * 60 * 1000
}));

app.use((req, res, next) => {
    req.body = {
        ...req.body,
        ...req.files
    };

    next();
});

app.use(express.json());
app.use(cors());
app.use(useragent.express());
app.use(express.static("assets"));
app.set("views", "./src/views");
app.set("view engine", "ejs");
