import {ADMIN_APP} from "../constant";

export interface AppType {
    roles: string[],
    permissions: string[],
    title: string,
    name: string,
    assetsDirectory?: string,
    context?: string,
    permissionsTitle?: string
}

export const apps: AppType[] = [
    {
        context: "admin",
        name: ADMIN_APP,
        roles: [],
        permissions: [],
        title: "Admin",
        assetsDirectory: "admin",

    }
];
