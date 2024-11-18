import { DateTime } from "luxon";
import { BaseModel, belongsTo, BelongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import Invoice from "./Invoice";
import Driver from "./Driver";
import Owner from "./Owner";
import Service from "./Service";

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

  @column()
  public serviceId: number;

  @column()
  public driverId: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => Invoice, {
    foreignKey: "invoiceId",
  })
  public invoice: BelongsTo<typeof Invoice>;

  @belongsTo(() => Owner, {
    foreignKey: "ownerId",
  })
  public owner: BelongsTo<typeof Owner>;

  @belongsTo(() => Service, {
    foreignKey: "serviceId",
  })
  public service: BelongsTo<typeof Service>;

  @belongsTo(() => Driver, {
    foreignKey: "driverId",
  })
  public driver: BelongsTo<typeof Driver>;
}
