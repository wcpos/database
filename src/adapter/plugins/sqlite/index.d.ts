import { RxStorage, RxStorageInstanceCreationParams, RxStorageStatics } from 'rxdb';
import { RxStorageInstanceSQLite } from './sqlite-storage-instance';
import type { SQLiteInternals, SQLiteInstanceCreationOptions, SQLiteStorageSettings } from './sqlite-types';
export * from './sqlite-statics';
export * from './sqlite-helpers';
export * from './sqlite-types';
export * from './sqlite-storage-instance';
export * from './sqlite-basics-helpers';
export declare class RxStorageSQLite implements RxStorage<SQLiteInternals, SQLiteInstanceCreationOptions> {
    settings: SQLiteStorageSettings;
    name: string;
    statics: RxStorageStatics;
    constructor(settings: SQLiteStorageSettings);
    createStorageInstance<RxDocType>(params: RxStorageInstanceCreationParams<RxDocType, SQLiteInstanceCreationOptions>): Promise<RxStorageInstanceSQLite<RxDocType>>;
}
export declare function getRxStorageSQLite(settings: SQLiteStorageSettings): RxStorageSQLite;
