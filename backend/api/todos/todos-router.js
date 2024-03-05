const router = require("express").Router();
const todosModel = require("./todos-model");
const todosMw = require("./todos-middleware");
//const favsMw = require("../favorites/favorites-middleware");
const usersMw = require("../users/users-middleware");
//const commentsMw = require("../comments/comments-middleware");
const restricted = require("../middleware/restricted");

// brings all todos for feed

// brings all todos of user with id
router.get("/:id", restricted, usersMw.isUserExist, async (req, res, next) => {
  try {
    const user_id = req.params.id;
    const todos = await todosModel.getBy({ user_id: user_id });
    res.status(200).json(todos);
  } catch (error) {
    next(error);
  }
});

//creates new todo
router.post(
  "/:user_id",
  restricted,
  todosMw.isUserAllowed,
  todosMw.checkPayload,
  async (req, res, next) => {
    try {
      const { body, image_upload, file_upload } = req.body;
      const newTodo = {
        user_id: req.params.user_id,
        body: body,
        image_upload: image_upload,
        file_upload: file_upload,
      };
      const insertedTodo = await todosModel.create(newTodo);
      if (!insertedTodo) {
        next(error);
      } else {
        res
          .status(200)
          .json({ message: "New post successfully submitted.", insertedTodo });
      }
    } catch (error) {
      next(error);
    }
  }
);

//updates post

/*
router.put(
  "/:user_id/:post_id",
  restricted,
  postsMw.isUserAllowed,
  //postsMw.isUserOwnThisPost,
  postsMw.checkPayload,
  async (req, res, next) => {
    try {
      const post_id = req.params.post_id;
      const user_id = req.params.user_id;
      const { body, image_url } = req.body;
      const newPost = {
        user_id: user_id,
        body: body,
        image_url: image_url,
      };
      const updatedPost = await postsModel.update(post_id, newPost);
      if (!updatedPost) {
        res.status(200).json({ message: "Post cannot updated.", updatedPost });
      } else {
        res.status(200).json({
          message: "Edited post successfully submitted.",
          updatedPost,
        });
      }
    } catch (error) {
      next(error);
    }
  }
);*/

//deletes post

// router.delete(
//   "/:user_id/:todo_id",
//   restricted,
//   todosMw.isUserOwnThisPost,
//   async (req, res, next) => {
//     try {
//       const id = req.params.todo_id;
//       const deletedTodo = await todosModel.remove(id);
//       if (!deletedTodo) {
//         res.status(400).json({ message: `Todo with id: ${id} is not found.` });
//       } else {
//         res.status(200).json({ message: "Todo removed successfully." });
//       }
//     } catch (error) {
//       next(error);
//     }
//   }
// );

// router.get(
//   "/:id/favorites",
//   restricted,
//   favsMw.checkFavsByPostId,
//   async (req, res, next) => {
//     try {
//       res.status(200).json(req.favUsers);
//     } catch (error) {
//       next(error);
//     }
//   }
// );

// router.get(
//   "/:id/comments",
//   restricted,
//   commentsMw.checkCommentsByPostId,
//   async (req, res, next) => {
//     try {
//       res.status(200).json(req.comments);
//     } catch (error) {
//       next(error);
//     }
//   }
// );

module.exports = router;
