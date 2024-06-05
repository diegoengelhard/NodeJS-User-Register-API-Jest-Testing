const { DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require('../database');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phones: {
        type: DataTypes.JSON,
        allowNull: false
    },
    token: {
        type: DataTypes.STRING,
    },
    isactive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    created: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    modified: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    last_login: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
});

module.exports = User;
