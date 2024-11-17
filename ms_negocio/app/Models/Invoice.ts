import { DateTime } from "luxon";
import {
  BaseModel,
  belongsTo,
  BelongsTo,
  column,
  hasOne,
  HasOne,
} from "@ioc:Adonis/Lucid/Orm";
import Quota from "./Quota";
import Cost from "./Cost";

export default class Invoice extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public amount: number;

  @column()
  public quotaId: number;

  @column()
  public costId: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => Quota, {
    foreignKey: "quotaId",
  })
  public quota: BelongsTo<typeof Quota>;

  @hasOne(() => Cost, {
    foreignKey: "invoiceId",
  })
  public cost: HasOne<typeof Cost>;
}
