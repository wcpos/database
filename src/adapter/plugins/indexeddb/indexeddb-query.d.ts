import { RxDocumentData, RxStorageQueryResult } from 'rxdb';
import { RxStorageInstanceIndexedDB } from './indexeddb-storage-instance';
import type { IndexedDBPreparedQuery } from './indexeddb-types';
export declare function queryIndexedDB<RxDocType>(instance: RxStorageInstanceIndexedDB<RxDocType>, preparedQuery: IndexedDBPreparedQuery<RxDocType>): Promise<RxStorageQueryResult<RxDocType>>;
export declare function runBatchedCursor<RxDocType>(instance: RxStorageInstanceIndexedDB<RxDocType>, storeIndex: IDBIndex, batchSize: number, lowerBoundString: string, upperBoundString: string, index: string[], 
/**
 * Returns true if cursor should continue,
 * false if it can exit.
 */
onBatch: (docs: RxDocumentData<RxDocType>[]) => boolean): Promise<void>;
