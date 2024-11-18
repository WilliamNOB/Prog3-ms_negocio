import { DateTime } from "luxon";
import { BaseModel, column, hasOne, HasOne } from "@ioc:Adonis/Lucid/Orm";
import Service from "./Service";

export default class Admin extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public serviceId: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasOne(() => Service, {
    foreignKey: "adminId",
  })
  public service: HasOne<typeof Service>;
}
