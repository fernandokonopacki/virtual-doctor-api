const TabelaPacientes = require('../databases/TabelaPacientes');
const PacienteModel = require('../models/PacienteModel');
const Model = require('../models/PacienteModel');
const { SerializePacientes } = require('../Serializer');
const Serializer = require('../Serializer').SerializePacientes;
const PacienteService = require('../services/PacienteService')

module.exports = roteador => {

    roteador.get('/pacientes', async (req, res) => {
        const result = await Model.listar();
        res.status(200);
        const serializer = new Serializer(
            res.getHeader('Content-Type')
        );
        res.send(
            serializer.serializar(result)
        );
    });

    roteador.post('/pacientes', async (req, res, next) =>{
        try{
            const input = req.body;
            const paciente = new PacienteService(input);
            await paciente.create(input);
            res.status(201);
            const serilizador = new SerializePacientes(
                res.getHeader('Content-Type')
            )
            res.send(
                serilizador.serializar(paciente)
            );
        } catch(error){
            next(error);
        }
    });

    roteador.put('/pacientes/:id', async (req, res, next) => {
        const id = req.params.id;
        const input = req.body;
        const data = Object.assign({}, input, {id: id});
        const paciente = new PacienteService(data)
        await paciente.atualizar();
    })

};
