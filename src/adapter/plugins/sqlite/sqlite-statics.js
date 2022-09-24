import { clone as e, DEFAULT_CHECKPOINT_SCHEMA as t, randomCouchString as a } from 'rxdb';
import { getDexieSortComparator as n, RxStorageDexieStatics as o } from 'rxdb/plugins/dexie';
import { getIndexId as u, isPlainObject as s } from './sqlite-helpers';

const r =
	(this && this.__read) ||
	function (r, e) {
		let t = typeof Symbol === 'function' && r[Symbol.iterator];
		if (!t) return r;
		let a;
		let n;
		const o = t.call(r);
		const u = [];
		try {
			for (; (void 0 === e || e-- > 0) && !(a = o.next()).done; ) u.push(a.value);
		} catch (r) {
			n = { error: r };
		} finally {
			try {
				a && !a.done && (t = o.return) && t.call(o);
			} finally {
				if (n) throw n.error;
			}
		}
		return u;
	};

export var RxStorageSQLiteStatics = {
	prepareQuery(r, t) {
		const a = t.limit ? `LIMIT ${t.limit}` : 'LIMIT -1';
		const n = t.skip ? `OFFSET ${t.skip}` : '';
		const o = [];
		let s = mangoQuerySelectorToSQL(t.selector, o);
		s = s !== '()' ? ` AND ${s} ` : '';
		let c = '';
		t.index && (c = `INDEXED BY "${u(t.index)}"`);
		debugger;
		return {
			schema: r,
			mangoQuery: e(t),
			sqlQuery: {
				query: `${c} WHERE deleted=0 ${s}${mangoQuerySortToSQL(t.sort)} ${a} ${n} ;`,
				params: o,
			},
		};
	},
	getSortComparator(r, e) {
		return n(r, e.mangoQuery);
	},
	getQueryMatcher(r, e) {
		return o.getQueryMatcher(r, { query: e.mangoQuery });
	},
	checkpointSchema: t,
};
const c = ['$or', '$and'];
export function mangoQuerySelectorToSQL(e, t, n) {
	return `(${Object.entries(e)
		.map(function (e) {
			const o = r(e, 2);
			const u = o[0];
			const i = o[1];
			if (!u.startsWith('$')) {
				if (s(i)) return mangoQuerySelectorToSQL(i, t, u);
				l = '?';
				return t.push(i), `json_extract(data, '$.${u}')=${l}`;
			}
			if (c.includes(u)) {
				const p = u.substring(1).toUpperCase();
				return i
					.map(function (r) {
						return mangoQuerySelectorToSQL(r, t, n);
					})
					.join(` ${p} `);
			}
			if (!n) throw new Error(`cannot have selector operator on the top level ${u}`);
			var l = '?';
			switch (u) {
				case '$eq':
					return t.push(i), `json_extract(data, '$.${n}')=${l}`;
				case '$ne':
					return t.push(i), `json_extract(data, '$.${n}')!=${l}`;
				case '$gt':
					return t.push(i), `json_extract(data, '$.${n}')>${l}`;
				case '$gte':
					return t.push(i), `json_extract(data, '$.${n}')>=${l}`;
				case '$lt':
					return t.push(i), `json_extract(data, '$.${n}')<${l}`;
				case '$lte':
					return t.push(i), `json_extract(data, '$.${n}')<=${l}`;
				case '$exists':
					return i
						? (t.push(`rand-${a(10)}`), `json_extract(data, '$.${n}')!=${l}`)
						: `json_extract(data, '$.${n}') IS NULL`;
				case '$in':
					return t.push(i), `json_extract(data, '$.${n}') IN (${l})`;
				case '$nin':
					return t.push(i), `json_extract(data, '$.${n}') NOT IN (${l})`;
				case '$elemMatch':
					return mangoQuerySelectorToSQL(i, t, n);
				default:
					throw new Error(`operator ${u} not implemented`);
			}
		})
		.join(' AND ')})`;
}
export function mangoQuerySortToSQL(e) {
	return `ORDER BY ${e
		.map(function (e) {
			const t = r(Object.entries(e)[0], 2);
			return `json_extract(data, '$.${t[0]}') ${t[1].toUpperCase()}`;
		})
		.join(', ')}`;
}
