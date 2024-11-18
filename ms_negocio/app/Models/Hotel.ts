import { DateTime } from "luxon";
import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";
import Service from "./Service";

export default class Hotel extends Service {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public starRating: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
