import { RolesBuilder } from 'nest-access-control';
export declare enum AppRoles {
    ADMIN = "ADMIN",
    USER = "USER"
}
export declare const roles: RolesBuilder;
