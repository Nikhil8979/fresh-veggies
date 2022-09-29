"use strict";

module.exports = {
    async up (queryInterface, Sequelize){
        await queryInterface.createTable("ProductDetails", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            key: {type: Sequelize.TEXT},
            value: {type: Sequelize.TEXT},
            productId: {type: Sequelize.INTEGER},
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
    async down (queryInterface, Sequelize){
        await queryInterface.dropTable("ProductDetails");
    }
};
