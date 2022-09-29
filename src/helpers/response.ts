import {NextFunction, Request, RequestHandler, Response} from "express";

export interface RestApiResponse<T> {
    data?: T,
    type?: "error" | "success",
    message?: string,
    errors?: any[]
}

export function success<T = any> (message: string, data: T = null): RestApiResponse<T>{
    return {
        data,
        type: "success",
        message
    };
}

export function error<T = "any"> (message: string, data: T = null): RestApiResponse<T>{
    return {
        data,
        type: "error",
        message
    };
}

export const wrapRequestHandler = (fn) => (req, res, next) => fn(req, res, next).catch(next);
