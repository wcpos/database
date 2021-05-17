type RxCollection = import('rxdb/plugins/core').RxCollection;
type RxDocument = import('rxdb/plugins/core').RxDocument;
type Model = import('rxdb/dist/types/types/rx-collection').RxCollectionCreatorBase;

export default {
	rxdb: true,
	prototypes: {},
	overwritable: {},
	hooks: {
		preCreateRxCollection(model: Model) {
			if (!model.statics) model.statics = {};
			if (!model.methods) model.methods = {};

			model.statics.collections = function collections(this: RxCollection) {
				return this.database.collections;
			};

			model.methods.collections = function collections(this: RxDocument) {
				if (!this.collection.collections) {
					console.log('@TODO - why does this collection not have helper??');
					return this.collection.database.collections;
				}
				return this.collection.collections();
			};

			return model;
		},
	},
};