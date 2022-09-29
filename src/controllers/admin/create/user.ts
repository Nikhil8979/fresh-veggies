import {wrapRequestHandler} from "../../../helpers/response";
import {RequestHandler} from "express";
import {User, UserType} from "../../../models/user";
import {createRouter} from "../../../routes/createRouter";

const handler:RequestHandler = async (req, res) => {
    const {name, email, password, mobile} = req.body;

    await User.create(<Partial<UserType>>{
        name,
        email,
        mobile,
        password,
        status: true
    });

    return res.send("Sdfaf");
};

createRouter.post("/user", wrapRequestHandler(handler));
