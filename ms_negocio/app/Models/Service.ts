import { DateTime } from "luxon";
import {
  BaseModel,
  column,
  manyToMany,
  ManyToMany,
} from "@ioc:Adonis/Lucid/Orm";
import Driver from "./Driver";

export default class Service extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public description: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @manyToMany(() => Driver, {
    pivotTable: "costs",
    localKey: "id",
    pivotForeignKey: "service_id",
    relatedKey: "id",
    pivotRelatedForeignKey: "driver_id",
  })
  public drivers: ManyToMany<typeof Driver>;
}
