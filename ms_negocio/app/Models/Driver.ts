import { DateTime } from "luxon";
import {
  BaseModel,
  column,
  hasMany,
  HasMany,
  manyToMany,
  ManyToMany,
} from "@ioc:Adonis/Lucid/Orm";
import Vehicle from "./Vehicle";
import Shift from "./Shift";
import Cost from "./Cost";

export default class Driver extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public licenseNumber: string;

  @column()
  public email: string;

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

  @hasMany(() => Shift, {
    foreignKey: "driverId",
  })
  public shifts: HasMany<typeof Shift>;

  @hasMany(() => Cost, {
    foreignKey: "driverId",
  })
  public costs: HasMany<typeof Cost>;
}
