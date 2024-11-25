import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "vehicle_owners";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table
        .integer("owner_id")
        .unsigned()
        .references("id")
        .inTable("owners")
        .onDelete("CASCADE");
      table
        .integer("vehicle_id")
        .unsigned()
        .references("id")
        .inTable("vehicles")
        .onDelete("CASCADE");
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}