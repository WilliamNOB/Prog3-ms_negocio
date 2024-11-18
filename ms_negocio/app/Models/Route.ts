import { DateTime } from "luxon";
import {
  BaseModel,
  belongsTo,
  BelongsTo,
  column,
  hasMany,
  HasMany,
  manyToMany,
  ManyToMany,
} from "@ioc:Adonis/Lucid/Orm";
import Address from "./Address";
import Batch from "./Batch";
import Contract from "./Contract";
import Vehicle from "./Vehicle";

export default class Route extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public addressId: number;

  @column()
  public contractId: number;

  @column()
  public vehicleId: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasMany(() => Batch, {
    foreignKey: "routeId",
  })
  public batches: HasMany<typeof Batch>;

  @belongsTo(() => Address, {
    foreignKey: "addressId",
  })
  public address: BelongsTo<typeof Address>;

  @belongsTo(() => Contract, {
    foreignKey: "contractId",
  })
  public contract: BelongsTo<typeof Contract>;

  @belongsTo(() => Vehicle, {
    foreignKey: "vehicleId",
  })
  public vehicle: BelongsTo<typeof Vehicle>;

  @manyToMany(() => Address, {
    pivotTable: "address_routes",
    localKey: "id",
    pivotForeignKey: "route_id",
    relatedKey: "id",
    pivotRelatedForeignKey: "address_id",
  })
  public addresses: ManyToMany<typeof Address>;
}
