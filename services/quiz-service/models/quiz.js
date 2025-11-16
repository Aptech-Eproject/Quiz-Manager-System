'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Quiz extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Quiz belongs to Category
      Quiz.belongsTo(models.Category, {
        foreignKey: 'categoryId',
        as: 'category'
      });

      // Quiz has many Questions
      Quiz.hasMany(models.Question, {
        foreignKey: 'questionId',
        as: 'questions'
      })
    }
  }
  Quiz.init({
    quizId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.TEXT,
    duration: DataTypes.INTEGER,
    level: DataTypes.STRING,
    thumbnail: DataTypes.STRING,
    pass_score: DataTypes.INTEGER,
    status: {
      type: DataTypes.ENUM('draft', 'public', 'cancel'),
      defaultValue: 'draft'
    }
  }, {
    sequelize,
    modelName: 'Quiz',
    tableName: 'quizzes',
    timestamps: true
  });

  return Quiz;
};