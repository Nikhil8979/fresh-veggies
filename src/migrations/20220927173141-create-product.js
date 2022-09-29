"use strict";

module.exports = {
    async up (queryInterface, Sequelize){
        await queryInterface.createTable("Products", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {type: Sequelize.STRING},
            categoryId: {type: Sequelize.INTEGER},
            subCategoryId: {type: Sequelize.INTEGER},
            marketPrice: {type: Sequelize.INTEGER},
            sellingPrice: {type: Sequelize.INTEGER},
            discountType: {type: Sequelize.STRING},
            discount: {type: Sequelize.INTEGER},
            unit: {type: Sequelize.STRING},
            qty: {type: Sequelize.INTEGER},
            stock: {type: Sequelize.INTEGER},
            brandId: {type: Sequelize.INTEGER},
            visibility: {type: Sequelize.STRING},
            productType: {type: Sequelize.STRING},
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
        await queryInterface.dropTable("Products");
    }
};
