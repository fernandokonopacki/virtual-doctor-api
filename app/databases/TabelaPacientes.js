const Sequelize = require('sequelize');
const conn = require("./config/Connection");

const columns = {
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    dataNascimento: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    endereco: {
        type: Sequelize.STRING,
        allowNull: false
    },
    bairro: {
        type: Sequelize.STRING,
        allowNull: false
    },
    estado: {
        type: Sequelize.STRING,
        allowNull: false
    },
    numero: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    descrição: {
        type: Sequelize.STRING,
        allowNull: true
    }

}

const options = {
    freezeTableName: true,
    tableName: 'pacientes',
    timestamps: true,
    createdAt: 'dataCriação',
    updatedAt: 'dataAtualizacao',
    version: 'versao'
}

module.exports = conn.define('pacientes', columns, options)