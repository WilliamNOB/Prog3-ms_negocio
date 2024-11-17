import { DateTime } from "luxon";
import {
  BaseModel,
  column,
  HasMany,
  hasMany,
  manyToMany,
  ManyToMany,
} from "@ioc:Adonis/Lucid/Orm";
import Insurance from "./Insurance";
import Municipality from "./Municipality";
import Route from "./Route";

export default class Vehicle extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public make: string;

  @column()
  public model: string;

  @column()
  public year: number;

  @column()
  public licensePlate: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasMany(() => Insurance)
  public insurances: HasMany<typeof Insurance>;

  @manyToMany(() => Municipality, {
    pivotTable: "operations",
    localKey: "id",
    pivotForeignKey: "vehicle_id",
    relatedKey: "id",
    pivotRelatedForeignKey: "municipality_id",
  })
  public municipalities: ManyToMany<typeof Municipality>;

  @hasMany(() => Route, {
    foreignKey: "vehicle_id",
  })
  public routes: HasMany<typeof Route>;
}
