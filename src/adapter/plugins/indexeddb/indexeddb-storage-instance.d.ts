import { BulkWriteRow, EventBulk, RxConflictResultionTask, RxConflictResultionTaskSolution, RxDocumentData, RxJsonSchema, RxStorageBulkWriteResponse, RxStorageChangeEvent, RxStorageDefaultCheckpoint, RxStorageInstance, RxStorageInstanceCreationParams, RxStorageQueryResult, StringKeys } from 'rxdb';
import { Observable } from 'rxjs';
import type { RxStorageIndexedDB } from '.';
import type { IndexedDBChangesCheckpoint, IndexedDBInstanceCreationOptions, IndexedDBPreparedQuery, IndexedDBStorageInternals, IndexedDBStorageSettings } from './indexeddb-types';
export declare class RxStorageInstanceIndexedDB<RxDocType> implements RxStorageInstance<RxDocType, IndexedDBStorageInternals, IndexedDBInstanceCreationOptions, RxStorageDefaultCheckpoint> {
    readonly storage: RxStorageIndexedDB;
    readonly databaseName: string;
    readonly collectionName: string;
    readonly schema: Readonly<RxJsonSchema<RxDocumentData<RxDocType>>>;
    readonly internals: IndexedDBStorageInternals;
    readonly options: Readonly<IndexedDBInstanceCreationOptions>;
    readonly settings: IndexedDBStorageSettings;
    readonly primaryPath: StringKeys<RxDocType>;
    private changes$;
    readonly instanceId: number;
    closed: boolean;
    constructor(storage: RxStorageIndexedDB, databaseName: string, collectionName: string, schema: Readonly<RxJsonSchema<RxDocumentData<RxDocType>>>, internals: IndexedDBStorageInternals, options: Readonly<IndexedDBInstanceCreationOptions>, settings: IndexedDBStorageSettings);
    bulkWrite(documentWrites: BulkWriteRow<RxDocType>[], context: string): Promise<RxStorageBulkWriteResponse<RxDocType>>;
    findDocumentsById(docIds: string[], withDeleted: boolean): Promise<{
        [documentId: string]: RxDocumentData<RxDocType>;
    }>;
    query(preparedQuery: IndexedDBPreparedQuery<RxDocType>): Promise<RxStorageQueryResult<RxDocType>>;
    getChangedDocumentsSince(limit: number, checkpoint?: IndexedDBChangesCheckpoint): Promise<{
        documents: RxDocumentData<RxDocType>[];
        checkpoint: IndexedDBChangesCheckpoint;
    }>;
    changeStream(): Observable<EventBulk<RxStorageChangeEvent<RxDocumentData<RxDocType>>, RxStorageDefaultCheckpoint>>;
    cleanup(minimumDeletedTime: number): Promise<boolean>;
    remove(): Promise<void>;
    getAttachmentData(documentId: string, attachmentId: string): Promise<string>;
    close(): Promise<void>;
    conflictResultionTasks(): Observable<RxConflictResultionTask<RxDocType>>;
    resolveConflictResultionTask(taskSolution: RxConflictResultionTaskSolution<RxDocType>): Promise<void>;
}
export declare function createIndexedDBStorageInstance<RxDocType>(storage: RxStorageIndexedDB, params: RxStorageInstanceCreationParams<RxDocType, IndexedDBInstanceCreationOptions>, settings: IndexedDBStorageSettings): Promise<RxStorageInstanceIndexedDB<RxDocType>>;
