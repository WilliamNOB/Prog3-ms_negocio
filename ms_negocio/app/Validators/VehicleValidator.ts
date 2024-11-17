import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class VehicleValidator {
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
    make: schema.string({}, [rules.required()]),
    model: schema.string({}, [rules.required()]),
    year: schema.number([
      rules.required(),
      rules.range(1886, new Date().getFullYear()),
    ]),
    licensePlate: schema.string({}, [
      rules.required(),
      rules.unique({ table: "vehicles", column: "license_plate" }),
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
    "make.required": "Make is required",
    "model.required": "Model is required",
    "year.required": "Year is required",
    "year.range": "Year must be between 1886 and the current year",
    "licensePlate.required": "License plate is required",
    "licensePlate.unique": "License plate is already in use",
  };
}
