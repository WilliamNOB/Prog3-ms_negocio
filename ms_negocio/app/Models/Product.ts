import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Client from './Client'
import CategoryProduct from './CategoryProduct'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public description: string

  @column()
  public price: number

  @column()
  public stock: number

  @column()
  public client_id: number

  @column()
  public category_product_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Client, {
    foreignKey: 'client_id', // Clave foránea
  })
  public client: BelongsTo<typeof Client>

  @belongsTo(() => CategoryProduct, {
    foreignKey: 'categoryProduct_id', // Clave foránea
  })
  public categoryProduct: BelongsTo<typeof CategoryProduct>
}
