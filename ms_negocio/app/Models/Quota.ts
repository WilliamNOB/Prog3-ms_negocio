import { DateTime } from "luxon";
import {
  BaseModel,
  belongsTo,
  BelongsTo,
  column,
  hasOne,
  HasOne,
} from "@ioc:Adonis/Lucid/Orm";
import Contract from "./Contract";
import Invoice from "./Invoice";

export default class Quota extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public amount: number;

  @column()
  public dueDate: DateTime;

  @column()
  public contractId: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => Contract, {
    foreignKey: "contractId",
  })
  public contract: BelongsTo<typeof Contract>;

  @hasOne(() => Invoice, {
    foreignKey: "quotaId",
  })
  public invoice: HasOne<typeof Invoice>;
}
