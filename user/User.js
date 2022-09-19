const Sequelize = require('sequelize');
const connection = require('../database/database');

const User = connection.define('users', {
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },password: {                           //o slug é um texto que aparece logo após o seu domínio como parte do link permanente que leva até o conteúdo.
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = User;