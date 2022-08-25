import { BulkWriteRow, RxDocumentData } from 'rxdb';
import type { SQLiteBasics, SQLiteDatabaseClass, SQLiteQueryWithParams } from './sqlite-types';
export declare const RX_STORAGE_NAME_SQLITE = "sqlite";
export declare function attachmentRowKey(documentId: string, attachmentId: string): string;
export declare function getDatabaseConnection(sqliteBasics: SQLiteBasics<any>, databaseName: string): Promise<SQLiteDatabaseClass>;
export declare function closeDatabaseConnection(databaseName: string, sqliteBasics: SQLiteBasics<any>): Promise<void>;
/**
 * Creates the identifier of an index.
 * Ensures to be a safe index name that works with SQLite.
 */
export declare function getIndexId(index: string[] | readonly string[]): string;
export declare function getSQLiteInsertSQL<RxDocType>(collectionName: string, primaryPath: keyof RxDocType, docData: RxDocumentData<RxDocType>): SQLiteQueryWithParams;
export declare function getSQLiteUpdateSQL<RxDocType>(collectionName: string, primaryPath: keyof RxDocType, writeRow: BulkWriteRow<RxDocType>): SQLiteQueryWithParams;
export declare function getSQLiteFindByIdSQL<RxDocType>(collectionName: string, docIds: string[], withDeleted: boolean): SQLiteQueryWithParams;
export declare function isPlainObject(o: any): boolean;
export declare function sqliteTransaction(database: SQLiteDatabaseClass, sqliteBasics: SQLiteBasics<any>, handler: () => Promise<'COMMIT' | 'ROLLBACK'>, 
/**
 * Context will be logged
 * if the commit does error.
 */
context?: any): Promise<void>;
/**
 * TODO instead of doing a while loop, we should find a way to listen when the
 * other transaction is comitted.
 */
export declare function openSqliteTransaction(database: SQLiteDatabaseClass, sqliteBasics: SQLiteBasics<any>): Promise<void>;
export declare function finishSqliteTransaction(database: SQLiteDatabaseClass, sqliteBasics: SQLiteBasics<any>, mode: 'COMMIT' | 'ROLLBACK', 
/**
 * Context will be logged
 * if the commit does error.
 */
context?: any): Promise<void>;
