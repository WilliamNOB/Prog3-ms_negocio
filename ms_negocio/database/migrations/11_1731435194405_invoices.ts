import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "invoices";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.integer("amount").notNullable();
      table
        .integer("quota_id")
        .unsigned()
        .references("id")
        .inTable("quotas")
        .onDelete("CASCADE");
      table
        .integer("cost_id")
        .unsigned()
        .references("id")
        .inTable("costs")
        .onDelete("CASCADE");
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
