"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ChatroomWithUsers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ChatroomWithUsers.belongsTo(models.User, {
        foreignKey: "userId",
        targetKey: "id",
      });

      ChatroomWithUsers.belongsTo(models.Chatroom, {
        foreignKey: "roomId",
        targetKey: "id",
      });
    }
  }
  ChatroomWithUsers.init(
    {
      roomId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ChatroomWithUsers",
    }
  );
  return ChatroomWithUsers;
};
