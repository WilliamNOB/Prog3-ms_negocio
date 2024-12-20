import { DateTime } from "luxon";
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  HasMany,
  hasMany,
} from "@ioc:Adonis/Lucid/Orm";
import Product from "./Product";
import Route from "./Route";

export default class Batch extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public routeId: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasMany(() => Product, {
    foreignKey: "batchId",
  })
  public products: HasMany<typeof Product>;

  @belongsTo(() => Route, {
    foreignKey: "routeId",
  })
  public route: BelongsTo<typeof Route>;
}
