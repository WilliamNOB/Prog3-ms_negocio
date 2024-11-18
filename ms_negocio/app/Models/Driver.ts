import { DateTime } from "luxon";
import {
  BaseModel,
  column,
  manyToMany,
  ManyToMany,
} from "@ioc:Adonis/Lucid/Orm";
import Vehicle from "./Vehicle";

export default class Driver extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public licenseNumber: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @manyToMany(() => Vehicle, {
    pivotTable: "vehicle_drivers",
    localKey: "id",
    pivotForeignKey: "driver_id",
    relatedKey: "id",
    pivotRelatedForeignKey: "vehicle_id",
  })
  public vehicles: ManyToMany<typeof Vehicle>;
}
