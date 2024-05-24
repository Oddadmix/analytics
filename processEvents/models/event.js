const sequelize = require('../db/db.js');
const { DataTypes } = require('sequelize');

const Event = sequelize.define('event', {
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  type: {
    type: DataTypes.TINYINT, // 0: 'pageview', 1: 'click', 2: 'EXIT'
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
  },
  browserId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  websiteId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userAgent: {
    type: DataTypes.STRING,
  },
  location: {
    type: DataTypes.STRING,
  },
});

module.exports = Event;
