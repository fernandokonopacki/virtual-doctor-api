const Modelo = require('../databases/TabelaPacientes')

module.exports = {
    listar(){
        return Modelo.findAll({raw: true});
    },

    inserir(pacientes){
        return Modelo.create(pacientes);
    }
}