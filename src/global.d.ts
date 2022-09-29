declare namespace Express {
    export interface Request {
        login_token?: import("./models/UserToken").UserTokenType
    }
}
