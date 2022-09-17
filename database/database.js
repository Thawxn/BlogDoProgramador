const Sequelize = require('sequelize');

const connection = new Sequelize('guiapress', 'root', '40028922Th.',{
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-3:00'
})

module.exports = connection;