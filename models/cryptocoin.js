module.exports = (sequelize, DataTypes) =>
  sequelize.define("CryptoCoin", {
    name  : DataTypes.STRING,
    symbol: DataTypes.CHAR(3)
  });
