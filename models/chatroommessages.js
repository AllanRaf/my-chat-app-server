"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ChatroomMessages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ChatroomMessages.belongsTo(models.User, {
        foreignKey: "userId",
        targetKey: "id",
      });

      ChatroomMessages.belongsTo(models.Chatroom, {
        foreignKey: "roomId",
        targetKey: "id",
      });
    }
  }
  ChatroomMessages.init(
    {
      roomId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      message: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "ChatroomMessages",
    }
  );
  return ChatroomMessages;
};
