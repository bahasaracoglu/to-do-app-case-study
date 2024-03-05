const router = require("express").Router();
const usersModel = require("../users/users-model");
const {
  checkPayload,
  checkPayloadLogin,
  isUserAlreadyExist,
  hashedPassword,
  isUserExist,
  passwordCheck,
} = require("./auth-middleware");
const restricted = require("../middleware/restricted");
const tokenHelper = require("../../helper/token-helper");

router.post(
  "/register",
  checkPayload,
  isUserAlreadyExist,
  hashedPassword,

  async (req, res, next) => {
    const { name_surname, password, email } = req.body;

    const newUser = {
      name_surname: name_surname,
      password: password,
      email: email,
    };

    try {
      const insertedUser = await usersModel.create(newUser);

      res
        .status(200)
        .json({ message: "User successfully created.", insertedUser });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/login",
  checkPayloadLogin,
  isUserExist,
  passwordCheck,
  (req, res, next) => {
    try {
      res.status(201).json({
        message: "User successfully logged in.",
        token: req.token,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.get("/logout", restricted, (req, res, next) => {
  try {
    tokenHelper.logout(req.headers.authorization);
    res.json({ message: "User succesfully logged out." });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
