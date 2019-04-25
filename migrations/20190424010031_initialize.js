exports.up = function(knex, Promise) {
  return knex.schema
    .createTable("candidate", function(table) {
      table.increments("id").primary();
      table.string("firstName", 255).notNullable();
      table.string("lastName", 255).notNullable();
      table.string("description", 1000);
      table.integer("experience");
      table.string("contactNumber", 10);
      table.json("address");
      table.bigInteger("createdAt").notNullable();
      table.bigInteger("updatedAt").notNullable();
    })
    .createTable("skill", function(table) {
      table.increments("id").primary();
      table.string("name", 255).notNullable();
      table.string("type", 255).notNullable();
      table.string("description", 1000);
      table.bigInteger("createdAt").notNullable();
      table.bigInteger("updatedAt").notNullable();
    })
    .createTable("candidate_skills", function(table) {
      table.increments("id").primary();
      table
        .integer("candidateId")
        .unsigned()
        .references("id")
        .inTable("candidate")
        .onDelete("CASCADE")
        .index();
      table
        .integer("skillId")
        .unsigned()
        .references("id")
        .inTable("skill")
        .onDelete("CASCADE")
        .index();
    });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists("candidate_skills")
    .dropTableIfExists("candidate")
    .dropTableIfExists("skill");
};
