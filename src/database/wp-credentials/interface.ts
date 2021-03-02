/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * save, and this file will regenerate automatically.
 */

/**
 * WordPress credentials
 */
export interface WPCredentialsSchema {
  localId?: string;
  id?: number;
  username?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  displayName?: string;
  lastAccess?: string;
  consumerKey?: string;
  consumerSecret?: string;
  keyId?: number;
  keyPermissions?: string;
  stores?: string[];
  [k: string]: any;
}