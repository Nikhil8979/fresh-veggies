"use strict";

module.exports = {
    async up (queryInterface, Sequelize){
        await queryInterface.createTable("Promotions", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            promoType: {type: Sequelize.STRING},
            name: {type: Sequelize.STRING},
            description: {type: Sequelize.TEXT},
            discountType: {type: Sequelize.STRING},
            discount: {type: Sequelize.INTEGER},
            minOrderValue: {type: Sequelize.INTEGER},
            noOfVouchers: {type: Sequelize.INTEGER},
            redeemAllowedPerUser: {type: Sequelize.INTEGER},
            validityStarts: {type: Sequelize.STRING},
            validityEnds: {type: Sequelize.STRING},
            categoryIds: {type: Sequelize.STRING},
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
        await queryInterface.dropTable("Promotions");
    }
};
