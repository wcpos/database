import { RxStorageStatics } from 'rxdb';
import { RxStorageRemote, RxStorageRemoteSettings } from 'rxdb/plugins/storage-remote';
declare type RxStorageWorkerSettings = {
    statics: RxStorageStatics;
    /**
     * Any input that can be passed into 'new Worker()',
     * like 'path/to/worker.js'
     */
    workerInput: string | any;
};
export type RxStorageWorker = RxStorageRemote;
export declare function getRxStorageSharedWorker(settings: RxStorageWorkerSettings): RxStorageWorker;
export declare function getWorkerStateByInput(workerInput: RxStorageWorkerSettings['workerInput']): RxStorageRemoteSettings;
export {};
