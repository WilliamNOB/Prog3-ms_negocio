import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "restrictions";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.string("description").notNullable();
      table.dateTime("start_date").notNullable();
      table.dateTime("end_date").notNullable();
      table
        .integer("municipality_id")
        .unsigned()
        .references("id")
        .inTable("municipalities")
        .onDelete("CASCADE");
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
