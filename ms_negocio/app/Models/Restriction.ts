import { DateTime } from "luxon";
import { BaseModel, belongsTo, BelongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import Municipality from "./Municipality";

export default class Restriction extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public description: string;

  @column.dateTime()
  public startDate: DateTime;

  @column.dateTime()
  public endDate: DateTime;

  @column()
  public municipalityId: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => Municipality, {
    foreignKey: "municipalityId",
  })
  public municipality: BelongsTo<typeof Municipality>;
}
