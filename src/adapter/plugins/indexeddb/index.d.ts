/**
 * Relevant links for IndexedDB performance:
 * @link https://nolanlawson.com/2021/08/22/speeding-up-indexeddb-reads-and-writes/
 * @link http://blog.nparashuram.com/2013/04/indexeddb-performance-comparisons-part-2.html
 */
import { RxStorage, RxStorageInstanceCreationParams, RxStorageStatics } from 'rxdb';
import { RxStorageInstanceIndexedDB } from './indexeddb-storage-instance';
import type { IndexedDBInstanceCreationOptions, IndexedDBState, IndexedDBStorageInternals, IndexedDBStorageSettings } from './indexeddb-types';
export * from './indexeddb-helpers';
export * from './indexeddb-types';
export * from './indexeddb-storage-instance';
export declare class RxStorageIndexedDB implements RxStorage<IndexedDBStorageInternals, IndexedDBInstanceCreationOptions> {
    settings: IndexedDBStorageSettings;
    name: string;
    statics: RxStorageStatics;
    /**
     * Because we likely have to create many RxStorageInstances on the same IndexedDB database,
     * we cache the database connection to save performance.
     *
     * But to be able to simulate the multi-tab behavior, we cache by the given instance of the RxStorage object.
     */
    readonly indexedDBStates: Map<string, IndexedDBState>;
    constructor(settings: IndexedDBStorageSettings);
    createStorageInstance<RxDocType>(params: RxStorageInstanceCreationParams<RxDocType, IndexedDBInstanceCreationOptions>): Promise<RxStorageInstanceIndexedDB<RxDocType>>;
}
export declare function getRxStorageIndexedDB(settings?: Partial<IndexedDBStorageSettings>): RxStorageIndexedDB;
