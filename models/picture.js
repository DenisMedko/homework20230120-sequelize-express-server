'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Picture extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Picture.belongsTo(models.Hero, {
        foreignKey: 'heroId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          notNull: true,
        },
      });
    }
  }
  Picture.init({
    picPath: {
      type: DataTypes.STRING,
      field: 'pic_path',
      validate: {
        notEmpty: true,
      },
    },
  }, {
    sequelize,
    modelName: 'Picture',
    tableName: 'pictures',
    underscored: true,
  });
  return Picture;
};