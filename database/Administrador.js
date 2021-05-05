const Sequelize = require('sequelize');
const connection = require('./data');


const administrador = connection.define('administrador', {
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },

    email: {
        type: Sequelize.STRING,
        allowNull: false
    },

    senha: {
        type: Sequelize.STRING,
        allowNull: false
    }

})

administrador.sync({ force: false }).then(() => {
    console.log("Tabela Criada")
})

module.exports = administrador;








