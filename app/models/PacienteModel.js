const Modelo = require('../databases/TabelaPacientes')

module.exports = {
    listar(){
        return Modelo.findAll({raw: true});
    },

    inserir(pacientes){
        return Modelo.create(pacientes);
    },

    async pegarPorId(id){
        const encontrado = await Modelo.findOne({
            where: {
                id: id
            }
        })

        if(!encontrado){
            throw new NaoEncontrado('Fornecedor');
        }

        return encontrado
    }
}