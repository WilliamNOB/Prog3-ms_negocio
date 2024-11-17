import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class InvoiceValidator {
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
    amount: schema.number([rules.required()]),
    quotaId: schema.number([
      rules.required(),
      rules.exists({ table: "quotas", column: "id" }),
    ]),
    costId: schema.number([
      rules.required(),
      rules.exists({ table: "costs", column: "id" }),
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
    "amount.required": "The amount field is required.",
    "quotaId.required": "The quotaId field is required.",
    "quotaId.exists": "The quotaId must exist in the quotas table.",
    "costId.required": "The costId field is required.",
    "costId.exists": "The costId must exist in the costs table.",
  };
}
