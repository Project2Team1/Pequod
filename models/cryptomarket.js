module.exports = (sequelize, DataTypes) =>
  sequelize.define("CryptoMarket", {
    name  : DataTypes.STRING,
  });
