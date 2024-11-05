import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AddressValidator {
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
    street: schema.string({ trim: true }, [
      rules.required(),
      rules.maxLength(255),
    ]),
    
    reference: schema.string.optional({ trim: true }, [
      rules.maxLength(500),
    ]),

    municipality_id: schema.number([
      rules.required(),
      rules.exists({ table: 'municipalities', column: 'id' }), // Verifica que el municipio exista
    ]),
  })

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
    'street.required': 'La calle es un campo obligatorio',
    'street.maxLength': 'La calle no debe exceder los 255 caracteres',

    'reference.maxLength': 'La referencia no debe exceder los 500 caracteres',

    'municipality_id.required': 'El municipio es obligatorio',
    'municipality_id.exists': 'El municipio especificado no existe',
  }
}
