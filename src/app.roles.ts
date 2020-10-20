import { RolesBuilder } from 'nest-access-control';

export enum AppRoles {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export const roles: RolesBuilder = new RolesBuilder();

roles.grant(AppRoles.USER);
