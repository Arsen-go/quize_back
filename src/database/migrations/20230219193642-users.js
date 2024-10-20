'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        unique: true,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        comment: 'Every user must have one account.',
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        comment: 'This is the user nickname and will be unique',
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      role: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'TEACHER',
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
      },
    });

    await queryInterface.addIndex('users', {
      name: 'idx_user_name',
      fields: ['name'],
      unique: true,
    });

    await queryInterface.addIndex('users', {
      name: 'idx_user_email',
      fields: ['email'],
      unique: true,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeIndex('users', 'idx_user_email');
    await queryInterface.removeIndex('users', 'idx_user_name');
    await queryInterface.dropTable('users');
  },
};
