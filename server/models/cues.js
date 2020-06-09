const Sequelize = require('sequelize');
const db = require('../db');

const cueList = db.define('cueList', {
  cueNumber: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  duration: {
    type: Sequelize.INTEGER,
  },
  endpoint: {
    type: Sequelize.STRING,
  },
});

module.exports = cueList;
