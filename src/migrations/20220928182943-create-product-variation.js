"use strict";

module.exports = {
    async up (queryInterface, Sequelize){
        await queryInterface.createTable("ProductVariations", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            image: {type: Sequelize.STRING},
            name: {type: Sequelize.STRING},
            unit: {type: Sequelize.STRING},
            marketPrice: {type: Sequelize.INTEGER},
            sellingPrice: {type: Sequelize.INTEGER},
            discountType: {type: Sequelize.STRING},
            discount: {type: Sequelize.INTEGER},
            qty: {type: Sequelize.INTEGER},
            status: {type: Sequelize.BOOLEAN},
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
        await queryInterface.dropTable("ProductVariations");
    }
};
