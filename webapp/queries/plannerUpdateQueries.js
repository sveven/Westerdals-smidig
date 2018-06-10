const models = require("../models");
const helper = require("./queriesHelperMethods");

module.exports = {
  updateUserWithKolonialId(userId, kolonialUserId) {
    return models.User.findOne({
      where: { Id: userId }
    }).then(user => {
      user.update({
        kolonialUserId: kolonialUserId
      });
    });
  }
};
