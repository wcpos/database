import {
	ensureNotFalsy as t,
	ensureRxStorageInstanceParamsAreCorrect as e,
	flatClone as r,
} from 'rxdb';

import { RX_STORAGE_NAME_SQLITE as a } from './sqlite-helpers';
import { RxStorageSQLiteStatics as n } from './sqlite-statics';
import { createSQLiteStorageInstance as o } from './sqlite-storage-instance';
import { checkVersion as s } from '../../shared/version-check';
export * from './sqlite-statics';
export * from './sqlite-helpers';
export * from './sqlite-types';
export * from './sqlite-storage-instance';
export * from './sqlite-basics-helpers';
export var RxStorageSQLite = (function () {
	function t(t) {
		(this.name = a), (this.statics = n), (this.settings = t);
	}
	const r = t.prototype;
	return (
		(r.createStorageInstance = function (t) {
			return e(t), s(), o(this, t, this.settings);
		}),
		(r.base64AttachmentToStoredAttachmentsData = function (t) {
			return this.settings.storeAttachmentsAsBase64String ? t : Buffer.from(t, 'base64');
		}),
		(r.storedAttachmentsDataToBase64 = function (t) {
			return this.settings.storeAttachmentsAsBase64String ? t : t.toString('base64');
		}),
		t
	);
})();
export function getRxStorageSQLite(e) {
	if (e.log) {
		let s = 0,
			a = (r) => t(e.log)('## RxStorage SQLite log: ' + r);
		e = r(e);
		const n = r(e.sqliteBasics),
			o = n.open;
		n.open = (t) => {
			const e = s++;
			return (
				a('open(' + e + ') ' + t),
				o(t)
					.then((t) => (a('open(' + e + ') DONE '), t))
					.catch((t) => {
						throw (a('open(' + e + ') ERROR '), t);
					})
			);
		};
		const i = n.all;
		n.all = (t, e) => {
			const r = s++;
			return (
				a('all(' + r + ') ' + JSON.stringify(e)),
				i(t, e)
					.then((t) => (a('all(' + r + ') DONE '), t))
					.catch((t) => {
						throw (a('all(' + r + ') ERROR '), t);
					})
			);
		};
		const c = n.run;
		n.run = (t, e) => {
			const r = s++;
			return (
				a('run(' + r + ') ' + JSON.stringify(e)),
				c(t, e)
					.then((t) => (a('run(' + r + ') DONE '), t))
					.catch((t) => {
						throw (a('run(' + r + ') ERROR '), t);
					})
			);
		};
		const h = n.setPragma;
		(n.setPragma = (t, e, r) => {
			const n = s++;
			return (
				a('setPragma(' + n + ') ' + JSON.stringify({ key: e, value: r })),
				h(t, e, r)
					.then((t) => (a('setPragma(' + n + ') DONE '), t))
					.catch((t) => {
						throw (a('setPragma(' + n + ') ERROR '), t);
					})
			);
		}),
			(e.sqliteBasics = n);
	}
	return new RxStorageSQLite(e);
}
