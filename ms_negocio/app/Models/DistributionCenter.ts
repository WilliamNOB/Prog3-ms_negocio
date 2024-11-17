import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Address from './Address'
import Municipality from './Municipality'

export default class DistributionCenter extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public addressId: number

  @column()
  public municipalityId: number

  @hasOne(() => Address)
  public address: HasOne<typeof Address>

  @belongsTo(() => Municipality)
  public municipality: BelongsTo<typeof Municipality>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
