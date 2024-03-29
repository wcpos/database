/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * save, and this file will regenerate automatically.
 */

/**
 * WooCommerce Product Category schema
 */
export interface WooCommerceProductCategorySchema {
  /**
   * Unique identifier for the resource.
   */
  uuid?: string;
  /**
   * Unique remote identifier for the resource.
   */
  id?: number;
  /**
   * Category name.
   */
  name?: string;
  /**
   * An alphanumeric identifier for the resource unique to its type.
   */
  slug?: string;
  /**
   * The ID for the parent of the resource.
   */
  parent?: number;
  /**
   * HTML description of the resource.
   */
  description?: string;
  /**
   * Category archive display type.
   */
  display?: "default" | "products" | "subcategories" | "both";
  /**
   * Image data.
   */
  image?: {
    /**
     * Image ID.
     */
    id?: number;
    /**
     * The date the image was created, in the site's timezone.
     */
    date_created?: string;
    /**
     * The date the image was last modified, in the site's timezone.
     */
    date_modified?: string;
    /**
     * Image URL.
     */
    src?: string;
    /**
     * Image name.
     */
    title?: string;
    /**
     * Image alternative text.
     */
    alt?: string;
    [k: string]: any;
  };
  /**
   * Menu order, used to custom sort the resource.
   */
  menu_order?: number;
  /**
   * Number of published products for the resource.
   */
  count?: number;
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
