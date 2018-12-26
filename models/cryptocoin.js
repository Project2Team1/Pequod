module.exports = (sequelize, DataTypes) =>
  sequelize.define("CryptoCoin", {

    name  : {
      type: DataTypes.STRING,

      allowNull: false,

      validate: {
        len: [1]
      }
    },

    symbol: {
      type: DataTypes.STRING,

      allowNull: false,
      unique: true,

      validate: {
        is: /^[A-Z]{2,5}$/
      }
    }

  });
