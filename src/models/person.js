import { DataTypes } from 'sequelize';
import sequelize from '../database/index.js'; //conexión Sequelize 

const Person = sequelize.define('person', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  document: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  address: {
    type: DataTypes.STRING(200),
    allowNull: true,
  },
  phone_number: {
    type: DataTypes.STRING(15),
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  registration_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING(255), //  contraseña hasheada
    allowNull: false,
  },
}, {
  tableName: 'person', 
  timestamps: false, 
});



export default Person;