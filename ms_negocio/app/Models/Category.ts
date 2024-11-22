import { DateTime } from "luxon";
import {
  BaseModel,
  belongsTo,
  BelongsTo,
  column,
  hasMany,
  HasMany,
  ManyToMany,
  manyToMany,
} from "@ioc:Adonis/Lucid/Orm";
import Product from "./Product";

export default class Category extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public description: string;

  @column()
  public parentId: number | null;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @manyToMany(() => Product, {
    pivotTable: "category_products",
    localKey: "id",
    pivotForeignKey: "category_id",
    relatedKey: "id",
    pivotRelatedForeignKey: "product_id",
  })
  public products: ManyToMany<typeof Product>;

  @hasMany(() => Category, {
    foreignKey: "parentId",
  })
  public subcategories: HasMany<typeof Category>;

  @belongsTo(() => Category, {
    foreignKey: "parentId",
  })
  public parentCategory: BelongsTo<typeof Category>;
}
