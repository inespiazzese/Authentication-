const Sequelize = require("sequelize");
const { sequelize } = require("./index");

const inesSchema = (sequelize, type) => {
  const mySchema = sequelize.define(
    "ines",
    {
      id: { type: type.INTEGER, primaryKey: true, autoIncrement: true },
      firstName: type.STRING,
      lastName: type.STRING,
      email: type.STRING,
      password: type.STRING,
    },
    {
      timestamps: false,
    }
  );

  return mySchema;
};
let User = inesSchema(sequelize, Sequelize);
module.exports = { User };
