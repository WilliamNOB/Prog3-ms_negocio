import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Person from './Person'

export default class Company extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public NIT: number

  @column()
  public person_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => Person, {
    foreignKey: 'person_id', // Clave foránea en la tabla person
  })
  public person: HasOne<typeof Person>
}
