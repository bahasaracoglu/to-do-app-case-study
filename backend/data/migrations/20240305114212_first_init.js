/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema

    .createTable("users", (users) => {
      users.increments("user_id");
      users.string("name_surname").notNullable();
      users.string("password").notNullable();
      users.string("email").notNullable().unique();
    })

    .createTable("todos", (todos) => {
      todos.increments("todo_id");
      todos.string("body", 280);
      todos.timestamp("created_at").defaultTo(knex.fn.now());
      todos.string("file_upload");
      todos.string("image_upload");
      todos
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("user_id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("tokenBlackList", (t) => {
      t.increments(), t.string("token").notNullable();
      t.timestamp("createdate").defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("tokenBlackList")
    .dropTableIfExists("todos")
    .dropTableIfExists("users");
};
