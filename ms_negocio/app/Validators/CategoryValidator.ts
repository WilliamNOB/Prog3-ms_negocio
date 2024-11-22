import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class CategoryValidator {
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
    name: schema.string({ trim: true }, [
      rules.required(), // Hacer que el nombre sea obligatorio
      rules.maxLength(255), // Limitar el nombre a 255 caracteres
    ]),

    description: schema.string({ trim: true }, [
      rules.required(), // Hacer que la descripción sea obligatoria
      rules.maxLength(500), // Limitar la descripción a 500 caracteres
    ]),

    parentId: schema.number.optional([
      rules.exists({ table: "categories", column: "id" }), // Verificar que el parentId exista en la tabla categories
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
    "name.maxLength": "The name field cannot exceed 255 characters.",
    "description.required": "The description field is required.",
    "description.maxLength":
      "The description field cannot exceed 500 characters.",
    "parentId.exists": "The parentId must exist in the categories table.",
  };
}
