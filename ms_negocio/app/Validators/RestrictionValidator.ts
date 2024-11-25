import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

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
    description: schema.string({ trim: true }, [
      rules.required(),
      rules.maxLength(255),
    ]),
    init: schema.date({ format: 'yyyy-MM-dd HH:mm:ss' }, [
      rules.required(),
    ]),
    end: schema.date({ format: 'yyyy-MM-dd HH:mm:ss' }, [
      rules.required(),
    ]),
    municipality_id: schema.number([
      rules.required(),
      rules.exists({ table: 'municipalities', column: 'id' }),
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
    'description.required': 'La descripción es obligatoria.',
    'description.maxLength': 'La descripción no puede tener más de 255 caracteres.',
    'init.required': 'La fecha de inicio es obligatoria.',
    'end.required': 'La fecha de fin es obligatoria.',
    'municipality_id.required': 'El municipio es obligatorio.',
    'municipality_id.exists': 'El municipio seleccionado no existe.'
  }
}