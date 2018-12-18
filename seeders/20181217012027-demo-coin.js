"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('CryptoCoins', [
      { name: "Bitcoin" , symbol: "BTC", createdAt: new Date(), updatedAt: new Date() },
      { name: "Ethereum", symbol: "ETH", createdAt: new Date(), updatedAt: new Date() },
      { name: "Stellar" , symbol: "XLM", createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('CryptoCoins', null, {});
  }
};
