import { DateTime } from "luxon";
import { BaseModel, belongsTo, BelongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import Invoice from "./Invoice";

export default class Cost extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public description: string;

  @column()
  public amount: number;

  @column()
  public invoiceId: number;

  @column()
  public ownerId: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => Invoice, {
    foreignKey: "invoiceId",
  })
  public invoice: BelongsTo<typeof Invoice>;
}
