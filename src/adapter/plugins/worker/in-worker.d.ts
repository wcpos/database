import { RxStorage } from 'rxdb';
export declare function exposeSharedWorkerRxStorage<T = any, D = any, CheckpointType = any>(args: {
    storage: RxStorage<T, D>;
}): void;
