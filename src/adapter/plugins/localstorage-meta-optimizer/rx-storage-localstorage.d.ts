import { BulkWriteRow, ById, EventBulk, RxDocumentData, RxJsonSchema, RxStorage, RxStorageBulkWriteResponse, RxStorageChangeEvent, RxStorageDefaultCheckpoint, RxStorageInstance, RxStorageInstanceCreationParams, RxStorageQueryResult, RxStorageStatics, StringKeys, RxConflictResultionTask, RxConflictResultionTaskSolution, DexiePreparedQuery } from 'rxdb';
import { Observable } from 'rxjs';
export declare const RX_STORAGE_NAME_LOCALSTORAGE = "localstorage";
export declare type LocalstorageStorageInternals<RxDocType = any> = {
    docsById: ById<RxDocumentData<RxDocType>>;
};
export declare type LocalstorageInstanceCreationOptions = {};
export declare type LocalstorageStorageSettings = {};
export declare type LocalstoragePreparedQuery<DocType> = DexiePreparedQuery<DocType>;
export declare type ChangeStreamStoredData<RxDocType> = {
    databaseInstanceToken: string;
    eventBulk: EventBulk<RxStorageChangeEvent<RxDocumentData<RxDocType>>, any>;
};
export declare class RxStorageLocalstorage implements RxStorage<LocalstorageStorageInternals, LocalstorageInstanceCreationOptions> {
    settings: LocalstorageStorageSettings;
    name: string;
    statics: RxStorageStatics;
    constructor(settings: LocalstorageStorageSettings);
    createStorageInstance<RxDocType>(params: RxStorageInstanceCreationParams<RxDocType, LocalstorageInstanceCreationOptions>): Promise<RxStorageInstanceLocalstorage<RxDocType>>;
}
export declare function getRxStorageLocalstorage(settings?: Partial<LocalstorageStorageSettings>): RxStorageLocalstorage;
export declare function getStorageEventStream(): Observable<{
    key: string;
    newValue: string | null;
    databaseInstanceToken?: string | undefined;
}>;
export declare class RxStorageInstanceLocalstorage<RxDocType> implements RxStorageInstance<RxDocType, LocalstorageStorageInternals, LocalstorageInstanceCreationOptions, RxStorageDefaultCheckpoint> {
    readonly storage: RxStorageLocalstorage;
    readonly databaseName: string;
    readonly collectionName: string;
    readonly schema: Readonly<RxJsonSchema<RxDocumentData<RxDocType>>>;
    readonly internals: LocalstorageStorageInternals;
    readonly options: Readonly<LocalstorageInstanceCreationOptions>;
    readonly settings: LocalstorageStorageSettings;
    readonly databaseInstanceToken: string;
    readonly primaryPath: StringKeys<RxDocType>;
    /**
     * Under this key the whole state
     * will be stored as stringified json
     * inside of the localstorage.
     */
    readonly storageKey: string;
    readonly changestreamStorageKey: string;
    private changeStreamSub;
    private changes$;
    closed: boolean;
    constructor(storage: RxStorageLocalstorage, databaseName: string, collectionName: string, schema: Readonly<RxJsonSchema<RxDocumentData<RxDocType>>>, internals: LocalstorageStorageInternals, options: Readonly<LocalstorageInstanceCreationOptions>, settings: LocalstorageStorageSettings, databaseInstanceToken: string);
    bulkWrite(documentWrites: BulkWriteRow<RxDocType>[], context: string): Promise<RxStorageBulkWriteResponse<RxDocType>>;
    findDocumentsById(docIds: string[], withDeleted: boolean): Promise<{
        [documentId: string]: RxDocumentData<RxDocType>;
    }>;
    query(preparedQuery: LocalstoragePreparedQuery<RxDocType>): Promise<RxStorageQueryResult<RxDocType>>;
    getChangedDocumentsSince(limit: number, checkpoint?: RxStorageDefaultCheckpoint): Promise<{
        documents: RxDocumentData<RxDocType>[];
        checkpoint: RxStorageDefaultCheckpoint;
    }>;
    changeStream(): Observable<EventBulk<RxStorageChangeEvent<RxDocumentData<RxDocType>>, RxStorageDefaultCheckpoint>>;
    cleanup(minimumDeletedTime: number): Promise<boolean>;
    getAttachmentData(_documentId: string, _attachmentId: string): Promise<string>;
    remove(): Promise<void>;
    close(): Promise<void>;
    conflictResultionTasks(): Observable<RxConflictResultionTask<RxDocType>>;
    resolveConflictResultionTask(taskSolution: RxConflictResultionTaskSolution<RxDocType>): Promise<void>;
}
export declare function localstoragePersist(storageInstance: RxStorageInstanceLocalstorage<any>): void;
export declare function createLocalstorageStorageInstance<RxDocType>(storage: RxStorageLocalstorage, params: RxStorageInstanceCreationParams<RxDocType, LocalstorageInstanceCreationOptions>, settings: LocalstorageStorageSettings): Promise<RxStorageInstanceLocalstorage<RxDocType>>;
export declare function getStorageState<RxDocType>(storageKey: string): ById<RxDocumentData<RxDocType>>;
