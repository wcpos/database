var e=this&&this.__read||function(e,r){var t="function"==typeof Symbol&&e[Symbol.iterator];if(!t)return e;var n,a,o=t.call(e),i=[];try{for(;(void 0===r||r-- >0)&&!(n=o.next()).done;)i.push(n.value)}catch(e){a={error:e}}finally{try{n&&!n.done&&(t=o.return)&&t.call(o)}finally{if(a)throw a.error}}return i};import{flatClone as r,isMaybeReadonlyArray as t,getPrimaryFieldOfPrimaryKey as n,getIndexableStringMonad as a}from"rxdb";export var INDEXEDDB_CUSTOM_INDEX_FIELD_PREFIX="rxdb_custom_index_";export function getIndexName(e){return INDEXEDDB_CUSTOM_INDEX_FIELD_PREFIX+e.join("_").replace(/\./g,"_RXDB_DOT_").replace(/\|/g,"_RXDB_PIPE_")}export function normalizeIndexedDBIndex(e,r){var n=t(r)?r.slice(0):[r];return e.properties._deleted&&n.unshift("_deleted"),n}export function getIndexedDBIndexesFromSchema(e){var r=n(e.primaryKey),t=e.indexes?e.indexes.slice(0):[];t.push([r]),e.properties._meta&&e.properties._meta.properties&&e.properties._meta.properties.lwt&&t.push(["_meta.lwt"]);var a=["_meta.lwt",r];return(t=t.map((function(r){return normalizeIndexedDBIndex(e,r)}))).push(a),t}export var INDEXEDDB_DEFAULT_INDEX_SETITNGS={locale:null,unique:!1};export function createIndexesOnStore(e,r){getIndexedDBIndexesFromSchema(r).forEach((function(r){var t=getIndexName(r);e.createIndex(t,t,INDEXEDDB_DEFAULT_INDEX_SETITNGS)}))}export function enhanceDocDataWithCustomIndexes(t,n){var a=r(n);return Object.entries(t).forEach((function(r){var t=e(r,2),o=t[0],i=(0,t[1])(n);a[o]=i})),a}export function stripCustomIndexesFromDocData(r){var t={};return Object.entries(r).forEach((function(r){var n=e(r,2),a=n[0],o=n[1];a.startsWith(INDEXEDDB_CUSTOM_INDEX_FIELD_PREFIX)||(t[a]=o)})),t}export var CLEANUP_INDEX=["_deleted","_meta.lwt"];export function getIndexableStringByIndexName(e){var r=n(e.primaryKey),t={},o=e.indexes?e.indexes.map((function(e){return Array.isArray(e)?e.slice(0):[e]})):[];o.push([r]),o.forEach((function(r){var n=getIndexName(r=["_deleted"].concat(r));t[n]=a(e,r)}));var i=["_meta.lwt",r],_=getIndexName(i);t[_]=a(e,i);var d=getIndexName(CLEANUP_INDEX);return t[d]=a(e,CLEANUP_INDEX),t}