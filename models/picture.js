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
      });
    }
  }
  Picture.init({
    picPath: DataTypes.STRING,
    field: 'pic_path',
  }, {
    sequelize,
    modelName: 'Picture',
    tableName: 'pictures',
    underscored: true,
  });
  return Picture;
};