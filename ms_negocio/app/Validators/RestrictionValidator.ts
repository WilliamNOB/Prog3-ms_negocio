import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class RestrictionValidator {
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
    startDate: schema.date({}, [rules.required()]),
    endDate: schema.date({}, [rules.required()]),
    municipalityId: schema.number([
      rules.required(),
      rules.exists({ table: "municipalities", column: "id" }),
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
    "startDate.required": "The start date field is required.",
    "endDate.required": "The end date field is required.",
    "municipalityId.required": "The municipalityId field is required.",
    "municipalityId.exists":
      "The municipalityId must exist in the municipalities table.",
  };
}
