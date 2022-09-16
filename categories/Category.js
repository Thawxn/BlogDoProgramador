const Sequelize = require('sequelize');
const connection = require('../database/database');

const Category = connection.define('categories', {
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },slug: {                           //o slug é um texto que aparece logo após o seu domínio como parte do link permanente que leva até o conteúdo.
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Category;