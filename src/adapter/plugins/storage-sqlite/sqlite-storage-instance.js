import {
	getPrimaryFieldOfPrimaryKey as a,
	categorizeBulkWriteRows as t,
	isMaybeReadonlyArray as e,
	ensureNotFalsy as s,
	sortDocumentsByLastWriteTime as i,
	addRxStorageMultiInstanceSupport as n,
	PROMISE_RESOLVE_VOID as r,
	lastOfArray as h,
	getFromMapOrThrow as m,
	promiseWait as c,
	getQueryMatcher as l,
	batchArray as o,
} from 'rxdb';
import { Subject as d } from 'rxjs';

import {
	attachmentRowKey as u,
	closeDatabaseConnection as p,
	getDatabaseConnection as E,
	getIndexId as N,
	getJsonExtract as T,
	getSQLiteFindByIdSQL as y,
	getSQLiteUpdateSQL as I,
	RX_STORAGE_NAME_SQLITE as w,
	sqliteTransaction as b,
	SQLITE_VARIABLES_LIMIT as q,
} from './sqlite-helpers';
let v = 0;
export var RxStorageInstanceSQLite = (function () {
	function e(t, e, s, i, n, r, h, m) {
		(this.changes$ = new d()),
			(this.instanceId = v++),
			(this.closed = !1),
			(this.storage = t),
			(this.databaseName = e),
			(this.collectionName = s),
			(this.schema = i),
			(this.internals = n),
			(this.options = r),
			(this.settings = h),
			(this.tableName = m),
			(this.sqliteBasics = t.settings.sqliteBasics),
			(this.primaryPath = a(this.schema.primaryKey));
	}
	const n = e.prototype;
	return (
		(n.bulkWrite = async function (a, e) {
			const i = await this.internals.databasePromise,
				n = { success: {}, error: {} },
				r = [],
				h = [],
				c = 5,
				l = '(' + new Array(c).fill('?').join(', ') + ')',
				d = o(a, q / c);
			return (
				await b(
					i,
					this.sqliteBasics,
					async () => (
						await Promise.all(
							d.map(async (a) => {
								const c = a.map((a) => a.document[this.primaryPath]),
									o = await this.sqliteBasics.all(i, {
										query:
											'SELECT data FROM "' +
											this.tableName +
											'" WHERE id IN (' +
											c.map(() => '?').join(', ') +
											')',
										params: c,
									}),
									d = new Map();
								o.forEach((a) => {
									const t = JSON.parse(a.data),
										e = t[this.primaryPath];
									d.set(e, t);
								});
								const p = t(this, this.primaryPath, d, a, e);
								h.push(p),
									Object.keys(p.errors).forEach((a) => {
										n.error[a] = s(p).errors[a];
									});
								const E = new Map();
								if (p.bulkInsertDocs.length > 0) {
									const N =
											'INSERT INTO "' +
											this.tableName +
											'"(\n                                id,\n                                revision,\n                                deleted,\n                                lastWriteTime,\n                                data\n                            ) VALUES ' +
											new Array(p.bulkInsertDocs.length).fill(l).join(', ') +
											';',
										T = [];
									p.bulkInsertDocs.forEach((a) => {
										const t = a.document,
											e = t[this.primaryPath];
										E.set(e, t),
											T.push(e),
											T.push(t._rev),
											T.push(t._deleted ? 1 : 0),
											T.push(t._meta.lwt),
											T.push(JSON.stringify(t)),
											(n.success[t[this.primaryPath]] = t);
									}),
										r.push(this.sqliteBasics.run(i, { query: N, params: T }));
								}
								p.bulkUpdateDocs.length > 0 &&
									p.bulkUpdateDocs.forEach((a) => {
										const t = a.document[this.primaryPath];
										E.set(t, a.document),
											(n.success[t] = a.document),
											r.push(this.sqliteBasics.run(i, I(this.tableName, this.primaryPath, a)));
									}),
									p.attachmentsAdd.forEach((a) => {
										const t = this.sqliteBasics.all(i, {
											query:
												'\n                                        INSERT INTO\n                                            "' +
												this.tableName +
												'_attachments"(\n                                                docIdWithAttachmentId,\n                                                digest,\n                                                length,\n                                                type,\n                                                data\n                                            )\n                                        VALUES(?, ?, ?, ?, ?)\n                                    ',
											params: [
												u(a.documentId, a.attachmentId),
												m(E, a.documentId)._attachments[a.attachmentId].digest,
												a.attachmentData.length,
												a.attachmentData.type,
												this.storage.base64AttachmentToStoredAttachmentsData(a.attachmentData.data),
											],
										});
										r.push(t);
									}),
									p.attachmentsRemove.forEach((a) => {
										const t = this.sqliteBasics.all(i, {
											query:
												'\n                                    DELETE FROM\n                                        "' +
												this.tableName +
												'_attachments"\n                                    WHERE\n                                        docIdWithAttachmentId = ?\n                                    ',
											params: [u(a.documentId, a.attachmentId)],
										});
										r.push(t);
									}),
									p.attachmentsUpdate.forEach((a) => {
										const t = this.sqliteBasics.all(i, {
											query:
												'\n                                    UPDATE "' +
												this.tableName +
												'_attachments"\n                                    SET\n                                        digest = ?,\n                                        length = ?,\n                                        type = ?,\n                                        data = ?\n                                    WHERE\n                                        docIdWithAttachmentId = ?\n                                    ',
											params: [
												m(E, a.documentId)._attachments[a.attachmentId].digest,
												a.attachmentData.length,
												a.attachmentData.type,
												this.storage.base64AttachmentToStoredAttachmentsData(a.attachmentData.data),
												u(a.documentId, a.attachmentId),
											],
										});
										r.push(t);
									});
							})
						),
						await Promise.all(r),
						this.closed ? 'ROLLBACK' : 'COMMIT'
					),
					{ databaseName: this.databaseName, collectionName: this.collectionName }
				),
				h.forEach((a) => {
					if (a.eventBulk.events.length > 0) {
						const t = s(a.newestRow).document;
						(a.eventBulk.checkpoint = { id: t[this.primaryPath], lwt: t._meta.lwt }),
							this.changes$.next(a.eventBulk);
					}
				}),
				n
			);
		}),
		(n.query = async function (a) {
			const t = await this.internals.databasePromise;
			if ((await this.internals.indexCreationPromise, a.nonImplementedOperator)) {
				for (
					var e = a.mangoQuery,
						s = e.skip ? e.skip : 0,
						i = s + (e.limit ? e.limit : 1 / 0),
						n = [],
						r = l(this.schema, e),
						h = 0,
						m = !1;
					!1 === m;

				) {
					const c = await this.sqliteBasics.all(t, {
						query: 'SELECT data FROM "' + this.tableName + '" ' + a.sqlQuery.query + ' OFFSET ' + h,
						params: a.sqlQuery.params,
					});
					(h += c.length),
						c.forEach((a) => {
							const t = JSON.parse(a.data);
							r(t) && n.push(t);
						}),
						(c.length === 0 || n.length >= i) && (m = !0);
				}
				return { documents: (n = n.slice(s, i)) };
			}
			return {
				documents: (
					await this.sqliteBasics.all(t, {
						query: 'SELECT data FROM "' + this.tableName + '" ' + a.sqlQuery.query,
						params: a.sqlQuery.params,
					})
				).map((a) => JSON.parse(a.data)),
			};
		}),
		(n.count = async function (a) {
			const t = await this.internals.databasePromise;
			return (
				await this.internals.indexCreationPromise,
				{
					count: (
						await this.sqliteBasics.all(t, {
							query: 'SELECT COUNT(1) as count FROM "' + this.tableName + '" ' + a.queryWithoutSort,
							params: a.sqlQuery.params,
						})
					)[0].count,
					mode: 'fast',
				}
			);
		}),
		(n.findDocumentsById = async function (a, t) {
			for (
				var e = await this.internals.databasePromise,
					s = await this.sqliteBasics.all(e, y(this.tableName, a, t)),
					i = {},
					n = 0;
				n < s.length;
				++n
			) {
				const r = s[n];
				i[r.id] = JSON.parse(r.data);
			}
			return i;
		}),
		(n.getChangedDocumentsSince = async function (a, t) {
			let e,
				s = await this.internals.databasePromise;
			await this.internals.indexCreationPromise,
				(e = t
					? [
							{ wherePart: 'WHERE lastWriteTime > (?)', params: [t.lwt] },
							{ wherePart: 'WHERE lastWriteTime = (?) AND id > (?)', params: [t.lwt, t.id] },
					  ]
					: [{ wherePart: '', params: [] }]);
			let n = [];
			await Promise.all(
				e.map(async (t) => {
					const e =
						'\n                    SELECT *\n                    FROM "' +
						this.tableName +
						'"\n                    ' +
						t.wherePart +
						'\n                    ORDER BY \n                        lastWriteTime ASC,\n                        id ASC\n                    LIMIT ' +
						a +
						'\n                    ;\n                ';
					(await this.sqliteBasics.all(s, { query: e, params: t.params })).forEach((a) => {
						n.push(JSON.parse(a.data));
					});
				})
			),
				(n = (n = i(this.primaryPath, n)).slice(0, a));
			const r = h(n);
			return {
				documents: n,
				checkpoint: r ? { id: r[this.primaryPath], lwt: r._meta.lwt } : t || { id: '', lwt: 0 },
			};
		}),
		(n.changeStream = function () {
			return this.changes$.asObservable();
		}),
		(n.cleanup = async function (a) {
			const t = await this.internals.databasePromise;
			await this.internals.indexCreationPromise;
			const e = new Date().getTime() - a;
			return (
				await this.sqliteBasics.all(t, {
					query:
						'\n                    DELETE FROM\n                        "' +
						this.tableName +
						'"\n                    WHERE\n                        deleted = 1\n                        AND\n                        lastWriteTime < ?\n                ',
					params: [e],
				}),
				await this.sqliteBasics.run(t, { query: 'pragma optimize;', params: [] }),
				!0
			);
		}),
		(n.remove = async function () {
			const a = await this.internals.databasePromise;
			await this.internals.indexCreationPromise;
			const t = [
				this.sqliteBasics.run(a, {
					query: 'DROP TABLE IF EXISTS "' + this.tableName + '"',
					params: [],
				}),
			];
			return (
				this.schema.attachments &&
					t.push(
						this.sqliteBasics.run(a, {
							query: 'DROP TABLE IF EXISTS "' + this.tableName + '_attachments"',
							params: [],
						})
					),
				await Promise.all(t),
				this.close()
			);
		}),
		(n.getAttachmentData = async function (a, t) {
			const e = await this.internals.databasePromise,
				s =
					'\n        SELECT data\n        FROM "' +
					this.tableName +
					'_attachments"\n        WHERE\n            docIdWithAttachmentId = ?\n        LIMIT 1\n        ;',
				i = await this.sqliteBasics.all(e, { query: s, params: [u(a, t)] });
			return this.storage.storedAttachmentsDataToBase64(i[0].data);
		}),
		(n.close = async function () {
			if (
				(await this.internals.databasePromise,
				await this.internals.indexCreationPromise,
				this.closed)
			)
				throw new Error(
					'Cannot close already closed database ' + this.databaseName + '-' + this.collectionName
				);
			return (
				(this.closed = !0),
				this.changes$.complete(),
				p(this.databaseName, this.storage.settings.sqliteBasics)
			);
		}),
		(n.conflictResultionTasks = function () {
			return new d().asObservable();
		}),
		(n.resolveConflictResultionTask = function (a) {
			return r;
		}),
		e
	);
})();
export async function createSQLiteStorageInstance(t, s, i) {
	const r = a(s.schema.primaryKey),
		h = i.sqliteBasics,
		m = s.collectionName + '-' + s.schema.version,
		l = {},
		o = [];
	(l.databasePromise = E(t.settings.sqliteBasics, s.databaseName)
		.then(
			async (a) => (
				await b(
					a,
					h,
					async () => (
						o.push(
							h.run(a, {
								query:
									'\n                            CREATE TABLE IF NOT EXISTS "' +
									m +
									'"(\n                                id TEXT NOT NULL PRIMARY KEY,\n                                revision TEXT,\n                                deleted BOOLEAN NOT NULL CHECK (deleted IN (0, 1)),\n                                lastWriteTime INTEGER NOT NULL,\n                                data json\n                            ) WITHOUT ROWID;\n                        ',
								params: [],
							})
						),
						s.schema.attachments &&
							o.push(
								h.run(a, {
									query:
										'\n                                    CREATE TABLE IF NOT EXISTS "' +
										m +
										'_attachments"(\n                                        docIdWithAttachmentId TEXT NOT NULL PRIMARY KEY,\n                                        digest TEXT NOT NULL,\n                                        length INTEGER NOT NULL,\n                                        type TEXT NOT NULL,\n                                        data BLOB\n                                    ) WITHOUT ROWID;\n                                ',
									params: [],
								})
							),
						await Promise.all(o),
						'COMMIT'
					),
					{ indexCreation: !1, databaseName: s.databaseName, collectionName: s.collectionName }
				),
				a
			)
		)
		.then((res) => {
			return res;
		})),
		(l.indexCreationPromise = l.databasePromise.then(async (a) => {
			await c(0),
				await b(
					a,
					h,
					async () => {
						const t = s.schema.indexes ? s.schema.indexes.map((a) => (e(a) ? a : [a])) : [];
						return (
							t.push(['deleted', 'lastWriteTime']),
							t.push(['lastWriteTime', 'id']),
							await Promise.all(
								t.map((t) => {
									const s = e(t) ? t : [t],
										i = N(s),
										n = s.map((a) => T(r, a));
									n.push('deleted');
									const c =
										'CREATE INDEX IF NOT EXISTS "' + i + '" ON "' + m + '"(' + n.join(', ') + ');';
									return h.run(a, { query: c, params: [] });
								})
							),
							'COMMIT'
						);
					},
					{ indexCreation: !0, databaseName: s.databaseName, collectionName: s.collectionName }
				);
		}));
	const d = new RxStorageInstanceSQLite(
		t,
		s.databaseName,
		s.collectionName,
		s.schema,
		l,
		s.options,
		i,
		m
	);
	return n(w, s, d), d;
}
