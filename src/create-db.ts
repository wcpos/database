import { createRxDatabase, removeRxDatabase } from 'rxdb';
import { disableVersionCheck } from 'rxdb-premium/plugins/shared';

import log from '@wcpos/utils/src/logger';

import config from './adapter';
import { disableVersionCheck } from 'rxdb-premium/dist/es/shared/version-check.js';

import './plugins';
disableVersionCheck();

/**
 * creates the generic database
 */
export async function createDB<T>(name: string) {
	try {
		const db = await createRxDatabase<T>({
			name: `${name}_v150`,
			...config,
			password: 'posInstanceId',
			localDocuments: true,
			// multiInstance: false,
		});

		return db;
	} catch (error) {
		log.error(error);
	}
}

/**
 * deletes the generic database
 */
export function removeDB(name: string) {
	return removeRxDatabase(name, config.storage);
}
