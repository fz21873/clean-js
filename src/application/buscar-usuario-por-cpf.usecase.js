const { Either } = require("../shared/errors");

module.exports = function buscarUsuarioPorCpfUseCase({ usuariosRepository }){
  return async function({Cpf}){
    const usuario = await usuariosRepository.buscarPorCpf(Cpf);
    return Either.Rigth(usuario);
  }
}