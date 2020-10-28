import { Token } from '@modules/accounts/entities/tokens.entity';
import { Role } from '@modules/roles/entities/roles.entity';
export declare class User {
    readonly id: number;
    email: string;
    username: string;
    salt: string;
    hash: string;
    wasOnlineAt: Nullable<Date>;
    createdAt: Date;
    updatedAt: Date;
    tokens: Token[];
    roles: Role[];
}
