const Sequelize = require('sequelize');
const db = require('../db');

const cueList = db.define('cueList', {
  listName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = cueList;
