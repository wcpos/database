import { FilledMangoQuery, PreparedQuery, RxDocumentData, RxJsonSchema, RxStorage, RxStorageInstance, RxStorageInstanceCreationParams } from 'rxdb';
export declare type LocalstorageMetaOptimizerRxStorageSettings = {
    storage: RxStorage<any, any>;
};
export declare function getLocalstorageMetaOptimizerRxStorage(settings: LocalstorageMetaOptimizerRxStorageSettings): RxStorageLocalstorageMetaOptimized;
export declare class RxStorageLocalstorageMetaOptimized implements RxStorage<any, any> {
    settings: LocalstorageMetaOptimizerRxStorageSettings;
    name: string;
    constructor(settings: LocalstorageMetaOptimizerRxStorageSettings);
    statics: Readonly<{
        prepareQuery<RxDocType>(schema: RxJsonSchema<RxDocumentData<RxDocType>>, mutateableQuery: FilledMangoQuery<RxDocType>): any;
        getSortComparator<RxDocType_1>(schema: RxJsonSchema<RxDocumentData<RxDocType_1>>, preparedQuery: any): import("event-reduce-js").DeterministicSortComparator<RxDocType_1>;
        getQueryMatcher<RxDocType_2>(schema: RxJsonSchema<RxDocumentData<RxDocType_2>>, preparedQuery: any): import("event-reduce-js").QueryMatcher<RxDocumentData<RxDocType_2>>;
        checkpointSchema: import("rxdb").DeepReadonlyObject<import("rxdb").JsonSchema<any>>;
    }> & {
        prepareQuery: <RxDocType_3>(schema: RxJsonSchema<RxDocumentData<RxDocType_3>>, mutateableQuery: FilledMangoQuery<RxDocType_3>) => any;
    };
    createStorageInstance<RxDocType>(params: RxStorageInstanceCreationParams<RxDocType, any>): Promise<RxStorageInstance<RxDocType, any, any>>;
}
