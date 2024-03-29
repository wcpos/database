/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * save, and this file will regenerate automatically.
 */

/**
 * WooCommerce Customer schema
 */
export interface WooCommerceCustomerSchema {
  /**
   * Unique identifier for the resource.
   */
  uuid?: string;
  /**
   * Unique remote identifier for the resource.
   */
  id?: number;
  date_created?: string;
  date_created_gmt?: string;
  date_modified?: string;
  date_modified_gmt?: string;
  /**
   * The email address for the customer.
   */
  email?: string;
  /**
   * Customer first name.
   */
  first_name?: string;
  /**
   * Customer last name.
   */
  last_name?: string;
  role?: string;
  /**
   * Customer login name.
   */
  username?: string;
  /**
   * Customer password.
   */
  password?: string;
  /**
   * List of billing address data.
   */
  billing?: {
    first_name?: string;
    last_name?: string;
    company?: string;
    address_1?: string;
    address_2?: string;
    city?: string;
    postcode?: string;
    country?: string;
    state?: string;
    email?: string;
    phone?: string;
    [k: string]: any;
  };
  /**
   * List of shipping address data.
   */
  shipping?: {
    first_name?: string;
    last_name?: string;
    company?: string;
    address_1?: string;
    address_2?: string;
    city?: string;
    postcode?: string;
    country?: string;
    state?: string;
    [k: string]: any;
  };
  is_paying_customer?: boolean;
  avatar_url?: string;
  /**
   * Meta data.
   */
  meta_data?: {
    /**
     * Meta ID.
     */
    id?: number;
    /**
     * Meta key.
     */
    key?: string;
    /**
     * Meta value.
     */
    value?: string;
    [k: string]: any;
  }[];
  links?: {
    collection?: {
      href?: string;
      [k: string]: any;
    }[];
    self?: {
      href?: string;
      [k: string]: any;
    }[];
    [k: string]: any;
  };
  [k: string]: any;
}
