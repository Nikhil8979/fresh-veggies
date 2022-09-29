import {Model, DataTypes} from "sequelize";
// @ts-ignore
import {sequelize} from "../models";
import {User, UserType} from "./user";
import {Request} from "express";
import {Request as ValidatorRequest} from "express-validator/src/base";
import {LOGIN_TYPE, JWT_SIGNING_KEY} from "../constant";
import {verify} from "jsonwebtoken";
export interface UserTokenType {
    id?: number,
    userId: number,
    token: string,
    type: string,
    user?: UserType;
}

interface UserInstance
    extends Model<UserTokenType>,
        UserTokenType {
    createdAt?: Date;
    updatedAt?: Date;
}

export const UserToken = sequelize.define<UserInstance>(
    "UserToken",
    {
        userId: {type: DataTypes.INTEGER},
        token: {type: DataTypes.STRING},
        type: {type: DataTypes.STRING}
    }
);

UserToken.belongsTo(User, {
    foreignKey: "userId",
    as: "user"
});

export const getLoginTokenFromRequest = async (req: Request | ValidatorRequest): Promise<UserTokenType> => {
    let {login_token} = req;

    if (!login_token){
        let token_id = req.headers.authorization || req.query.token_id || "";
        token_id = token_id.replace("Bearer ", "");
        let verified;

        try{
            verified = verify(token_id, JWT_SIGNING_KEY);
        }catch (e){
            throw new Error("Invalid Token Or Token Expired.");
        }

        if (!verified){
            throw new Error("Invalid Token Or Token Expired.");
        }

        login_token = await UserToken.findOne({
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
    }

    return login_token;
};
