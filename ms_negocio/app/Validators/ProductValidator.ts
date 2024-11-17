import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class ProductValidator {
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
      rules.required(),
      rules.maxLength(255), // El nombre no debe exceder los 255 caracteres
    ]),

    description: schema.string.optional({ trim: true }, [
      rules.maxLength(500), // La descripción puede tener hasta 500 caracteres
    ]),

    price: schema.number([
      rules.required(),
      rules.range(0, 999999.99), // El precio debe estar entre 0 y 999999.99
    ]),

    stock: schema.number([
      rules.required(),
      rules.unsigned(), // Stock debe ser un número positivo
      rules.range(0, 100000), // Stock no debe exceder los 100,000 unidades
    ]),

    batch_id: schema.number([rules.required(), rules.unsigned()]),
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
    "name.required": "El nombre del producto es obligatorio",
    "name.maxLength":
      "El nombre del producto no debe exceder los 255 caracteres",

    "description.maxLength":
      "La descripción no debe exceder los 500 caracteres",

    "price.required": "El precio del producto es obligatorio",
    "price.range": "El precio debe ser un valor entre 0 y 999999.99",

    "stock.required": "El stock del producto es obligatorio",
    "stock.unsigned": "El stock debe ser un número positivo",
    "stock.range": "El stock debe estar entre 0 y 100,000 unidades",
  };
}
