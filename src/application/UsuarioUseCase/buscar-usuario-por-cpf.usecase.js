const { Either, AppError } = require("../../shared/errors");

module.exports = function buscarUsuarioPorCpfUseCase({ usuariosRepository }){
  if (!usuariosRepository) throw new AppError(AppError.dependencias);
  return async function({Cpf}){
    if(!Cpf) throw new AppError(AppError.camposObrigatoriosAusentes);
    
    const usuario = await usuariosRepository.buscarPorCpf(Cpf);
    return Either.Rigth(usuario);
  }
}