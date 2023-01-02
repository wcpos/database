import type { MangoQuery, RxDocumentData, RxJsonSchema } from 'rxdb';
/**
 * Adding '@types/sqlite3' to the dependencies
 * causes many errors on npm install,
 * even if the users uses another SQLite implementation.
 * Therefore we just use the any type instead the one imported from 'sqlite3';
 */
export type Sqlite3Type = any;
export type SQLiteDatabaseClass = any;
export type SQLiteBasics<SQLiteDatabaseType> = {
    /**
     * Opens a new database connection
     */
    open: (name: string) => Promise<SQLiteDatabaseType>;
    /**
     * Returns the query result rows
     */
    all(db: SQLiteDatabaseType, queryWithParams: SQLiteQueryWithParams): Promise<{
        id: string;
        /**
         * Because we store the documeent fields as json,
         * just return a string here.
         */
        data: string;
    }[]>;
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
export type SQLiteStorageSettings = {
    sqliteBasics: SQLiteBasics<any>;
};
export type SQLiteInstanceCreationOptions = {};
export type SQLiteInternals = {
    database: SQLiteDatabaseClass;
};
export type SQLitePreparedQuery<RxDocType> = {
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
    /**
     * The same query but without the ORDER BY part.
     * Used in count-queries for better performance.
     */
    queryWithoutSort: string;
    /**
     * If the query cannot be transformed to SQL,
     * because it contains non-SQLite-native operators
     * like $regex, we have use a normal query matching.
     */
    nonImplementedOperator?: string;
};
export type SQLiteQueryWithParams = {
    query: string;
    /**
     * Some SQLite version allow to use named params like $docId
     * and then putting an object in here.
     * But because not all environments support that,
     * we have to use plain array params that use the '?' placeholder in the query string.
     */
    params: any[];
};
export type SQLiteChangesCheckpoint = {
    id: string;
    lwt: number;
};
