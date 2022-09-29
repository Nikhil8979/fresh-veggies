import {Request, Response} from "express";
import {error,  wrapRequestHandler} from "../helpers/response";
import {verify} from "jsonwebtoken";
import {JWT_SIGNING_KEY, LOGIN_TYPE} from "../constant";
import {UserToken} from "../models/UserToken";
import {User} from "../models/user";
export const authMiddleware = () => wrapRequestHandler(async (req:Request, res:Response, next) => {
    const auth = (req.headers.authorization || req.session["login_token"] || "").replace("Bearer ", "");
    const errorMessage = "Invalid Token or Token Expired";
    let verified;

    try{
        verified = verify(auth, JWT_SIGNING_KEY);
    }catch (e){
        res.status(401);
        return res.json(error(errorMessage));
    }

    if (!verified){
        res.status(401);
        return res.json(error(errorMessage));
    }

    const token = await UserToken.findOne({
        where: {
            id: verified.id,
            type: LOGIN_TYPE
        },
        include: [
            {
                model: User,
                as: "user"
            }
        ]
    });

    req.login_token = token;
    next();
});
