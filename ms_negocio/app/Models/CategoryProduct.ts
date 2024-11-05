import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Product from './Product'
import Category from './Category'

export default class CategoryProduct extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public product_id: number

  @column()
  public category_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => Product, {
    foreignKey: 'categoryProduct_id', // Clave foránea en la tabla person
  })
  public product: HasOne<typeof Product>

  @hasOne(() => Category, {
    foreignKey: 'categoryProduct_id', // Clave foránea en la tabla person
  })
  public category: HasOne<typeof Category>
}
