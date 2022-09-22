import {
	getPrimaryFieldOfPrimaryKey as n,
	categorizeBulkWriteRows as a,
	isMaybeReadonlyArray as s,
	ensureNotFalsy as i,
	sortDocumentsByLastWriteTime as r,
	addRxStorageMultiInstanceSupport as c,
	PROMISE_RESOLVE_VOID as o,
	getNewestOfDocumentStates as l,
	lastOfArray as u,
} from 'rxdb';
import { Subject as h } from 'rxjs';
import {
	attachmentRowKey as d,
	closeDatabaseConnection as m,
	getDatabaseConnection as p,
	getIndexId as f,
	getSQLiteFindByIdSQL as E,
	getSQLiteUpdateSQL as N,
	RX_STORAGE_NAME_SQLITE as v,
	sqliteTransaction as y,
} from './sqlite-helpers';

const t =
	(this && this.__awaiter) ||
	function (t, e, n, a) {
		function s(t) {
			return t instanceof n
				? t
				: new n(function (e) {
						e(t);
				  });
		}
		return new (n || (n = Promise))(function (n, i) {
			function r(t) {
				try {
					o(a.next(t));
				} catch (t) {
					i(t);
				}
			}
			function c(t) {
				try {
					o(a.throw(t));
				} catch (t) {
					i(t);
				}
			}
			function o(t) {
				t.done ? n(t.value) : s(t.value).then(r, c);
			}
			o((a = a.apply(t, e || [])).next());
		});
	};
const e =
	(this && this.__generator) ||
	function (t, e) {
		let n;
		let a;
		let s;
		let i;
		let r = {
			label: 0,
			sent() {
				if (1 & s[0]) throw s[1];
				return s[1];
			},
			trys: [],
			ops: [],
		};
		return (
			(i = { next: c(0), throw: c(1), return: c(2) }),
			typeof Symbol === 'function' &&
				(i[Symbol.iterator] = function () {
					return this;
				}),
			i
		);
		function c(t) {
			return function (e) {
				return o([t, e]);
			};
		}
		function o(i) {
			if (n) throw new TypeError('Generator is already executing.');
			for (; r; )
				try {
					if (
						((n = 1),
						a &&
							(s =
								2 & i[0]
									? a.return
									: i[0]
									? a.throw || ((s = a.return) && s.call(a), 0)
									: a.next) &&
							!(s = s.call(a, i[1])).done)
					)
						return s;
					switch (((a = 0), s && (i = [2 & i[0], s.value]), i[0])) {
						case 0:
						case 1:
							s = i;
							break;
						case 4:
							return r.label++, { value: i[1], done: !1 };
						case 5:
							r.label++, (a = i[1]), (i = [0]);
							continue;
						case 7:
							(i = r.ops.pop()), r.trys.pop();
							continue;
						default:
							if (
								!((s = r.trys), (s = s.length > 0 && s[s.length - 1]) || (i[0] !== 6 && i[0] !== 2))
							) {
								r = 0;
								continue;
							}
							if (i[0] === 3 && (!s || (i[1] > s[0] && i[1] < s[3]))) {
								r.label = i[1];
								break;
							}
							if (i[0] === 6 && r.label < s[1]) {
								(r.label = s[1]), (s = i);
								break;
							}
							if (s && r.label < s[2]) {
								(r.label = s[2]), r.ops.push(i);
								break;
							}
							s[2] && r.ops.pop(), r.trys.pop();
							continue;
					}
					i = e.call(t, r);
				} catch (t) {
					(i = [6, t]), (a = 0);
				} finally {
					n = s = 0;
				}
			if (5 & i[0]) throw i[1];
			return { value: i[0] ? i[1] : void 0, done: !0 };
		}
	};

let T = 0;
const b = (function () {
	function s(t, e, a, s, i, r, c) {
		(this.storage = t),
			(this.databaseName = e),
			(this.collectionName = a),
			(this.schema = s),
			(this.internals = i),
			(this.options = r),
			(this.settings = c),
			(this.changes$ = new h()),
			(this.instanceId = T++),
			(this.closed = !1),
			(this.sqliteBasics = this.storage.settings.sqliteBasics),
			(this.primaryPath = n(this.schema.primaryKey));
	}
	return (
		(s.prototype.bulkWrite = function (n, s) {
			return t(this, void 0, void 0, function () {
				let i;
				let r;
				let c;
				let o;
				let u;
				let h;
				const m = this;
				return e(this, function (p) {
					switch (p.label) {
						case 0:
							return (
								(i = this.internals.database),
								(r = { success: {}, error: {} }),
								(c = n.map(function (t) {
									return t.document[m.primaryPath];
								})),
								(o = []),
								[
									4,
									y(
										i,
										this.sqliteBasics,
										function () {
											return t(m, void 0, void 0, function () {
												let t;
												let l;
												let h;
												let m;
												const p = this;
												return e(this, function (e) {
													switch (e.label) {
														case 0:
															return [
																4,
																this.sqliteBasics.all(i, {
																	query: `SELECT data FROM "${this.collectionName}" WHERE id IN (${c
																		.map(function () {
																			return '?';
																		})
																		.join(', ')})`,
																	params: c,
																}),
															];
														case 1:
															return (
																(t = e.sent()),
																(l = new Map()),
																t.forEach(function (t) {
																	const e = JSON.parse(t.data);
																	const n = e[p.primaryPath];
																	l.set(n, e);
																}),
																(u = a(this, this.primaryPath, l, n, s)).attachmentsAdd.forEach(
																	function (t) {
																		const e = p.sqliteBasics.all(p.internals.database, {
																			query:
																				'\n                                INSERT INTO\n                                    "'.concat(
																					p.collectionName,
																					'_attachments"(\n                                        docIdWithAttachmentId,\n                                        digest,\n                                        length,\n                                        type,\n                                        data\n                                    )\n                                VALUES(?, ?, ?, ?, ?)\n                            '
																				),
																			params: [
																				d(t.documentId, t.attachmentId),
																				t.attachmentData.digest,
																				t.attachmentData.length,
																				t.attachmentData.type,
																				t.attachmentData.data,
																			],
																		});
																		o.push(e);
																	}
																),
																u.attachmentsRemove.forEach(function (t) {
																	const e = p.sqliteBasics.all(p.internals.database, {
																		query:
																			'\n                            DELETE FROM\n                                "'.concat(
																				p.collectionName,
																				'_attachments"\n                            WHERE\n                                docIdWithAttachmentId = ?\n                            '
																			),
																		params: [d(t.documentId, t.attachmentId)],
																	});
																	o.push(e);
																}),
																u.attachmentsUpdate.forEach(function (t) {
																	const e = p.sqliteBasics.all(p.internals.database, {
																		query: '\n                            UPDATE "'.concat(
																			p.collectionName,
																			'_attachments"\n                            SET\n                                digest = ?,\n                                length = ?,\n                                type = ?,\n                                data = ?\n                            WHERE\n                                docIdWithAttachmentId = ?\n                            '
																		),
																		params: [
																			t.attachmentData.digest,
																			t.attachmentData.length,
																			t.attachmentData.type,
																			t.attachmentData.data,
																			d(t.documentId, t.attachmentId),
																		],
																	});
																	o.push(e);
																}),
																u.bulkInsertDocs.length > 0 &&
																	((h = 'INSERT INTO "'
																		.concat(
																			this.collectionName,
																			'"(\n                        id,\n                        revision,\n                        deleted,\n                        lastWriteTime,\n                        data\n                    ) VALUES '
																		)
																		.concat(
																			new Array(u.bulkInsertDocs.length)
																				.fill('(?, ?, ?, ?, ?)')
																				.join(', '),
																			';'
																		)),
																	(m = []),
																	u.bulkInsertDocs.forEach(function (t) {
																		const e = t.document;
																		m.push(e[p.primaryPath]),
																			m.push(e._rev),
																			m.push(e._deleted ? 1 : 0),
																			m.push(e._meta.lwt),
																			m.push(JSON.stringify(e)),
																			(r.success[e[p.primaryPath]] = e);
																	}),
																	o.push(this.sqliteBasics.run(i, { query: h, params: m }))),
																u.bulkUpdateDocs.length > 0 &&
																	u.bulkUpdateDocs.forEach(function (t) {
																		(r.success[t.document[p.primaryPath]] = t.document),
																			o.push(
																				p.sqliteBasics.run(i, N(p.collectionName, p.primaryPath, t))
																			);
																	}),
																u.errors.forEach(function (t) {
																	r.error[t.documentId] = t;
																}),
																[4, Promise.all(o)]
															);
														case 2:
															return e.sent(), this.closed ? [2, 'ROLLBACK'] : [2, 'COMMIT'];
													}
												});
											});
										},
										{ databaseName: this.databaseName, collectionName: this.collectionName }
									),
								]
							);
						case 1:
							return (
								p.sent(),
								u.eventBulk.events.length > 0 &&
									((h = l(this.primaryPath, Object.values(r.success))),
									(u.eventBulk.checkpoint = { id: h[this.primaryPath], lwt: h._meta.lwt }),
									this.changes$.next(u.eventBulk)),
								[2, r]
							);
					}
				});
			});
		}),
		(s.prototype.query = function (n) {
			return t(this, void 0, void 0, function () {
				return e(this, function (t) {
					switch (t.label) {
						case 0:
							return [
								4,
								this.sqliteBasics.all(this.internals.database, {
									query: `SELECT data FROM "${this.collectionName}" ${n.sqlQuery.query}`,
									params: n.sqlQuery.params,
								}),
							];
						case 1:
							return [
								2,
								{
									documents: t.sent().map(function (t) {
										return JSON.parse(t.data);
									}),
								},
							];
					}
				});
			});
		}),
		(s.prototype.findDocumentsById = function (n, a) {
			return t(this, void 0, void 0, function () {
				let t;
				let s;
				return e(this, function (e) {
					switch (e.label) {
						case 0:
							return [
								4,
								this.sqliteBasics.all(this.internals.database, E(this.collectionName, n, a)),
							];
						case 1:
							return (
								(t = e.sent()),
								(s = {}),
								t.forEach(function (t) {
									s[t.id] = JSON.parse(t.data);
								}),
								[2, s]
							);
					}
				});
			});
		}),
		(s.prototype.getChangedDocumentsSince = function (n, a) {
			return t(this, void 0, void 0, function () {
				let s;
				let c;
				let o;
				const l = this;
				return e(this, function (h) {
					switch (h.label) {
						case 0:
							return (
								(s = a
									? [
											{ wherePart: 'WHERE lastWriteTime > (?)', params: [i(a).lwt] },
											{
												wherePart: 'WHERE lastWriteTime = (?) AND id > (?)',
												params: [i(a).lwt, i(a).id],
											},
									  ]
									: [{ wherePart: '', params: {} }]),
								(c = []),
								[
									4,
									Promise.all(
										s.map(function (a) {
											return t(l, void 0, void 0, function () {
												let t;
												return e(this, function (e) {
													switch (e.label) {
														case 0:
															return (
																(t = '\n                    SELECT *\n                    FROM "'
																	.concat(this.collectionName, '"\n                    ')
																	.concat(
																		a.wherePart,
																		'\n                    ORDER BY \n                        lastWriteTime ASC,\n                        id ASC\n                    LIMIT '
																	)
																	.concat(n, '\n                    ;\n                ')),
																[
																	4,
																	this.sqliteBasics.all(this.internals.database, {
																		query: t,
																		params: a.params,
																	}),
																]
															);
														case 1:
															return (
																e.sent().forEach(function (t) {
																	c.push(JSON.parse(t.data));
																}),
																[2]
															);
													}
												});
											});
										})
									),
								]
							);
						case 1:
							return (
								h.sent(),
								(c = (c = r(this.primaryPath, c)).slice(0, n)),
								(o = u(c)),
								[
									2,
									{
										documents: c,
										checkpoint: o
											? { id: o[this.primaryPath], lwt: o._meta.lwt }
											: a || { id: '', lwt: 0 },
									},
								]
							);
					}
				});
			});
		}),
		(s.prototype.changeStream = function () {
			return this.changes$.asObservable();
		}),
		(s.prototype.cleanup = function (n) {
			return t(this, void 0, void 0, function () {
				let t;
				return e(this, function (e) {
					switch (e.label) {
						case 0:
							return (
								(t = new Date().getTime() - n),
								[
									4,
									this.sqliteBasics.all(this.internals.database, {
										query: '\n                    DELETE FROM\n                        "'.concat(
											this.collectionName,
											'"\n                    WHERE\n                        deleted = 1\n                        AND\n                        lastWriteTime < ?\n                '
										),
										params: [t],
									}),
								]
							);
						case 1:
							return e.sent(), [2, !0];
					}
				});
			});
		}),
		(s.prototype.remove = function () {
			return t(this, void 0, void 0, function () {
				let t;
				return e(this, function (e) {
					switch (e.label) {
						case 0:
							return (
								(t = [
									this.sqliteBasics.run(this.internals.database, {
										query: 'DROP TABLE IF EXISTS "'.concat(this.collectionName, '"'),
										params: [],
									}),
								]),
								this.schema.attachments &&
									t.push(
										this.sqliteBasics.run(this.internals.database, {
											query: 'DROP TABLE IF EXISTS "'.concat(this.collectionName, '_attachments"'),
											params: [],
										})
									),
								[4, Promise.all(t)]
							);
						case 1:
							return e.sent(), [2, this.close()];
					}
				});
			});
		}),
		(s.prototype.getAttachmentData = function (n, a) {
			return t(this, void 0, void 0, function () {
				let t;
				return e(this, function (e) {
					switch (e.label) {
						case 0:
							return (
								(t = '\n        SELECT data\n        FROM "'.concat(
									this.collectionName,
									'_attachments"\n        WHERE\n            docIdWithAttachmentId = ?\n        LIMIT 1\n        ;'
								)),
								[4, this.sqliteBasics.all(this.internals.database, { query: t, params: [d(n, a)] })]
							);
						case 1:
							return [2, e.sent()[0].data];
					}
				});
			});
		}),
		(s.prototype.close = function () {
			return t(this, void 0, void 0, function () {
				return e(this, function (t) {
					if (this.closed)
						throw new Error(
							`Cannot close already closed database ${this.databaseName}-${this.collectionName}`
						);
					return (
						(this.closed = !0),
						this.changes$.complete(),
						[2, m(this.databaseName, this.storage.settings.sqliteBasics)]
					);
				});
			});
		}),
		(s.prototype.conflictResultionTasks = function () {
			return new h().asObservable();
		}),
		(s.prototype.resolveConflictResultionTask = function (t) {
			return o;
		}),
		s
	);
})();
export { b as RxStorageInstanceSQLite };
export function createSQLiteStorageInstance(n, a, i) {
	return t(this, void 0, void 0, function () {
		let r;
		let o;
		let l;
		const u = this;
		return e(this, function (h) {
			switch (h.label) {
				case 0:
					return [
						4,
						p(n.settings.sqliteBasics, a.databaseName).then(function (n) {
							return t(u, void 0, void 0, function () {
								let r;
								const c = this;
								return e(this, function (o) {
									switch (o.label) {
										case 0:
											return (
												(r = i.sqliteBasics),
												[
													4,
													y(
														n,
														r,
														function () {
															return t(c, void 0, void 0, function () {
																let t;
																return e(this, function (e) {
																	switch (e.label) {
																		case 0:
																			return (
																				(t = []),
																				r.journalMode !== '' &&
																					t.push(
																						r.run(n, {
																							query: 'pragma journal_mode = '.concat(r, ';'),
																							params: [],
																						})
																					),
																				t.push(
																					r.run(n, {
																						query:
																							'\n                            CREATE TABLE IF NOT EXISTS "'.concat(
																								a.collectionName,
																								'"(\n                                id TEXT NOT NULL PRIMARY KEY,\n                                revision TEXT,\n                                deleted BOOLEAN NOT NULL CHECK (deleted IN (0, 1)),\n                                lastWriteTime INTEGER NOT NULL,\n                                data json\n                            );\n                        '
																							),
																						params: [],
																					})
																				),
																				a.schema.attachments &&
																					t.push(
																						r.run(n, {
																							query:
																								'\n                                    CREATE TABLE IF NOT EXISTS "'.concat(
																									a.collectionName,
																									'_attachments"(\n                                        docIdWithAttachmentId TEXT NOT NULL PRIMARY KEY,\n                                        digest TEXT NOT NULL,\n                                        length INTEGER NOT NULL,\n                                        type TEXT NOT NULL,\n                                        data BLOB\n                                    );\n                                '
																								),
																							params: [],
																						})
																					),
																				[4, Promise.all(t)]
																			);
																		case 1:
																			return e.sent(), [2, 'COMMIT'];
																	}
																});
															});
														},
														{
															indexCreation: !1,
															databaseName: a.databaseName,
															collectionName: a.collectionName,
														}
													),
												]
											);
										case 1:
											return (
												o.sent(),
												[
													4,
													y(
														n,
														r,
														function () {
															return t(c, void 0, void 0, function () {
																let t;
																return e(this, function (e) {
																	switch (e.label) {
																		case 0:
																			return (
																				(t = a.schema.indexes
																					? a.schema.indexes.map(function (t) {
																							return s(t) ? t : [t];
																					  })
																					: []).push(['deleted', 'lastWriteTime']),
																				t.push(['lastWriteTime', 'id']),
																				[
																					4,
																					Promise.all(
																						t.map(function (t) {
																							const e = s(t) ? t : [t];
																							const i = f(e);
																							const c = e.map(function (t) {
																								return `JSON_EXTRACT(data, '$.${t}')`;
																							});
																							c.push('deleted');
																							const o = `CREATE INDEX IF NOT EXISTS "${i}" ON "${
																								a.collectionName
																							}"(${c.join(', ')});`;
																							return r.run(n, { query: o, params: [] });
																						})
																					),
																				]
																			);
																		case 1:
																			return e.sent(), [2, 'COMMIT'];
																	}
																});
															});
														},
														{
															indexCreation: !0,
															databaseName: a.databaseName,
															collectionName: a.collectionName,
														}
													),
												]
											);
										case 2:
											return o.sent(), [2, n];
									}
								});
							});
						}),
					];
				case 1:
					return (
						(r = h.sent()),
						(o = { database: r }),
						(l = new b(n, a.databaseName, a.collectionName, a.schema, o, a.options, i)),
						c(v, a, l),
						[2, l]
					);
			}
		});
	});
}
