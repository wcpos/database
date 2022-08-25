import type { RxStorage, RxStorageInstance, FilledMangoQuery } from 'rxdb';
export declare type RxStorageShardingSettings = {
    /**
     * The parent RxStorage implementation.
     */
    storage: RxStorage<any, any>;
};
export declare type RxStorageShardingIOnstanceCreationOptions = {
    /**
     * The instance creation options
     * that will be passed to the original RxStorage,
     * when creating the shards.
     */
    parentOptions: any;
};
export declare type ShardingStorageInternals = {
    shardInstances: RxStorageInstance<any, any, any>[];
};
export declare type ShardingPreparedQuery<RxDocType> = {
    originalQuery: FilledMangoQuery<RxDocType>;
    parentPreparedQuery: any;
};
/**
 * Containts the checkpoints of all shards
 * in the correct shard index order.
 * Indexed by the shardId
 */
export declare type ShardingChangesCheckpoint = {
    [shardId: number]: any;
};
