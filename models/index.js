'use strict'

const fs          = require('fs');
const path        = require('path');
const Sequelize   = require('sequelize');
const config      = require(__dirname + '../config.js');

var sequelize = new Sequelize(config.database, config.username, 
  config.password, {
    host: config.host, 
    dialect: config.dialect
});


db.user = require();



db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;