import { RxDocumentData, RxJsonSchema } from 'rxdb';
export declare const INDEXEDDB_CUSTOM_INDEX_FIELD_PREFIX = "rxdb_custom_index_";
/**
 * The index name is also the field-name.
 * The index name must always be a IndexdDB compatible fieldname.
 * It must not contain dots, because IndexedDB treats them different
 * then expected.
 */
export declare function getIndexName(index: string[]): string;
export declare function normalizeIndexedDBIndex(schema: RxJsonSchema<any>, index: string[] | readonly string[] | string): string[];
export declare function getIndexedDBIndexesFromSchema(schema: RxJsonSchema<any>): string[][];
export declare const INDEXEDDB_DEFAULT_INDEX_SETITNGS: any;
export declare function createIndexesOnStore(store: IDBObjectStore, schema: RxJsonSchema<any>): void;
export declare function enhanceDocDataWithCustomIndexes<RxDocType>(getIndexableStringByIndexName: {
    [k: string]: (docData: any) => string;
}, docData: RxDocumentData<RxDocType>): RxDocumentData<RxDocType>;
export declare function stripCustomIndexesFromDocData<RxDocType>(docData: RxDocumentData<RxDocType>): RxDocumentData<RxDocType>;
/**
 * Do never mutate this array!
 */
export declare const CLEANUP_INDEX: string[];
export declare function getIndexableStringByIndexName<RxDocType>(schema: RxJsonSchema<RxDocumentData<RxDocType>>): {
    [k: string]: (docData: any) => string;
};
