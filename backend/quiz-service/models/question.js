'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Question belongs to Quiz
      Question.belongsTo(models.Quiz, {
        foreignKey: 'quizId',
        as: 'quiz'
      });

      // Question have many Options
      Question.hasMany(models.Option, {
        foreignKey: 'questionId',
        as: 'options'
      });
    }
  }
  Question.init({
    questionId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    quizId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    questionText: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    questionExplain: {
      type: DataTypes.TEXT,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Question',
    tableName: 'questions',
  });

  return Question;
};