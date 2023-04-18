import { DataTypes } from 'sequelize';
import sequelize from '../database';
import { Producto } from './producto.model';


export const Categoria = sequelize.define('categoria', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  timestamps: true
})

Categoria.hasMany(Producto, {
  foreignKey: 'idCategoria',
  sourceKey: 'id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
})

Producto.belongsTo(Categoria, {
  foreignKey: 'idCategoria',
  targetKey: 'id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
})