import { MangoQuery, RxDocumentData, RxJsonSchema } from 'rxdb';
import type { IndexTimeMeasurement } from './query-optimizer-types';
export declare function getFieldsOfQuery<RxDocType>(schema: RxJsonSchema<RxDocumentData<RxDocType>>, query: MangoQuery<RxDocType>): Set<string>;
export declare function averageOfTimeValues(times: number[], 
/**
 * To better account for anomalies
 * during time measurements,
 * we strip the heighest x percent.
 */
stripHeighestXPercent: number): number;
export declare function sortIndexTimes(indexTimes: IndexTimeMeasurement[]): IndexTimeMeasurement[];
