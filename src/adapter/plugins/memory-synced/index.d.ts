import { RxStorage, RxStorageInstance, RxStorageInstanceCreationParams, RxDocumentData, RxJsonSchema, FilledMangoQuery, PreparedQuery } from 'rxdb';
import type { MemorySyncedInstanceCreationOptions, MemorySyncedStorageInternals, MemorySyncedStorageSettings } from './memory-synced-types';
export declare class RxStorageMemorySynced implements RxStorage<MemorySyncedStorageInternals<any>, MemorySyncedInstanceCreationOptions> {
    settings: MemorySyncedStorageSettings;
    name: string;
    constructor(settings: MemorySyncedStorageSettings);
    statics: Readonly<{
        prepareQuery<RxDocType>(schema: RxJsonSchema<RxDocumentData<RxDocType>>, mutateableQuery: FilledMangoQuery<RxDocType>): any;
        getSortComparator<RxDocType_1>(schema: RxJsonSchema<RxDocumentData<RxDocType_1>>, preparedQuery: any): import("event-reduce-js").DeterministicSortComparator<RxDocType_1>;
        getQueryMatcher<RxDocType_2>(schema: RxJsonSchema<RxDocumentData<RxDocType_2>>, preparedQuery: any): import("event-reduce-js").QueryMatcher<RxDocumentData<RxDocType_2>>;
        checkpointSchema: import("rxdb").DeepReadonlyObject<import("rxdb").JsonSchema<any>>;
    }> & {
        prepareQuery: <RxDocType_3>(schema: RxJsonSchema<RxDocumentData<RxDocType_3>>, mutateableQuery: FilledMangoQuery<RxDocType_3>) => any;
    };
    /**
     * Contains the databaseInstanceToken of each database
     * that was created for the first time.
     * This can be used to improve initial page load because on newly (for the first time ever)
     * created storage instances we do not have to await the creation of the master instance
     * or the initial sync.
     * [databaseInstanceToken]->Set<[already created collection names]>;
     */
    readonly firstInstanceTokens: {
        [databaseInstanceToken: string]: Set<string>;
    };
    createStorageInstance<RxDocType>(params: RxStorageInstanceCreationParams<RxDocType, MemorySyncedInstanceCreationOptions>): Promise<RxStorageInstance<RxDocType, MemorySyncedStorageInternals<any>, MemorySyncedInstanceCreationOptions>>;
}
export declare function getMemorySyncedRxStorage(settings: MemorySyncedStorageSettings): RxStorageMemorySynced;
export * from './memory-synced-types';
export * from './memory-synced-storage-instance';
