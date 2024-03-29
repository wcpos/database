import schema from './schema.json';

export type CustomerSchema = import('./interface').WooCommerceCustomerSchema;
export type CustomerDocument = import('rxdb').RxDocument<CustomerSchema, CustomerMethods>;
export type CustomerCollection = import('rxdb').RxCollection<
	CustomerDocument,
	CustomerMethods,
	CustomerStatics
>;

type CustomerStatics = Record<string, never>;
type CustomerMethods = Record<string, never>;

export const customers = {
	schema,
	localDocuments: true, // needed for custom checkpoint
	options: {
		searchFields: [
			'first_name',
			'last_name',
			'email',
			'username',
			'billing.first_name',
			'billing.last_name',
			'billing.email',
			'billing.company',
			'billing.phone',
		],
	},
};
