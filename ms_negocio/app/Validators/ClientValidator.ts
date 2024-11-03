import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ClientValidator {
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
    name: schema.string({}, [
      rules.alpha(),          // Asegura que el nombre solo contenga letras
      rules.required(),       // Asegura que el nombre es obligatorio
    ]),
    email: schema.string({}, [
      rules.email(),          // Asegura que el formato del email sea válido
      rules.required(),       // Asegura que el email es obligatorio
      rules.regex(/@/)        // Verifica que contenga un '@'
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
    'email.required': 'El email es obligatorio.',
    'email.email': 'El formato del email no es válido.',
    'email.regex': 'El email debe contener un "@"',
    'name.required': 'El nombre es obligatorio.',
    'name.alpha': 'El nombre solo debe contener letras.',
  }
}
