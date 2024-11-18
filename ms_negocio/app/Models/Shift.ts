import { DateTime } from "luxon";
import { BaseModel, belongsTo, BelongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import Driver from "./Driver";

export default class Shift extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public startTime: DateTime;

  @column()
  public endTime: DateTime;

  @column()
  public driverId: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => Driver, {
    foreignKey: "driverId",
  })
  public driver: BelongsTo<typeof Driver>;
}
