import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "routes";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.string("name").notNullable();
      table
        .integer("address_id")
        .unsigned()
        .references("id")
        .inTable("addresses")
        .onDelete("CASCADE");
      table
        .integer("contract_id")
        .unsigned()
        .references("id")
        .inTable("contracts")
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
