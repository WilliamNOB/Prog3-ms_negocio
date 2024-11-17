import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class CostValidator {
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
    description: schema.string({}, [rules.required()]),
    amount: schema.number([rules.required()]),
    invoiceId: schema.number([
      rules.required(),
      rules.exists({ table: "invoices", column: "id" }),
    ]),
    ownerId: schema.number([
      rules.required(),
      rules.exists({ table: "owners", column: "id" }),
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
    "description.required": "The description field is required.",
    "amount.required": "The amount field is required.",
    "invoiceId.required": "The invoiceId field is required.",
    "invoiceId.exists": "The invoiceId must exist in the invoices table.",
    "ownerId.required": "The ownerId field is required.",
    "ownerId.exists": "The ownerId must exist in the owners table.",
  };
}
