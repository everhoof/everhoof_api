import { User } from '@modules/users/entities/users.entity';
export declare class UsersResolver {
    getCurrentUser(user: User): Promise<User>;
}
