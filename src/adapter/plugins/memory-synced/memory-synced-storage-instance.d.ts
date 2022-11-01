import { BulkWriteRow, EventBulk, RxDocumentData, RxJsonSchema, RxStorageBulkWriteResponse, RxStorageChangeEvent, RxStorageInstance, RxStorageQueryResult, StringKeys, RxConflictResultionTask, RxConflictResultionTaskSolution, RxStorageDefaultCheckpoint } from 'rxdb';
import { RxStorageCountResult } from 'rxdb/dist/types/types';
import { Observable } from 'rxjs';
import type { RxStorageMemorySynced } from './index';
import { MemorySyncedInstanceCreationOptions, MemorySyncedStorageInternals } from './memory-synced-types';
export declare class MemorySyncedRxStorageInstance<RxDocType> implements RxStorageInstance<RxDocType, MemorySyncedStorageInternals<RxDocType>, MemorySyncedInstanceCreationOptions, RxStorageDefaultCheckpoint> {
    readonly storage: RxStorageMemorySynced;
    readonly databaseName: string;
    readonly collectionName: string;
    readonly schema: Readonly<RxJsonSchema<RxDocumentData<RxDocType>>>;
    readonly internals: MemorySyncedStorageInternals<RxDocType>;
    readonly options: Readonly<MemorySyncedInstanceCreationOptions>;
    readonly primaryPath: StringKeys<RxDocType>;
    closed: boolean;
    pendingWrites: Map<string, BulkWriteRow<RxDocType>>;
    persistingWritesQueue: Promise<any>;
    constructor(storage: RxStorageMemorySynced, databaseName: string, collectionName: string, schema: Readonly<RxJsonSchema<RxDocumentData<RxDocType>>>, internals: MemorySyncedStorageInternals<RxDocType>, options: Readonly<MemorySyncedInstanceCreationOptions>);
    bulkWrite(documentWrites: BulkWriteRow<RxDocType>[], context: string): Promise<RxStorageBulkWriteResponse<RxDocType>>;
    findDocumentsById(ids: string[], withDeleted: boolean): Promise<{
        [documentId: string]: RxDocumentData<RxDocType>;
    }>;
    query(preparedQuery: any): Promise<RxStorageQueryResult<RxDocType>>;
    count(preparedQuery: any): Promise<RxStorageCountResult>;
    getAttachmentData(documentId: string, attachmentId: string): Promise<string>;
    getChangedDocumentsSince(limit: number, checkpoint?: RxStorageDefaultCheckpoint): Promise<{
        documents: RxDocumentData<RxDocType>[];
        checkpoint: RxStorageDefaultCheckpoint;
    }>;
    changeStream(): Observable<EventBulk<RxStorageChangeEvent<RxDocumentData<RxDocType>>, RxStorageDefaultCheckpoint>>;
    cleanup(minimumDeletedTime: number): Promise<boolean>;
    close(): Promise<void>;
    remove(): Promise<void>;
    conflictResultionTasks(): Observable<RxConflictResultionTask<RxDocType>>;
    resolveConflictResultionTask(taskSolution: RxConflictResultionTaskSolution<RxDocType>): Promise<void>;
}
export declare function awaitReplicationInSync(storageInstance: MemorySyncedRxStorageInstance<any>): Promise<void>;
