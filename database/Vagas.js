const Sequelize = require('sequelize');
const connection = require('./data');

const vagasEmprego = connection.define('vagasEmprego', {
    nomeVaga: {
        type: Sequelize.STRING,
        allowNull: false
    },

    descricaoVaga: {
        type: Sequelize.STRING,
        allowNull: false
    },

    cidade: {
        type: Sequelize.STRING,
        allowNull: false
    },

    salario: {
        type: Sequelize.STRING,
        allowNull: false
    },

    dataPublicacaoVaga: {
        type: Sequelize.DATE,
        allowNull: false
    }
})

vagasEmprego.sync({ force: false }).then(() => {
    console.log("Tabela Criada");
});

module.exports = vagasEmprego;





