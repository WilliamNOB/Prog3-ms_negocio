import { DateTime } from "luxon";
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  HasMany,
  hasMany,
} from "@ioc:Adonis/Lucid/Orm";
import Client from "./Client";
import Route from "./Route";

export default class Contract extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public date: DateTime;

  @column()
  public value: number;

  @column()
  public client_id: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => Client, {
    //Nombre de la clave foránea de la entidad dominante
    foreignKey: "client_id",
  })
  public client: BelongsTo<typeof Client>;

  @hasMany(() => Route, {
    foreignKey: "contract_id",
  })
  public routes: HasMany<typeof Route>;
}
