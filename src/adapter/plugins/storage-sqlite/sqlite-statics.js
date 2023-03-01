import {
	clone as r,
	DEFAULT_CHECKPOINT_SCHEMA as e,
	randomCouchString as t,
	getPrimaryFieldOfPrimaryKey as o,
} from 'rxdb';

import { getIndexId as n, getJsonExtract as a, isPlainObject as u } from './sqlite-helpers';
export var RxStorageSQLiteStatics = {
	prepareQuery(e, t) {
		let a = o(e.primaryKey),
			u = t.limit ? 'LIMIT ' + t.limit : 'LIMIT -1',
			p = t.skip ? 'OFFSET ' + t.skip : '',
			s = [],
			i = '',
			c = void 0,
			l = '';
		t.index && (l = 'INDEXED BY "' + n(t.index) + '"');
		const m = mangoQuerySortToSQL(a, t.sort);
		try {
			let h = mangoQuerySelectorToSQL(e, t.selector, s);
			i =
				l +
				' WHERE deleted=0 ' +
				(h = h !== '()' ? ' AND ' + h + ' ' : '') +
				m +
				' ' +
				u +
				' ' +
				p +
				' ;';
		} catch (r) {
			if (!r.isNonImplementedOperatorError) throw r;
			(c = r.operator), (i = l + ' WHERE deleted=0 ' + m + ' LIMIT 50 ');
		}
		return {
			schema: e,
			mangoQuery: r(t),
			sqlQuery: { query: i, params: s },
			queryWithoutSort: i.replace(m, ' '),
			nonImplementedOperator: c,
		};
	},
	checkpointSchema: e,
};
const p = ['$or', '$and'];
export function mangoQuerySelectorToSQL(r, e, n, s) {
	const i = o(r.primaryKey);
	return (
		'(' +
		Object.entries(e)
			.map(([e, o]) => {
				if (!e.startsWith('$')) {
					if (u(o)) return mangoQuerySelectorToSQL(r, o, n, e);
					const c = '?';
					return n.push(o), a(i, e) + '=' + c;
				}
				if (p.includes(e)) {
					const l = e.substring(1).toUpperCase();
					return o.map((e) => mangoQuerySelectorToSQL(r, e, n, s)).join(' ' + l + ' ');
				}
				if (!s) throw new Error('cannot have selector operator on the top level ' + e);
				const m = '?';
				switch (e) {
					case '$eq':
						return o === null ? a(i, s) + ' IS NULL' : (n.push(o), a(i, s) + '=' + m);
					case '$ne':
						return o === null ? a(i, s) + ' IS NOT NULL' : (n.push(o), a(i, s) + '!=' + m);
					case '$gt':
						return n.push(o), a(i, s) + '>' + m;
					case '$gte':
						return n.push(o), a(i, s) + '>=' + m;
					case '$lt':
						return n.push(o), a(i, s) + '<' + m;
					case '$lte':
						return n.push(o), a(i, s) + '<=' + m;
					case '$exists':
						return o ? (n.push('rand-' + t(10)), a(i, s) + '!=' + m) : a(i, s) + ' IS NULL';
					case '$in':
						return (
							o.forEach((r) => n.push(r)),
							a(i, s) + ' IN (' + new Array(o.length).fill(m).join(',') + ')'
						);
					case '$nin':
						return n.push(o), a(i, s) + ' NOT IN (' + m + ')';
					default:
						var h = new Error('operator ' + e + ' not implemented');
						throw ((h.operator = e), (h.isNonImplementedOperatorError = !0), h);
				}
			})
			.join(' AND ') +
		')'
	);
}
export function mangoQuerySortToSQL(r, e) {
	return (
		'ORDER BY ' +
		e
			.map((e) => {
				const [t, o] = Object.entries(e)[0];
				return a(r, t) + ' ' + o.toUpperCase();
			})
			.join(', ')
	);
}
