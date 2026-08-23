const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Chapter = sequelize.define('Chapter', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  mangaId: {
    type: DataTypes.INTEGER,
    allowNull: false,
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
  chapterNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  images: {
    type: DataTypes.TEXT,
    allowNull: false,
    get() {
      const rawValue = this.getDataValue('images');
      return rawValue ? JSON.parse(rawValue) : [];
    },
    set(value) {
      this.setDataValue('images', JSON.stringify(value));
    },
  },
});

module.exports = Chapter;
