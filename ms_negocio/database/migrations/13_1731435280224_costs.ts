import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "costs";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.string("description").notNullable();
      table.integer("amount").notNullable();
      table
        .integer("invoice_id")
        .unsigned()
        .references("id")
        .inTable("invoices")
        .onDelete("CASCADE");
      table
        .integer("owner_id")
        .unsigned()
        .references("id")
        .inTable("owners")
        .onDelete("CASCADE");
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
