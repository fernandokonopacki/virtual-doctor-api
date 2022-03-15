const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');
const ValorNaoSuportado = require('../app/errors/ValorNaoSuportadoError');
const { SerializeError } = require('../app/Serializer');
const NaoEncontrado = require('../app/errors/NaoEncontrado');

module.exports = () => {
    var app = express();

    app.use(bodyParser.json());
    app.use((req, res, next) => {
        let formatoRequisitado = req.header('Accept')

        if(formatoRequisitado === '*/*'){
            formatoRequisitado = 'application/json'
        }

        if(formatoRequisitado != 'application/json'){
            res.status(406);
            res.end();
            return
        }

        res.setHeader('Content-type', formatoRequisitado);
        next();
    })

    app.use((error, req, res, next) => {
        let status = 500

        if(error instanceof NaoEncontrado){
            status = 404
        }

        if(error instanceof ValorNaoSuportado){
            status = 406
        }

        const serilizador = new SerializeError(
            res.getHeader('Content-type')
        )

        res.status(status)
        res.send(
            serilizador.serializar({
                mensagem: error.mensagem,
                id: error.id
            })
        )
    })

    consign()
        .include('./app/controllers')
        .into(app);

    return app;
}



