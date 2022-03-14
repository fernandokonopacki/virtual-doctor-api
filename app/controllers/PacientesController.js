const TabelaPacientes = require('../databases/TabelaPacientes');
const PacienteModel = require('../models/PacienteModel');
const Model = require('../models/PacienteModel')
const PacienteService = require('../services/PacienteService')


module.exports = roteador => {

    roteador.get('/pacientes', async (req, res) => {
        const result = await Model.listar();
        res.status(200);
        res.send(result);
    })

    roteador.post('/pacientes', async (req, res, next) =>{
        const input = req.body;
        const pacienteService = new PacienteService(input);
        await pacienteService.create(input);
        res.status(201);
        res.send(pacienteService);
    });

};
