import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "products";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.string("name").notNullable();
      table.string("description");
      table.decimal("price").notNullable();
      table.integer("stock").notNullable();
      table
        .integer("batch_id")
        .unsigned()
        .references("id")
        .inTable("batches")
        .onDelete("CASCADE");
      table
        .integer("client_id")
        .unsigned()
        .references("id")
        .inTable("clients")
        .onDelete("CASCADE");

      table
        .integer("category_product_id")
        .unsigned()
        .references("id")
        .inTable("category_products")
        .onDelete("CASCADE");
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
