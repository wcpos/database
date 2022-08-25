import { RxStorage, RxStorageInstance, RxStorageInstanceCreationParams, RxDocumentData, RxJsonSchema, FilledMangoQuery, PreparedQuery } from 'rxdb';
import type { MemorySyncedInstanceCreationOptions, MemorySyncedStorageInternals, MemorySyncedStorageSettings } from './memory-synced-types';
export declare class RxStorageMemorySynced<RxDocType> implements RxStorage<MemorySyncedStorageInternals<RxDocType>, MemorySyncedInstanceCreationOptions> {
    settings: MemorySyncedStorageSettings;
    name: string;
    constructor(settings: MemorySyncedStorageSettings);
    statics: Readonly<{
        prepareQuery<RxDocType_1>(schema: RxJsonSchema<RxDocumentData<RxDocType_1>>, mutateableQuery: FilledMangoQuery<RxDocType_1>): any;
        getSortComparator<RxDocType_2>(schema: RxJsonSchema<RxDocumentData<RxDocType_2>>, preparedQuery: any): import("event-reduce-js").DeterministicSortComparator<RxDocType_2>;
        getQueryMatcher<RxDocType_3>(schema: RxJsonSchema<RxDocumentData<RxDocType_3>>, preparedQuery: any): import("event-reduce-js").QueryMatcher<RxDocumentData<RxDocType_3>>;
        checkpointSchema: import("rxdb").DeepReadonlyObject<import("rxdb").JsonSchema<any>>;
    }> & {
        prepareQuery: <RxDocType_4>(schema: RxJsonSchema<RxDocumentData<RxDocType_4>>, mutateableQuery: FilledMangoQuery<RxDocType_4>) => any;
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
export declare function getMemorySyncedRxStorage(settings: MemorySyncedStorageSettings): RxStorageMemorySynced<unknown>;
export * from './memory-synced-types';
export * from './memory-synced-storage-instance';
