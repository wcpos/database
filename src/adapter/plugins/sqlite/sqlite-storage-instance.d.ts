import { RxJsonSchema, RxStorageInstanceCreationParams, RxStorageInstance, EventBulk, RxStorageChangeEvent, RxDocumentData, BulkWriteRow, RxStorageBulkWriteResponse, RxStorageQueryResult, StringKeys, RxConflictResultionTask, RxConflictResultionTaskSolution, RxStorageDefaultCheckpoint } from 'rxdb';
import { RxStorageCountResult } from 'rxdb/dist/types/types';
import { Observable } from 'rxjs';
import type { RxStorageSQLite } from './';
import type { SQLiteBasics, SQLiteChangesCheckpoint, SQLiteInstanceCreationOptions, SQLiteInternals, SQLitePreparedQuery, SQLiteStorageSettings } from './sqlite-types';
export declare class RxStorageInstanceSQLite<RxDocType> implements RxStorageInstance<RxDocType, SQLiteInternals, SQLiteInstanceCreationOptions, RxStorageDefaultCheckpoint> {
    readonly storage: RxStorageSQLite;
    readonly databaseName: string;
    readonly collectionName: string;
    readonly schema: Readonly<RxJsonSchema<RxDocumentData<RxDocType>>>;
    readonly internals: SQLiteInternals;
    readonly options: Readonly<SQLiteInstanceCreationOptions>;
    readonly settings: SQLiteStorageSettings;
    readonly primaryPath: StringKeys<RxDocType>;
    private changes$;
    readonly instanceId: number;
    closed: boolean;
    sqliteBasics: SQLiteBasics<any>;
    constructor(storage: RxStorageSQLite, databaseName: string, collectionName: string, schema: Readonly<RxJsonSchema<RxDocumentData<RxDocType>>>, internals: SQLiteInternals, options: Readonly<SQLiteInstanceCreationOptions>, settings: SQLiteStorageSettings);
    /**
     * @link https://medium.com/@JasonWyatt/squeezing-performance-from-sqlite-insertions-971aff98eef2
     */
    bulkWrite(documentWrites: BulkWriteRow<RxDocType>[], context: string): Promise<RxStorageBulkWriteResponse<RxDocType>>;
    query(preparedQuery: SQLitePreparedQuery<RxDocType>): Promise<RxStorageQueryResult<RxDocType>>;
    count(preparedQuery: SQLitePreparedQuery<RxDocType>): Promise<RxStorageCountResult>;
    findDocumentsById(ids: string[], withDeleted: boolean): Promise<{
        [documentId: string]: RxDocumentData<RxDocType>;
    }>;
    getChangedDocumentsSince(limit: number, checkpoint?: SQLiteChangesCheckpoint): Promise<{
        documents: RxDocumentData<RxDocType>[];
        checkpoint: SQLiteChangesCheckpoint;
    }>;
    changeStream(): Observable<EventBulk<RxStorageChangeEvent<RxDocumentData<RxDocType>>, RxStorageDefaultCheckpoint>>;
    cleanup(minimumDeletedTime: number): Promise<boolean>;
    remove(): Promise<void>;
    getAttachmentData(documentId: string, attachmentId: string): Promise<string>;
    close(): Promise<void>;
    conflictResultionTasks(): Observable<RxConflictResultionTask<RxDocType>>;
    resolveConflictResultionTask(taskSolution: RxConflictResultionTaskSolution<RxDocType>): Promise<void>;
}
export declare function createSQLiteStorageInstance<RxDocType>(storage: RxStorageSQLite, params: RxStorageInstanceCreationParams<RxDocType, SQLiteInstanceCreationOptions>, settings: SQLiteStorageSettings): Promise<RxStorageInstanceSQLite<RxDocType>>;
