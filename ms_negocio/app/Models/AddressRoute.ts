import { DateTime } from "luxon";
import {
  BaseModel,
  belongsTo,
  BelongsTo,
  column,
  hasOne,
  HasOne,
} from "@ioc:Adonis/Lucid/Orm";
import Address from "./Address";
import Batch from "./Batch";
import Route from "./Route";

export default class AddressRoute extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public addressId: number;

  @column()
  public routeId: number;

  @column()
  public batchId: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => Address, {
    foreignKey: "addressId",
  })
  public address: BelongsTo<typeof Address>;

  @belongsTo(() => Route, {
    foreignKey: "routeId",
  })
  public route: BelongsTo<typeof Route>;

  @hasOne(() => Batch, {
    foreignKey: "batchId",
  })
  public batch: HasOne<typeof Batch>;
}
