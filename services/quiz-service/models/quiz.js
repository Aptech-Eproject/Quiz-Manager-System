'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Quiz extends Model {
    static associate(models) {
      // Quiz has many Questions
      Quiz.hasMany(models.Question, {
        foreignKey: 'quizId',
        as: 'questions',
      });
    }
  }

  Quiz.init({
    quizId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    category: {
      type: DataTypes.ENUM(
        'Mathematics',
        'Science',
        'History',
        'English',
        'Programming',
        'Music',
        'Sport',
        'Art',
        'Business',
        'Healthy'
      ),
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.TEXT,
    duration: DataTypes.INTEGER,
    level: {
      type: DataTypes.ENUM('beginner', 'intermediate', 'advanced'),
    },
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
