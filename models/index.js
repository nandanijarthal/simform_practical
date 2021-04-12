'use strict';


const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const db = {};
//const dotenv = require('dotenv').config('/.env');
const config = require("../config/config.json")[env];
// const db = {};

// let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

// const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.js")(sequelize, Sequelize);
db.role = require("../models/role.js")(sequelize, Sequelize);

module.exports = db;