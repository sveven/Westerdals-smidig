"use strict";

var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var basename = path.basename(__filename);
var env = process.env.NODE_ENV || "development";
var config = require("../config")[env];
var db = {};

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable], {
    host: config.host,
    dialect: config.dialect
  });
} else {
  var sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    { host: config.host, dialect: config.dialect }
  );
}

fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach(file => {
    var model = sequelize["import"](path.join(__dirname, file));

    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

if (env === "test") {
  sequelize.sync({ force: true, match: /_test$/ }).then(() => {
    module.exports = db;
  });
} else {
  module.exports = db;
}
