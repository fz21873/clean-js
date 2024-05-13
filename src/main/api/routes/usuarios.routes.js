const { Router } = require("express");
const { usuariosRepository } = require("../../../infra/db/typeorm/repositories/usuarios.repository");
const { cadastrarUsuarioUseCase } = require("../../../application/UsuarioUseCase/cadastrar-usuario.usecase");
const cadastrarUsuarioController = require("../../../interface-adapters/controllers/usuarioController/cadastrar-usuario.controller");


const usuariosRoutes = Router();

usuariosRoutes.post('/',async (resquest, response) =>{
    const httpResquest = {
        body : resquest.body
    };

    const usuariosRepositoryFn = usuariosRepository();
    const cadastarUsuarioUseCaseFn =  cadastrarUsuarioUseCase({
        usuariosRepository: usuariosRepositoryFn,
    });
    const {statusCode, body} = cadastrarUsuarioController({
        cadastarUsuarioUseCase: cadastarUsuarioUseCaseFn,
        httpResquest
    });

    return response.status(statusCode).json(body);
});

module.exports = {usuariosRoutes};