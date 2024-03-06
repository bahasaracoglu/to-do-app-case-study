/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").truncate();
  await knex("todos").truncate();

  await knex("users").insert([
    {
      name_surname: "elonmusk",
      password: "$2a$10$dFwWjD8hi8K2I9/Y65MWi.WU0qn9eAVaiBoRSShTvuJVGw8XpsCiq", // password "1234"
      email: "elonmusk@notmail.com",
    },
    {
      name_surname: "barackobama",
      password: "$2a$10$dFwWjD8hi8K2I9/Y65MWi.WU0qn9eAVaiBoRSShTvuJVGw8XpsCiq", // password "1234"
      email: "barackobama@notmail.com",
    },
    {
      name_surname: "justinbieber",
      password: "$2a$10$dFwWjD8hi8K2I9/Y65MWi.WU0qn9eAVaiBoRSShTvuJVGw8XpsCiq", // password "1234"
      email: "justinbieber@notmail.com",
    },
  ]);
  await knex("todos").insert([
    {
      body: "Prepare presentation for tomorrow's meeting.",
      user_id: 1,
      file_upload: "",
      image_upload: "",
    },
    {
      body: "Go grocery shopping for dinner tonight.",
      user_id: 1,
      file_upload: "",
      image_upload: "",
    },
    {
      body: "Complete weekly exercise routine.",
      user_id: 2,
      file_upload: "",
      image_upload: "",
    },
    {
      body: "Add a new book to the reading list.",
      user_id: 2,
      file_upload: "",
      image_upload: "",
    },
    {
      body: "Provide feedback to students and organize exams.",
      user_id: 3,
      file_upload: "",
      image_upload: "",
    },
    {
      body: "Plan and execute house cleaning.",
      user_id: 3,
      file_upload: "",
      image_upload: "",
    },
    {
      body: "Get ingredients to try a new recipe.",
      user_id: 3,
      file_upload: "",
      image_upload: "",
    },
  ]);
};
