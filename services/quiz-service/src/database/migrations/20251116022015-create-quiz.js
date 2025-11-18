'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('quizzes', {
      quizId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      category: {
        type: Sequelize.ENUM(
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
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT
      },
      duration: {
        type: Sequelize.INTEGER,
      },
      level: {
        type: Sequelize.ENUM('beginner', 'intermediate', 'advanced'),
      },
      thumbnail: {
        type: Sequelize.STRING
      },
      pass_score: {
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.ENUM('draft', 'public', 'cancel'),
        defaultValue: 'draft'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('quizzes');
  }
};