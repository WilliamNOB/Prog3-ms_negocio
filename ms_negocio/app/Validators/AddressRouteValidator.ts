import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class AddressRouteValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string([ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string([
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    addressId: schema.number([
      rules.required(),
      rules.exists({ table: "addresses", column: "id" }),
    ]),
    routeId: schema.number([
      rules.required(),
      rules.exists({ table: "routes", column: "id" }),
    ]),
    batchId: schema.number([
      rules.required(),
      rules.exists({ table: "batches", column: "id" }),
    ]),
  });
  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages: CustomMessages = {
    "addressId.required": "The addressId field is required.",
    "addressId.exists": "The addressId must exist in the addresses table.",
    "routeId.required": "The routeId field is required.",
    "routeId.exists": "The routeId must exist in the routes table.",
    "batchId.required": "The batchId field is required.",
    "batchId.exists": "The batchId must exist in the batches table.",
  };
}
