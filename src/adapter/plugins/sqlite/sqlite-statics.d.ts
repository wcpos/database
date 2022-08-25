import { MangoQuerySelector, MangoQuerySortPart, RxStorageStatics } from 'rxdb';
/**
 * Most of the methods are used from the Dexie.js based RxStorage
 * which uses the mingo library as query matcher/sorter.
 */
export declare const RxStorageSQLiteStatics: RxStorageStatics;
export declare function mangoQuerySelectorToSQL(selector: MangoQuerySelector<any>, mutableParams: any[], prePath?: string): string;
export declare function mangoQuerySortToSQL(sorting: MangoQuerySortPart<any>[]): string;
