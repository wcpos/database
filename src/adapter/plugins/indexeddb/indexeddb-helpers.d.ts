import { RxJsonSchema } from 'rxdb';
import type { RxStorageIndexedDB } from '.';
import type { IndexedDBState, IndexedDBStorageSettings, IndexedDBStoreMeta, IndexedDBStoreNames } from './indexeddb-types';
export declare const INDEXEDDB_DOCS_STORE_SUFFIX = "documents";
export declare const INDEXEDDB_DOCS_STORE_ATTACHMENTS_SUFFIX = "attachments";
export declare const TRANSACTION_SETTINGS: {
    durability: string;
};
export declare const RX_STORAGE_NAME_INDEXEDDB = "indexeddb";
export declare function attachmentObjectId(documentId: string, attachmentId: string): string;
export declare function getIndexedDBState(storage: RxStorageIndexedDB, settings: IndexedDBStorageSettings, databaseName: string, 
/**
 * we will directly add the stores when opening the database
 * because adding them afterwards is expensive.
 */
stores: IndexedDBStoreMeta[]): Promise<IndexedDBState>;
export declare function getDatabaseAddStoresCount(): number;
export declare function openStoresOnExistingDatabase(indexedDBState: IndexedDBState): Promise<any>;
export declare function getStoreNamesForStorageInstance(collectionName: string, schema: RxJsonSchema<any>): IndexedDBStoreNames;
/**
 * Runs inside of the onupdateneeded handler of IndexedDB.
 * Must not be async!
 */
export declare function addStoresDuringOnUpgradeNeeded(indexedDBState: IndexedDBState, openRequest: IDBOpenDBRequest): void;
export declare function closeIndexedDBDatabase(indexedDBState: IndexedDBState): Promise<void>;
