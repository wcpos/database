import { RxDatabase, RxCollection, BulkWriteRow, RxStorageBulkWriteResponse } from 'rxdb';
import { RxStorage as RxStorageOld } from 'rxdb-old';
export declare type AfterMigrateBatchHandlerInput = {
    databaseName: string;
    collectionName: string;
    oldDatabaseName: string;
    insertToNewWriteRows: BulkWriteRow<any>[];
    writeToNewResult: RxStorageBulkWriteResponse<any>;
};
export declare type AfterMigrateBatchHandler = (input: AfterMigrateBatchHandlerInput) => any | Promise<any>;
/**
 * Migrates collections of RxDB version 11 and puts them
 * into a RxDatabase that is created with version 12.
 */
export declare function migrateStorage(database: RxDatabase, 
/**
 * Using the migration plugin requires you
 * to rename your new old database.
 * The original name of the v11 database must be provided here.
 */
oldDatabaseName: string, oldStorage: RxStorageOld<any, any>, batchSize?: number, afterMigrateBatch?: AfterMigrateBatchHandler): Promise<void>;
export declare function migrateCollection<RxDocType>(collection: RxCollection<RxDocType>, oldDatabaseName: string, oldStorage: RxStorageOld<any, any>, batchSize: number, afterMigrateBatch?: AfterMigrateBatchHandler): Promise<void>;
