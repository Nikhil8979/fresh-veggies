import crypto from "crypto";
import {v4 as uuidv4} from "uuid";
import {validationResult} from "express-validator";
import {error} from "./response";
const path = require("path");
import {getLoginTokenFromRequest} from "../models/UserToken";
import {Request} from "express";

export const md5 = (password:string):string => {
    return crypto.createHash("md5").update(password).digest("hex");
};

export const generateToken = (userId:number):string => {
    return  uuidv4(userId + Date.now());
};

export const validate = validations => {
    return async (req, res, next) => {
        await validations.reduce(async (promise, validation) => {
            await promise;
            return validation.run(req);
        }, Promise.resolve());

        const errors = validationResult(req);

        if (errors.isEmpty()){
            return next();
        }

        const errorsArray = errors.array();
        res.json(error(errorsArray[0].msg, errorsArray));
    };
};

export const uploadImage = async ({image, directoryPath, req}:{image:any, directoryPath:string, req:Request}) => {
    const {userId} = await getLoginTokenFromRequest(req);
    const fileName = image.md5 + userId + +new Date;
    const extension = path.extname(image.name);
    await image.mv(directoryPath + fileName + extension);
    return fileName + extension;
};

export const pagination = ({data, page, limit}:{data:any, page:number, limit:number}) => {
    if (limit && !page){
        return data.slice(0, limit);
    } else if (!limit && page){
        const offset = 10 * (page - 1);
        return data.slice(offset, offset + 10);
    } else if (limit && page){
        const offset = limit * (page - 1);
        return data.slice(offset, offset + Number(limit));
    } else {
        return data;
    }
};
