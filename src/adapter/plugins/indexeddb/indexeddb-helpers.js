var e=this&&this.__awaiter||function(e,t,n,r){function o(e){return e instanceof n?e:new n((function(t){t(e)}))}return new(n||(n=Promise))((function(n,a){function i(e){try{s(r.next(e))}catch(e){a(e)}}function c(e){try{s(r.throw(e))}catch(e){a(e)}}function s(e){e.done?n(e.value):o(e.value).then(i,c)}s((r=r.apply(e,t||[])).next())}))},t=this&&this.__generator||function(e,t){var n,r,o,a,i={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return a={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function c(e){return function(t){return s([e,t])}}function s(a){if(n)throw new TypeError("Generator is already executing.");for(;i;)try{if(n=1,r&&(o=2&a[0]?r.return:a[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,a[1])).done)return o;switch(r=0,o&&(a=[2&a[0],o.value]),a[0]){case 0:case 1:o=a;break;case 4:return i.label++,{value:a[1],done:!1};case 5:i.label++,r=a[1],a=[0];continue;case 7:a=i.ops.pop(),i.trys.pop();continue;default:if(!(o=i.trys,(o=o.length>0&&o[o.length-1])||6!==a[0]&&2!==a[0])){i=0;continue}if(3===a[0]&&(!o||a[1]>o[0]&&a[1]<o[3])){i.label=a[1];break}if(6===a[0]&&i.label<o[1]){i.label=o[1],o=a;break}if(o&&i.label<o[2]){i.label=o[2],i.ops.push(a);break}o[2]&&i.ops.pop(),i.trys.pop();continue}a=t.call(e,i)}catch(e){a=[6,e],r=0}finally{n=o=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}};import{ensureNotFalsy as n,getPrimaryFieldOfPrimaryKey as r,promiseWait as o,PROMISE_RESOLVE_VOID as a}from"rxdb";import{createIndexesOnStore as i}from"./indexeddb-index-helpers";export var INDEXEDDB_DOCS_STORE_SUFFIX="documents";export var INDEXEDDB_DOCS_STORE_ATTACHMENTS_SUFFIX="attachments";export var TRANSACTION_SETTINGS={durability:"relaxed"};export var RX_STORAGE_NAME_INDEXEDDB="indexeddb";var c=0;export function attachmentObjectId(e,t){return e+"||"+t}var s=new Map;function u(e,t){var r=s.get(e);return r||(r=a),r=n(r).then((function(){return t()})),s.set(e,r),r}function d(n,r,a){var i=this,s=c++,d=a.indexedDB,l=function(){return e(i,void 0,void 0,(function(){return t(this,(function(e){switch(e.label){case 0:return[4,o(0)];case 1:return e.sent(),[2,u(n,(function(){return new Promise((function(e,t){var r=d.open(n);r.onerror=function(e){console.error(s+": OPEN IDB DATABASE "+n+" ERROR"),t(e)},r.onsuccess=function(t){var n=r.result;e(n),f(h,n)},addStoresDuringOnUpgradeNeeded(h,r)}))}))]}}))}))},h={debugId:s,closed:!1,storage:r,settings:a,refreshIDBDatabase:l,creationPromise:l(),name:n,refCount:0,storesToOpen:[]};return h}function f(e,t){t.onversionchange=function(n){e.closed||(t.close(),e.creationPromise=e.refreshIDBDatabase())}}export function getIndexedDBState(e,t,r,o){var a=e.indexedDBStates.get(r);return a||(a=d(r,e,t),e.indexedDBStates.set(r,a)),a.storesToOpen=a.storesToOpen.concat(o),a.refCount=a.refCount+1,a.creationPromise.then((function(){return openStoresOnExistingDatabase(n(a))})).then((function(){return n(a)}))}var l=0;export function getDatabaseAddStoresCount(){return l}export function openStoresOnExistingDatabase(n){return e(this,void 0,void 0,(function(){var r,o=this;return t(this,(function(a){return r=n.settings.indexedDB,0===n.storesToOpen.length?[2]:(n.creationPromise=n.creationPromise.then((function(a){return e(o,void 0,void 0,(function(){var o,i,c,s=this;return t(this,(function(d){return o=new Set(Array.from(a.objectStoreNames)),0===n.storesToOpen.filter((function(e){return!o.has(getStoreNamesForStorageInstance(e.collectionName,e.schema).documentStore)})).length?[2,a]:(l+=1,i=a.version,c=i+1,a.close(),[2,u(n.name,(function(){return new Promise((function(o,a){return e(s,void 0,void 0,(function(){var e;return t(this,(function(t){return(e=r.open(n.name,c)).onerror=function(e){console.error(n.debugId+": ERROR openStoresOnExistingDatabase() openRequest: error "),a(e)},e.onsuccess=function(t){var r=e.result;f(n,r),o(r)},e.onblocked=function(e){},addStoresDuringOnUpgradeNeeded(n,e),[2]}))}))}))}))])}))}))})),[2,n.creationPromise])}))}))}export function getStoreNamesForStorageInstance(e,t){var n=t.version;return{documentStore:e+"-"+n+"-"+INDEXEDDB_DOCS_STORE_SUFFIX,attachmentsStore:e+"-"+n+"-"+INDEXEDDB_DOCS_STORE_ATTACHMENTS_SUFFIX}}export function addStoresDuringOnUpgradeNeeded(e,t){t.onupgradeneeded=function(n){var o=t.result,a=o.objectStoreNames;e.storesToOpen.forEach((function(e){var t=r(e.schema.primaryKey),n=getStoreNamesForStorageInstance(e.collectionName,e.schema);if(!a.contains(n.documentStore)){var c=o.createObjectStore(n.documentStore,{keyPath:t,autoIncrement:!1});i(c,e.schema),e.schema.attachments&&o.createObjectStore(n.attachmentsStore,{keyPath:"docIdWithAttachmentId",autoIncrement:!1})}})),e.storesToOpen=[]}}export function closeIndexedDBDatabase(n){return e(this,void 0,void 0,(function(){return t(this,(function(e){return n.closed?[2]:(n.refCount=n.refCount-1,0===n.refCount?(n.closed=!0,n.storage.indexedDBStates.delete(n.name),[2,n.creationPromise.then((function(e){return e.close()}))]):[2])}))}))}