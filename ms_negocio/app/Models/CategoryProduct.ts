import { DateTime } from "luxon";
import { BaseModel, column, HasOne } from "@ioc:Adonis/Lucid/Orm";
import Category from "./Category";

export default class CategoryProduct extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public product_id: number;

  @column()
  public category_id: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  public category: HasOne<typeof Category>;
}
