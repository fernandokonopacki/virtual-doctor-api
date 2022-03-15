const moment = require('moment');
const PacienteModel = require('../models/PacienteModel')


class PacienteService{
    constructor({id, nome, email, dataNascimento, endereco, bairro, estado, numero, descricao, dataCriacao, dataAtualizacao, versao}){
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.dataNascimento = dataNascimento;
        this.endereco = endereco;
        this.bairro = bairro;
        this.estado = estado;
        this.numero = numero;
        this.descricao = descricao;
        this.dataCriacao = dataCriacao;
        this.dataAtualizacao = dataAtualizacao;
        this.versao = versao;
    }

    async create() {
        const dataNascimento = moment(this.dataNascimento, 'DD/MM/YYYY').format('YYYY-MM-DD hh:mm:ss')

        const result = await PacienteModel.inserir({
            nome: this.nome,
            email: this.email,
            dataNascimento: dataNascimento,
            endereco: this.endereco,
            bairro: this.bairro,
            estado: this.estado,
            numero: this.numero,
            descricao: this.descricao,
        })

        this.id = result.id;
        this.dataCriacao = result.dataCriacao;
        this.dataAtualizacao = result.dataAtualizacao;
        this.versao = result.versao;
    }

    async atualizar(){
        await PacienteModel.pegarPorId(this.id)
        const campos = ['nome', 'email', 'dataNascimento', 'endereco', 'bairro', 'estado', 'numero', 'descricao']
        const dadosParaAtualizar = {}

        campos.forEach((campo) => {
            const valor = this[campo]

            if(typeof valor === 'string' && valor.length > 0){
                dadosParaAtualizar[campo] = valor
            }
        })

        if(Object.keys(dadosParaAtualizar).length === 0){
            throw new DadosNaoFornecidos()
        }

        await PacienteModel.atualizar(this.id, dadosParaAtualizar)
    }
}

module.exports = PacienteService;