export const customersLiteral = {
	title: 'WooCommerce Customer schema',
	version: 0,
	description: 'WooCommerce Customer schema',
	type: 'object',
	primaryKey: 'uuid',
	attachments: {},
	properties: {
		uuid: {
			description: 'Unique identifier for the resource.',
			type: 'string',
			maxLength: 36,
		},
		id: {
			description: 'Unique remote identifier for the resource.',
			type: 'integer',
		},
		date_created: {
			type: 'string',
		},
		date_created_gmt: {
			type: 'string',
		},
		date_modified: {
			type: 'string',
		},
		date_modified_gmt: {
			type: 'string',
		},
		email: {
			description: 'The email address for the customer.',
			type: 'string',
		},
		first_name: {
			description: 'Customer first name.',
			type: 'string',
		},
		last_name: {
			description: 'Customer last name.',
			type: 'string',
		},
		role: {
			type: 'string',
		},
		username: {
			description: 'Customer login name.',
			type: 'string',
		},
		password: {
			description: 'Customer password.',
			type: 'string',
		},
		billing: {
			description: 'List of billing address data.',
			type: 'object',
			properties: {
				first_name: {
					type: 'string',
				},
				last_name: {
					type: 'string',
				},
				company: {
					type: 'string',
				},
				address_1: {
					type: 'string',
				},
				address_2: {
					type: 'string',
				},
				city: {
					type: 'string',
				},
				postcode: {
					type: 'string',
				},
				country: {
					type: 'string',
				},
				state: {
					type: 'string',
				},
				email: {
					type: 'string',
				},
				phone: {
					type: 'string',
				},
			},
		},
		shipping: {
			description: 'List of shipping address data.',
			type: 'object',
			properties: {
				first_name: {
					type: 'string',
				},
				last_name: {
					type: 'string',
				},
				company: {
					type: 'string',
				},
				address_1: {
					type: 'string',
				},
				address_2: {
					type: 'string',
				},
				city: {
					type: 'string',
				},
				postcode: {
					type: 'string',
				},
				country: {
					type: 'string',
				},
				state: {
					type: 'string',
				},
			},
		},
		is_paying_customer: {
			type: 'boolean',
		},
		avatar_url: {
			type: 'string',
		},
		meta_data: {
			description: 'Meta data.',
			type: 'array',
			items: {
				type: 'object',
				properties: {
					id: {
						description: 'Meta ID.',
						type: 'integer',
					},
					key: {
						description: 'Meta key.',
						type: 'string',
					},
					value: {
						description: 'Meta value.',
						type: 'string',
					},
				},
			},
		},
		links: {
			type: 'object',
			properties: {
				collection: {
					type: 'array',
					items: {
						type: 'object',
						properties: {
							href: {
								type: 'string',
							},
						},
					},
				},
				self: {
					type: 'array',
					items: {
						type: 'object',
						properties: {
							href: {
								type: 'string',
							},
						},
					},
				},
			},
		},
	},
} as const;
