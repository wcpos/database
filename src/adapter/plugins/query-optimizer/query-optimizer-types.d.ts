import type { MangoQuery, RxJsonSchema, RxStorage } from 'rxdb';
export type FindBestIndexInput<RxDocType, InstanceCreationOptions> = {
    storage: RxStorage<any, InstanceCreationOptions>;
    schema: RxJsonSchema<RxDocType>;
    /**
     * To run faster, we can optimize
     * multiple queries at one call.
     */
    queries: {
        [id: string]: MangoQuery<RxDocType>;
    };
    testData: RxDocType[];
    runs: number;
    /**
     * If a query uses more fields then maxFieldsPerIndex,
     * we only test indexes that contain less or equal then maxFieldsPerIndex fields.
     * [default=4]
     */
    maxFieldsPerIndex?: number;
    instanceCreationOptions?: InstanceCreationOptions;
};
export type IndexTimeMeasurement = {
    index: string[];
    /**
     * Lower is better
     */
    time: number;
};
export type FindBestIndexOutput<RxDocType> = {
    queries: {
        [queryId: string]: {
            query: MangoQuery<RxDocType>;
            bestIndex: IndexTimeMeasurement;
            allIndexes: IndexTimeMeasurement[];
        };
    };
    indexesInSchema: string[][];
};
