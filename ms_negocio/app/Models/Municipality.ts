import { DateTime } from "luxon";
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  HasMany,
  hasMany,
  ManyToMany,
  manyToMany,
} from "@ioc:Adonis/Lucid/Orm";
import Department from "./Department";
import Address from "./Address";
import DistributionCenter from "./DistributionCenter";
import Vehicle from "./Vehicle";
import Restriction from "./Restriction";

export default class Municipality extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public department_id: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => Department, {
    //Nombre de la clave foránea de la entidad dominante
    foreignKey: "department_id",
  })
  public department: BelongsTo<typeof Department>;

  @hasMany(() => Address, {
    //nombre de la clave foránea que permite la relación
    foreignKey: "municipality_id",
  })
  public addresses: HasMany<typeof Address>;

  @hasMany(() => DistributionCenter)
  public distributionCenters: HasMany<typeof DistributionCenter>;

  @manyToMany(() => Vehicle, {
    pivotTable: "operations",
    localKey: "id",
    pivotForeignKey: "municipality_id",
    relatedKey: "id",
    pivotRelatedForeignKey: "vehicle_id",
  })
  public vehicles: ManyToMany<typeof Vehicle>;

  @hasMany(() => Restriction, {
    foreignKey: "municipalityId",
  })
  public restrictions: HasMany<typeof Restriction>;
}
