const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const UserWatchlist = sequelize.define('UserWatchlist', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  animeId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'animes',
      key: 'id',
    },
  },
  mangaId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'mangas',
      key: 'id',
    },
  },
  manhwaId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'manhwas',
      key: 'id',
    },
  },
  lastEpisode: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  lastChapter: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  status: {
    type: DataTypes.ENUM('watching', 'completed', 'dropped', 'plan_to_watch'),
    defaultValue: 'watching',
  },
});

module.exports = UserWatchlist;
