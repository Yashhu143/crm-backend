const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Employee = require('./employee');

const Enquiry = sequelize.define('Enquiry', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  courseInterest: { type: DataTypes.STRING },
  claimed: { type: DataTypes.BOOLEAN, defaultValue: false },
  counselorId: { type: DataTypes.INTEGER, allowNull: true },
});

Employee.hasMany(Enquiry, { foreignKey: 'counselorId' });
Enquiry.belongsTo(Employee, { foreignKey: 'counselorId' });

module.exports = Enquiry;
