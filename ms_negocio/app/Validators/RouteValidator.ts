import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class RouteValidator {
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
    name: schema.string({}, [rules.required()]),
    addressId: schema.number([
      rules.required(),
      rules.exists({ table: "addresses", column: "id" }),
    ]),
    contractId: schema.number([
      rules.required(),
      rules.exists({ table: "contracts", column: "id" }),
    ]),
    vehicleId: schema.number([
      rules.required(),
      rules.exists({ table: "vehicles", column: "id" }),
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
    "name.required": "The name field is required.",
    "addressId.required": "The addressId field is required.",
    "addressId.exists": "The addressId must exist in the addresses table.",
    "contractId.required": "The contractId field is required.",
    "contractId.exists": "The contractId must exist in the contracts table.",
    "vehicleId.required": "The vehicleId field is required.",
    "vehicleId.exists": "The vehicleId must exist in the vehicles table.",
  };
}
