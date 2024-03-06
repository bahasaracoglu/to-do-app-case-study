const usersModel = require("./users-model");
const tokenHelper = require("../../helper/token-helper");

const isUserExist = async (req, res, next) => {
  try {
    const user_id = req.params.user_id;
    const userExist = await usersModel.getById(user_id);
    if (!userExist) {
      res
        .status(400)
        .json({ message: `Can not found user with id: ${user_id}.` });
    } else {
      next();
    }
  } catch (error) {}
};

const isOwnProfile = async (req, res, next) => {
  try {
    const userParamsid = req.params.id;
    const userid = tokenHelper.decodeTokensPayload(
      req.headers["authorization"]
    ).user_id;

    if (userParamsid == userid) {
      next();
    } else {
      res.status(400).json({
        message: `User with the id: ${userid} does not have permission for this action.`,
      });
    }
  } catch (error) {}
};

module.exports = { isUserExist, isOwnProfile };
