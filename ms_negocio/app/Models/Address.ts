import { DateTime } from "luxon";
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  HasMany,
  hasMany,
} from "@ioc:Adonis/Lucid/Orm";
import Municipality from "./Municipality";
import Route from "./Route";

export default class Address extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public street: string;

  @column()
  public reference: string;

  @column()
  public municipality_id: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => Municipality, {
    //Nombre de la clave foránea de la entidad dominante
    foreignKey: "municipality_id",
  })
  public municipality: BelongsTo<typeof Municipality>;

  @hasMany(() => Route, {
    foreignKey: "address_id",
  })
  public routes: HasMany<typeof Route>;
}
