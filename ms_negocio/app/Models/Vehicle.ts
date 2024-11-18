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
import Contract from "./Contract";
import Owner from "./Owner";

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

  @hasMany(() => Insurance, {
    foreignKey: "vehicleId",
  })
  public insurances: HasMany<typeof Insurance>;

  @manyToMany(() => Municipality, {
    pivotTable: "operations",
    localKey: "id",
    pivotForeignKey: "vehicle_id",
    relatedKey: "id",
    pivotRelatedForeignKey: "municipality_id",
  })
  public municipalities: ManyToMany<typeof Municipality>;

  @manyToMany(() => Contract, {
    pivotTable: "routes",
    localKey: "id",
    pivotForeignKey: "vehicle_id",
    relatedKey: "id",
    pivotRelatedForeignKey: "contract_id",
  })
  public contracts: ManyToMany<typeof Contract>;

  @manyToMany(() => Owner, {
    pivotTable: "vehicle_owners",
    localKey: "id",
    pivotForeignKey: "vehicle_id",
    relatedKey: "id",
    pivotRelatedForeignKey: "owner_id",
  })
  public owners: ManyToMany<typeof Owner>;

  /*@manyToMany(() => Driver, {
    pivotTable: 'vehicle_drivers',
    localKey: 'id',
    pivotForeignKey: 'vehicle_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'driver_id',
  })
  public drivers: ManyToMany<typeof Driver> */
}
