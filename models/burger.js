module.exports = function (sequelize, DataTypes) {
  var burgers = sequelize.define("burgers", {
      burger_name: DataTypes.STRING,
      devoured: DataTypes.BOOLEAN
  }, {
      freezeTableName: true
  });
  return burgers;
};