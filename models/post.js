
const db = require('./Banco')

const Agendamentos = db.sequelize.define('agendamentos', {
    nome: {
        type: db.Sequelize.STRING
    },
    telefone: {
        type: db.Sequelize.STRING
    }, 
    email: {
        type: db.Sequelize.STRING
    },
    origem: {
        type: db.Sequelize.STRING
    },
    dataContato: {
        type: db.Sequelize.DATE
    },
    observacao: {
        type: db.Sequelize.TEXT
    }
})

//Agendamentos.sync({force:true})

module.exports = Agendamentos