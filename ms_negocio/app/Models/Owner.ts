import { DateTime } from "luxon";
import {
  BaseModel,
  column,
  hasMany,
  HasMany,
  manyToMany,
  ManyToMany,
} from "@ioc:Adonis/Lucid/Orm";
import Cost from "./Cost";
import Vehicle from "./Vehicle";

export default class Owner extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public email: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasMany(() => Cost, {
    foreignKey: "ownerId",
  })
  public costs: HasMany<typeof Cost>;

  @manyToMany(() => Vehicle, {
    pivotTable: "vehicle_owners",
    localKey: "id",
    pivotForeignKey: "owner_id",
    relatedKey: "id",
    pivotRelatedForeignKey: "vehicle_id",
  })
  public vehicles: ManyToMany<typeof Vehicle>;
}
