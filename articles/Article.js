const Sequelize = require('sequelize');
const connection = require('../database/database');
const Category = require('../categories/Category')

const Article = connection.define('articles', {
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },slug: {                               //o slug é um texto que aparece logo após o seu domínio como parte do link permanente que leva até o conteúdo.
        type: Sequelize.STRING,
        allowNull: false
    },body:{
        type: Sequelize.TEXT,
        allowNull: false
    }
})

Article.belongsTo(Category);
Category.hasMany(Article);

module.exports = Article;