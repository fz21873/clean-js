const { cadastrarUsuarioUseCase } = require("../../../application/UsuarioUseCase/cadastrar-usuario.usecase");
const { usuariosRepository } = require("../../../infra/db/typeorm/repositories/usuarios.repository");
const cadastrarUsuarioController = require("../../../interface-adapters/controllers/usuarioController/cadastrar-usuario.controller");


module.exports = async function cadastrarUsuarioCompose(httpResquest){
    const usuariosRepositoryFn = usuariosRepository();
    const cadastarUsuarioUseCaseFn =  cadastrarUsuarioUseCase({
        usuariosRepository: usuariosRepositoryFn,
    });
    const controller = cadastrarUsuarioController({
        cadastarUsuarioUseCase: cadastarUsuarioUseCaseFn,
        httpResquest
    });

    return controller;
}