export interface UserType {
    id?: number,
    name: string,
    email: string,
    mobile: string,
    password: string,
    status: boolean
}
export interface UserTokenType {
    id?: number,
    userId: number,
    token: string,
    type: string,
    jwt?:string,
    user?: UserType;
}
