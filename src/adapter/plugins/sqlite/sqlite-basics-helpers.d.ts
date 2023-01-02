import type { Sqlite3Type, SQLiteBasics, SQLiteDatabaseClass, SQLiteQueryWithParams } from './sqlite-types';
export declare function getSQLiteBasicsNode(sqlite3: Sqlite3Type): SQLiteBasics<SQLiteDatabaseClass>;
/**
 * Promisified version of db.run()
 */
export declare function execSqlSQLiteNode(database: SQLiteDatabaseClass, queryWithParams: SQLiteQueryWithParams, operator: 'run' | 'all'): any;
export declare function closeSQLiteDatabaseNode(database: SQLiteDatabaseClass): Promise<void>;
type SQLiteCapacitorDatabase = any;
type SQLiteConnection = any;
export declare function getSQLiteBasicsCapacitor(sqlite: SQLiteConnection, capacitorCore: any): SQLiteBasics<SQLiteCapacitorDatabase>;
type SQLiteQuickDatabase = any;
export declare const EMPTY_FUNCTION: () => void;
export declare function getSQLiteBasicsQuickSQLite(openDB: any): SQLiteBasics<SQLiteQuickDatabase>;
export declare function getSQLiteBasicsExpoSQLite(openDB: any, 
/**
 * Optional debug method,
 * you can pass console.log.bind(console)
 */
debug?: (_v1: any, _v2?: any) => void): {
    open: (name: string) => Promise<any>;
    all: (db: any, queryWithParams: SQLiteQueryWithParams) => Promise<any>;
    run: (db: any, queryWithParams: SQLiteQueryWithParams) => Promise<any>;
    close: (db: any) => Promise<any>;
    journalMode: string;
};
/**
 * Build to be compatible with WebSQL
 * and the 'react-native-sqlite-2' package.
 * Use like:
 * import SQLite from 'react-native-sqlite-2';
 * getRxStorageSQLite({
 *   sqliteBasics: getSQLiteBasicsWebSQL(SQLite.openDatabase)
 * });
 *
 */
export declare function getSQLiteBasicsWebSQL(openDB: any, 
/**
 * Optional debug method,
 * you can pass console.log.bind(console)
 */
debug?: (_v1: any, _v2?: any) => void): {
    open: (name: string) => Promise<any>;
    all: (db: any, queryWithParams: SQLiteQueryWithParams) => Promise<any>;
    run: (db: any, queryWithParams: SQLiteQueryWithParams) => Promise<void>;
    close: (db: any) => Promise<any>;
    journalMode: string;
};
export {};
