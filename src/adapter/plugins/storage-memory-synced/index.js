import{replicateRxStorageInstance as e,randomCouchString as t,awaitRxStorageReplicationFirstInSync as s,STORAGE_TOKEN_DOCUMENT_ID as a,flatClone as n,rxStorageInstanceToReplicationHandler as r,ensureRxStorageInstanceParamsAreCorrect as i,INTERNAL_STORE_SCHEMA_TITLE as c,defaultHashSha256 as o,getRxReplicationMetaInstanceSchema as m}from"rxdb";import{RX_LOCAL_DOCUMENT_SCHEMA as h}from"rxdb/plugins/local-documents";import{getRxStorageMemory as l}from"rxdb/plugins/storage-memory";import{MemorySyncedRxStorageInstance as g}from"./memory-synced-storage-instance";import{filter as d,firstValueFrom as p,Subject as u}from"rxjs";var y=l();export var RxStorageMemorySynced=function(){function l(e){this.name="memory-synced",this.statics=Object.assign({},y.statics,{prepareQuery:(e,t)=>e.title===c?this.settings.storage.statics.prepareQuery(e,t):y.statics.prepareQuery(e,t)}),this.firstInstanceTokens={},this.settings=e}return l.prototype.createStorageInstance=async function(l){i(l);var f=l.databaseInstanceToken,I=this;if(l.schema.attachments)throw new Error("The memory-synced plugin does not support attachments");if(l.schema.title===c){var S=await this.settings.storage.createStorageInstance(l),b=S.bulkWrite.bind(S);return S.bulkWrite=async function(e,t){var s=await b(e,t);s.success[a]&&(s.success[a].data.instanceToken===f&&(I.firstInstanceTokens[f]=new Set));return s},S}if(l.schema.title===h.title)return await this.settings.storage.createStorageInstance(l);var k=n(l);this.settings.keepIndexesOnParent||(k.schema=n(k.schema),k.schema.indexes=[]);var x,w=this.settings.storage.createStorageInstance(k),T=y.createStorageInstance(Object.assign({},Object.assign({},l,{multiInstance:!1,databaseInstanceToken:t(10)}),{collectionName:l.collectionName+"-memory-synced-"+t(12)})),v=y.createStorageInstance({databaseName:l.databaseName,collectionName:l.collectionName+"-meta-instance"+t(12),schema:m(l.schema,!1),multiInstance:!1,databaseInstanceToken:t(10),options:{}}),N=new u,P=new u,z=Promise.all([T,v,w]).then((([s,a,n])=>{var i=async(e,s)=>{var a={id:t(10),context:s,input:e},n=p(P.pipe(d((e=>e.id===a.id))));return N.next(a),(await n).output},c=r(n,i,f);return e({identifier:"memorysyncedstorage+"+t(10),pullBatchSize:this.settings.batchSize?this.settings.batchSize:50,pushBatchSize:this.settings.batchSize?this.settings.batchSize:50,replicationHandler:c,conflictHandler:i,forkInstance:s,metaInstance:a,waitBeforePersist:this.settings.waitBeforePersist,hashFunction:o})}));return this.firstInstanceTokens[f]&&!this.firstInstanceTokens[f].has(l.collectionName)?(this.firstInstanceTokens[f].add(l.collectionName),x=T):x=z.then((e=>s(e))),new g(this,l.databaseName,l.collectionName,l.schema,{masterInstancePromise:w,metaInstancePromise:v,forkInstance:await T,initDonePromise:x,replicationStatePromise:z,conflictTasks$:N,resolvedConflictTasks$:P},{})},l}();export function getMemorySyncedRxStorage(e){return new RxStorageMemorySynced(e)}export*from"./memory-synced-types";export*from"./memory-synced-storage-instance";