import type { RxStorage, RxStorageInstance, FilledMangoQuery } from 'rxdb';
export type RxStorageShardingSettings = {
    /**
     * The parent RxStorage implementation.
     */
    storage: RxStorage<any, any>;
};
export type RxStorageShardingIOnstanceCreationOptions = {
    /**
     * The instance creation options
     * that will be passed to the original RxStorage,
     * when creating the shards.
     */
    parentOptions: any;
};
export type ShardingStorageInternals = {
    shardInstances: RxStorageInstance<any, any, any>[];
};
export type ShardingPreparedQuery<RxDocType> = {
    originalQuery: FilledMangoQuery<RxDocType>;
    parentPreparedQuery: any;
};
/**
 * Containts the checkpoints of all shards
 * in the correct shard index order.
 * Indexed by the shardId
 */
export type ShardingChangesCheckpoint = {
    [shardId: number]: any;
};
