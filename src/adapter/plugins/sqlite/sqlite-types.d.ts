import type { MangoQuery, RxDocumentData, RxJsonSchema } from 'rxdb';
/**
 * Adding '@types/sqlite3' to the dependencies
 * causes many errors on npm install,
 * even if the users uses another SQLite implementation.
 * Therefore we just use the any type instead the one imported from 'sqlite3';
 */
export declare type Sqlite3Type = any;
export declare type SQLiteDatabaseClass = any;
export declare type SQLiteBasics<SQLiteDatabaseType> = {
    /**
     * Opens a new database connection
     */
    open: (name: string) => Promise<SQLiteDatabaseType>;
    /**
     * Returns the query result rows
     */
    all(db: SQLiteDatabaseType, queryWithParams: SQLiteQueryWithParams): Promise<any[]>;
    /**
     * Run a query. Return nothing.
     */
    run(db: SQLiteDatabaseType, queryWithParams: SQLiteQueryWithParams): Promise<void>;
    close(db: SQLiteDatabaseType): Promise<void>;
    /**
     * [default=WAL2]
     * If empty string is given, the journalMode will be left untouched.
     * For example android has WAL as default, so we do not want to touch that setting.
     */
    journalMode: 'WAL' | 'WAL2' | 'DELETE' | 'TRUNCATE' | 'PERSIST' | 'MEMORY' | 'OFF' | '';
};
export declare type SQLiteStorageSettings = {
    sqliteBasics: SQLiteBasics<any>;
};
export declare type SQLiteInstanceCreationOptions = {};
export declare type SQLiteInternals = {
    database: SQLiteDatabaseClass;
};
export declare type SQLitePreparedQuery<RxDocType> = {
    schema: RxJsonSchema<RxDocumentData<RxDocType>>;
    mangoQuery: MangoQuery<RxDocType>;
    /**
     * Contains the sql query,
     * But only from the where clause.
     * This ensures we can reuse the prepared query
     * no mather what the name of the table is.
     * Looks like 'WHERE .... SORT BY ...'.
     */
    sqlQuery: SQLiteQueryWithParams;
};
export declare type SQLiteQueryWithParams = {
    query: string;
    /**
     * Some SQLite version allow to use named params like $docId
     * and then putting an object in here.
     * But because not all environments support that,
     * we have to use plain array params that use the '?' placeholder in the query string.
     */
    params: any[];
};
export declare type SQLiteChangesCheckpoint = {
    id: string;
    lwt: number;
};
