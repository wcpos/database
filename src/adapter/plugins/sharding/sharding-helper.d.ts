import { RxStorageInstance } from 'rxdb';
/**
 * Returns the index of the shard
 * which the given primaryKey value
 * is assigned to.
 */
export declare function getShardIndex(shardInstances: RxStorageInstance<any, any, any>[], documentId: string): number;
export declare function hashStringToNumber(str: string): number;
