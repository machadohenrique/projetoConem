const Sequelize = require('sequelize');
const connection = require('./data');

const candidato = connection.define('candidato', {
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
    },

    filePath: Sequelize.STRING
})

candidato.sync({ force: false }).then(() => {
    console.log("Tabela Criada")
});

module.exports = candidato;