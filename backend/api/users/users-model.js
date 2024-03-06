const db = require("../../data/db-config");

async function getById(id) {
  const user = await db("users as u")
    .where("user_id", id)
    .select("u.user_id", "u.name_surname", "u.email")
    .first();
  return user;
}

async function getByEmail(email) {
  const user = await db("users").where("email", email).first();
  return user;
}

async function create(user) {
  const [insertedUser] = await db("users as u").insert(user);

  return getById(insertedUser);
}

module.exports = {
  getByEmail,
  getById,
  create,
};
