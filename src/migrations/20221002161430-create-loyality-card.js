'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('LoyalityCards', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      totalPoints: {
        type: Sequelize.INTEGER
      },
      discountType: {
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.INTEGER
      },
      minOrderAmount: {
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.INTEGER
      },
      image: {
        type: Sequelize.STRING
      },
      categoryIds: {
        type: Sequelize.TEXT
      },
      status: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('LoyalityCards');
  }
};