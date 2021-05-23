const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Dept extends Model {}

Dept.init(
  {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
    name: {
      type: DataTypes.STRING
      },
  },
  {
    sequelize,
    timestamps: false,
    underscored: true,
    modelName: 'department'
  }
);

module.exports = Dept;