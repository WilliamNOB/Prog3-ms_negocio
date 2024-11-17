import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class InsuranceValidator {
  constructor(protected ctx: HttpContextContract) { }
  public schema = schema.create({
    policyNumber: schema.string({}, [
      rules.required(),
      rules.unique({ table: 'insurances', column: 'policy_number' }),
    ]),

    provider: schema.string({}, [
      rules.required(),
      rules.maxLength(255)
    ]),

    startDate: schema.date({}, [
      rules.required()
    ]),

    endDate: schema.date({}, [
      rules.required()
    ]),

    vehicleId: schema.number([
      rules.required(),
      rules.exists({ table: 'vehicles', column: 'id' })
    ]),
  })


  public messages: CustomMessages = {
    'policyNumber.required': 'El número de póliza es obligatorio',
    'policyNumber.unique': 'El número de póliza ya existe',

    'provider.required': 'El proveedor es obligatorio',
    'provider.maxLength': 'El proveedor no debe exceder los 255 caracteres',

    'startDate.required': 'La fecha de inicio es obligatoria',

    'endDate.required': 'La fecha de fin es obligatoria',

    'vehicleId.required': 'El id del vehículo es obligatorio',
    'vehicleId.exists': 'El vehículo especificado no existe'
  }
}
