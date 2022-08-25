import { RxStorage } from 'rxdb';
export * from './rx-storage-instance-sharding';
import type { RxStorageShardingIOnstanceCreationOptions, RxStorageShardingSettings, ShardingStorageInternals } from './sharding-types';
export declare function getRxStorageSharding<ParentRxStorageInstanceCreationOptions>(settings: RxStorageShardingSettings): RxStorage<ShardingStorageInternals, RxStorageShardingIOnstanceCreationOptions>;
