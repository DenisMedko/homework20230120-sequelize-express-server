'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Hero extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Hero.hasMany(models.Pictures, {
        foreignKey: 'heroId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        as: 'pictures',
      });
      Hero.belongsToMany(models.Power, {
        foreignKey: 'heroId',
        through: 'heroes_to_powers'
      });
    }
  }
  Hero.init({
    nickname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      },
    },
    realName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        isAlphanumeric: true,
        notEmpty: true,
      },
    },
    originDescription: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    catchPhrase: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    imageId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Hero',
    tableName: 'heroes',
    underscored: true,
  });
  return Hero;
};