import { Repository } from 'typeorm';
export declare class BasicRepository<T> extends Repository<T & {
    id: number;
}> {
    saveAndReturn(entity: (T & {
        id: number;
    }) | undefined): Promise<T & {
        id: number;
    }>;
    isExist(id: number): Promise<T>;
}
