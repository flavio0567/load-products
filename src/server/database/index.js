const Sequelize = require("sequelize");
const dbConfig = require("../config/database.config");

const Product = require("../../models/Product.model");

const connection = new Sequelize(dbConfig);

Product.init(connection);

module.exports = connection;
