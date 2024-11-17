import { DateTime } from "luxon";
import {
  BaseModel,
  column,
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

  @manyToMany(() => Category, {
    pivotTable: "category_subcategories",
    localKey: "id",
    pivotForeignKey: "category_id",
    relatedKey: "id",
    pivotRelatedForeignKey: "subcategory_id",
  })
  public subcategories: ManyToMany<typeof Category>;

  @manyToMany(() => Category, {
    pivotTable: "category_subcategories",
    localKey: "id",
    pivotForeignKey: "subcategory_id",
    relatedKey: "id",
    pivotRelatedForeignKey: "category_id",
  })
  public parentCategories: ManyToMany<typeof Category>;
}
