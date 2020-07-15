/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * save, and this file will regenerate automatically.
 */

/**
 * UI Settings for each section of the POS
 */
export interface UISettingsSchema {
  id?: string;
  store_id?: string;
  section?: string;
  sortBy?: string;
  sortDirection?: string;
  width?: string;
  columns?: {
    key?: string;
    order?: number;
    hide?: boolean;
    disableSort?: boolean;
    flexGrow?: number;
    flexShrink?: number;
    width?: string;
    [k: string]: any;
  }[];
  display?: {
    key?: string;
    order?: number;
    hide?: boolean;
    [k: string]: any;
  }[];
  [k: string]: any;
}