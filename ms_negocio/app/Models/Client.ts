import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Contract from './Contract'
import Product from './Product'

export default class Client extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public email: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Contract,{
    //nombre de la clave foránea que permite la relación
    foreignKey: 'client_id'
  })
  public contracts: HasMany<typeof Contract>

  @hasMany(() => Product,{
    //nombre de la clave foránea que permite la relación
    foreignKey: 'client_id'
  })
  public products: HasMany<typeof Product>
}
