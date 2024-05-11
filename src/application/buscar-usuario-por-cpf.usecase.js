const { Either, AppError } = require("../shared/errors");

module.exports = function buscarUsuarioPorCpfUseCase({ usuariosRepository }){
  if (!usuariosRepository) throw new AppError(AppError.dependencias);
  return async function({Cpf}){
    const usuario = await usuariosRepository.buscarPorCpf(Cpf);
    return Either.Rigth(usuario);
  }
}