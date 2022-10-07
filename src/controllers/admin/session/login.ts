import {createRouter} from "../../../routes/createRouter";
import {success, wrapRequestHandler} from "../../../helpers/response";
import {RequestHandler} from "express";
import {Op} from "sequelize";
import {User, UserType} from "../../../models/user";
import {UserToken, UserTokenType} from "../../../models/UserToken";
import {md5, generateToken, validate} from "../../../helpers";
import {LOGIN_TYPE, JWT_SIGNING_KEY} from "../../../constant";
import {sign} from "jsonwebtoken";
import {body, check} from "express-validator";

const handler: RequestHandler = async (req, res) => {
    const {userName, password, session} = req.body;

    const user: UserType = await User.findOne({
        where: {
            [Op.or]: [
                {mobile: userName},
                {email: userName}
            ]
        }
    });

    if (!user)
        throw new Error("User Not Fount!");
    const encryptPassword = md5(password);

    if (user.password !== encryptPassword)
        throw new Error("Invalid Password");

    const token = await UserToken.create(<Partial<UserTokenType>>{
        token: generateToken(user.id),
        type: LOGIN_TYPE,
        userId: user.id
    });

    const jwt = sign({
        id: token.id,
        userId: token.userId
    }, JWT_SIGNING_KEY);

    if (session){
        req.session["login_token"] = jwt;
    }

    return res.json(success("Logged in successfully.", {
        ...token.toJSON(),
        jwt,
    }));
};

createRouter.post("/web/login", validate([
    body("userName").notEmpty().withMessage("UserName is required"),
    body("password").notEmpty().withMessage("Password is required"),
    check("session").toBoolean()

]), wrapRequestHandler(handler));
