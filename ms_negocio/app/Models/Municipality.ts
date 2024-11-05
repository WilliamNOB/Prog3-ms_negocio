import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Department from './Department'
import Address from './Address'

export default class Municipality extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public department_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Department,{
    //Nombre de la clave foránea de la entidad dominante
    foreignKey: 'department_id'
    })
    public department: BelongsTo<typeof Department>

    @hasMany(() => Address,{
      //nombre de la clave foránea que permite la relación
      foreignKey: 'municipality_id'
    })
    public addresses: HasMany<typeof Address>
}
