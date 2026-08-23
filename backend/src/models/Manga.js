const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Manga = sequelize.define('Manga', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  genre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rating: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
    validate: {
      min: 0,
      max: 10,
    },
  },
  coverImage: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('ongoing', 'completed'),
    defaultValue: 'ongoing',
  },
  totalChapters: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  releaseYear: {
    type: DataTypes.INTEGER,
  },
});

module.exports = Manga;
