'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Option extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Quiz belongs to Question
      Option.belongsTo(models.Question, {
        foreignKey: 'questionId',
        as: 'question'
      });
    }
  }
  Option.init({
    optionId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    questionId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    optionText: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    isTrueOption: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'Option',
    tableName: 'options',
  });
  return Option;
};