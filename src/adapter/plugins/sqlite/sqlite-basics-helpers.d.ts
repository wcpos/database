import type { Sqlite3Type, SQLiteBasics, SQLiteDatabaseClass, SQLiteQueryWithParams } from './sqlite-types';
export declare function getSQLiteBasicsNode(sqlite3: Sqlite3Type): SQLiteBasics<SQLiteDatabaseClass>;
/**
 * Promisified version of db.run()
 */
export declare function execSqlSQLiteNode(database: SQLiteDatabaseClass, queryWithParams: SQLiteQueryWithParams, operator: 'run' | 'all'): any;
export declare function closeSQLiteDatabaseNode(database: SQLiteDatabaseClass): Promise<void>;
declare type SQLiteCapacitorDatabase = any;
declare type SQLiteConnection = any;
export declare function getSQLiteBasicsCapacitor(sqlite: SQLiteConnection, capacitorCore: any): SQLiteBasics<SQLiteCapacitorDatabase>;
declare type SQLiteQuickDatabase = any;
export declare const EMPTY_FUNCTION: () => void;
export declare function getSQLiteBasicsQuickSQLite(openDB: any): SQLiteBasics<SQLiteQuickDatabase>;
export {};
