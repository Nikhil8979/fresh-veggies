// eslint-disable-next-line no-undef
const crypto = require("crypto");

module.exports = {
    // eslint-disable-next-line no-unused-vars
    async up (queryInterface, Sequelize){
        await queryInterface.bulkInsert("Users", [{
            name: "Nikhil Singh",
            email: "nikhilsingh7834@gmail.com",
            mobile: "8979154644",
            password: crypto.createHash("md5").update("admin").digest("hex"),
            status: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        }], {});
    },

    // async down (queryInterface, Sequelize){
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    // }
};
