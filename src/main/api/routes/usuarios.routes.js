const { Router } = require("express");
const cadastraUsuarioCompose = require("../composers/cadastra-usuario.compose");


const usuariosRoutes = Router();

usuariosRoutes.post('/',async (resquest, response) =>{
    const httpResquest = {
        body : resquest.body
    };

    const {statusCode, body} = cadastraUsuarioCompose(httpResquest);

    return response.status(statusCode).json(body);
});

module.exports = {usuariosRoutes};