/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * save, and this file will regenerate automatically.
 */

/**
 * WooCommerce Order Shipping Line schema
 */
export interface WooCommerceOrderShippingLineSchema {
  localId?: string;
  id?: number;
  /**
   * Shipping method name.
   */
  method_title?: string;
  /**
   * Shipping method ID.
   */
  method_id?: string;
  /**
   * Shipping instance ID.
   */
  instance_id?: string;
  /**
   * Line total (after discounts).
   */
  total?: string;
  /**
   * Line total tax (after discounts).
   */
  total_tax?: string;
  /**
   * Line taxes.
   */
  taxes?: {
    /**
     * Tax rate ID.
     */
    id?: number;
    /**
     * Tax total.
     */
    total?: string;
    [k: string]: any;
  }[];
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
  [k: string]: any;
}