import { DateTime } from "luxon";
import {
  BaseModel,
  belongsTo,
  BelongsTo,
  column,
  manyToMany,
  ManyToMany,
} from "@ioc:Adonis/Lucid/Orm";
import Driver from "./Driver";
import Admin from "./Admin";

export default class Service extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public description: string;

  @column()
  public adminId: number;

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

  @belongsTo(() => Admin, {
    foreignKey: "adminId",
  })
  public admin: BelongsTo<typeof Admin>;
}
