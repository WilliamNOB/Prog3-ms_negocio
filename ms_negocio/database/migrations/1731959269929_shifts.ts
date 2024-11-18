import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "shifts";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.dateTime("start_time").notNullable();
      table.dateTime("end_time").notNullable();
      table
        .integer("driver_id")
        .unsigned()
        .references("id")
        .inTable("drivers")
        .onDelete("CASCADE");
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
