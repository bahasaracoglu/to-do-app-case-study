const db = require("../../data/db-config");

function getAll() {
  return db("todos");
}

function getAllById(id) {
  return db("todos").where("user_id", id);
}

async function getBy(filter) {
  const todos = await db("todos").where(filter);
  return todos;
}

async function getById(id) {
  const post = await db("todos").where("todo_id", id).first();
  return post;
}

async function create(todo) {
  const [insertedToDo] = await db("todos").insert(todo);
  return getById(insertedToDo);
}

async function remove(id) {
  return db("todos").where("todo_id", id).del();
}

async function update(id, todo) {
  await db("todos").where("todo_id", id).update(todo);

  return getById(id);
}

module.exports = {
  getAll,
  getAllById,
  getBy,
  getById,
  create,
  remove,
  update,
};
