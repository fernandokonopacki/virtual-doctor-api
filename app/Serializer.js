const ValorNaoSuportado = require('./errors/ValorNaoSuportadoError')

class Serializer {
    json(dados){
        return JSON.stringify(dados);
    }

    serializar(dados){
        dados = this.filter(dados)

        if(this.contentType === 'application/json'){
            return this.json(dados);
        }

        throw new ValorNaoSuportado(this.contentType);
    }

    filter(dados){
        if (Array.isArray(dados)){
            dados = dados.map(item => {
                return this.filterObjects(item)
            })
        } else {
            dados = this.filterObjects(dados)
        }
        return dados;
    }

    filterObjects(dados){
        const newObject = {}

        this.publicField.forEach((campo) => {
            if(dados.hasOwnProperty(campo)) {
                newObject[campo] = dados[campo]
            }
        })
        return newObject
    }
}

class SerializePacientes extends Serializer{
    constructor(contentType){
        super();
        this.contentType = contentType;
        this.publicField = [
            'id',
            'nome'
        ]
    }
}

class SerializeError extends Serializer {
    constructor(contentType, camposExtras){
        super()
        this.contentType = contentType
        this.publicField = [
            'id',
            'mensagem'
        ]
    }
}

module.exports = {
    Serializer: Serializer,
    SerializePacientes: SerializePacientes,
    SerializeError: SerializeError
}