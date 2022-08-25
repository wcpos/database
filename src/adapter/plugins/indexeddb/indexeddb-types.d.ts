import type { RxJsonSchema } from 'rxdb';
import type { DexiePreparedQuery } from 'rxdb/dist/types/types';
import type { RxStorageIndexedDB } from '.';
/**
 * @link https://developer.mozilla.org/en-US/docs/Web/API/IDBTransaction/durability
 * @default 'relaxed'
 */
export declare type IndexedDBTransactionDurability = 'strict' | 'relaxed' | 'default';
export declare type IndexedDBStorageSettings = {
    /**
     * By default, the window.indexedDB will be used,
     * but in Node.js or for testing, the used IndexeDB can be overwritten.
     */
    indexedDB: IDBFactory;
    IDBKeyRange: IDBKeyRange;
    transactionDurability: IndexedDBTransactionDurability;
    /**
     * When the runtime supports the getAll() method,
     * queries will have improved performance because of the batched cursor.
     * For better query performance you can try to increase/decrease the performance.
     * [default=50]
     */
    batchSize: number;
};
export declare type IndexedDBInstanceCreationOptions = {};
export declare type IndexedDBPreparedQuery<DocType> = DexiePreparedQuery<DocType>;
export declare type IndexedDBStoreMeta = {
    collectionName: string;
    schema: RxJsonSchema<any>;
};
export declare type IndexedDBState = {
    debugId: number;
    closed: boolean;
    storage: RxStorageIndexedDB;
    settings: IndexedDBStorageSettings;
    name: string;
    refreshIDBDatabase: () => Promise<any>;
    /**
     * Resolved when the creation process has finished
     * and the database can be used.
     *
     * This promise might be swapped out by the database-opener
     * because we might have to recreate the IndexedDB instance
     * when another tab changes the version.
     *
     * Always await the creationPromise to get the IDBDatabase,
     * do not keep a reference to the IDBDatabase somewhere.
     */
    creationPromise: Promise<IDBDatabase>;
    /**
     * Amount of instances of RxStorageIndexedDB
     * that currently use that state.
     * If it gets zero, we can close the database.
     */
    refCount: number;
    /**
     * Creating multiple stores
     * if much faster when done in a single transaction.
     * @link http://nparashuram.com/IndexedDB/perf/#Objectstore%20per%20transaction
     * So instead of directly opening a store,
     * we set openStores to an array so other calls to openStore()
     * can also throw their store into it and await the promise.
     */
    storesToOpen: IndexedDBStoreMeta[];
};
export declare type IndexedDBStoreNames = {
    documentStore: string;
    attachmentsStore: string;
};
export declare type IndexedDBStorageInternals = {
    state: IndexedDBState;
    storeNames: IndexedDBStoreNames;
    getIndexableStringByIndexName: {
        [k: string]: (docData: any) => string;
    };
};
export declare type IndexedDBChangesCheckpoint = {
    id: string;
    lwt: number;
};
