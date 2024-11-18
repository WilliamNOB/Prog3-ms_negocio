import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "address_routes";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table
        .integer("address_id")
        .unsigned()
        .references("id")
        .inTable("addresses")
        .onDelete("CASCADE");
      table
        .integer("route_id")
        .unsigned()
        .references("id")
        .inTable("routes")
        .onDelete("CASCADE");
      table
        .integer("batch_id")
        .unsigned()
        .references("id")
        .inTable("batches")
        .onDelete("CASCADE");
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
