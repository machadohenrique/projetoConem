const Sequelize = require('sequelize');

const connection = new Sequelize('portal', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection;