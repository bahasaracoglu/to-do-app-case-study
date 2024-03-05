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
      body: "Just had the most amazing sunset hike! Nature's beauty never fails to inspire me. 🌅 #naturelovers #hikingadventures",
      user_id: 1,
      file_upload: "",
      image_upload: "",
    },
    {
      body: "Can't believe it's already June! Time flies when you're having fun. 😄 Looking forward to making the most of this summer. ☀️ #summerfun #goodtimes",
      user_id: 1,
      file_upload: "",
      image_upload: "",
    },
    {
      body: "Trying out a new recipe today, and it turned out delicious! 😋 Cooking is such a therapeutic activity for me. #foodie #homemade",
      user_id: 2,
      file_upload: "",
      image_upload: "",
    },
    {
      body: "Feeling grateful for all the incredible people in my life. Surrounding yourself with positive vibes is the key to happiness. 🙌 #gratitude #positivity",
      user_id: 2,
      file_upload: "",
      image_upload: "",
    },
    {
      body: "Just finished reading an amazing book that kept me hooked till the last page. 📚 Highly recommend it to all the fellow bookworms out there! #booklover #readinglist",
      user_id: 3,
      file_upload: "",
      image_upload: "",
    },
    {
      body: "Spent the afternoon exploring a hidden gem in the city. Sometimes the best discoveries are right in your own backyard. #adventureawaits #cityexploration",
      user_id: 3,
      file_upload: "",
      image_upload: "",
    },
    {
      body: "Taking a break from screens and enjoying a digital detox. It's refreshing to disconnect and focus on the present moment. #unplug #mindfulness",
      user_id: 3,
      file_upload: "",
      image_upload: "",
    },
  ]);
};
