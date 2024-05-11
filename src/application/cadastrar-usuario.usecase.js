const AppError = require("../shared/errors/AppError");

module.exports = function cadastrarUsuarioUseCase({  usuariosRepository }){
   if (!usuariosRepository) throw new AppError(AppError.dependencias);
    return async function ({nome_completo, cpf, telefone, endereco, email}) {
      const checaCampos = nome_completo && cpf && telefone && endereco && email
      if (!checaCampos) throw new AppError(AppError.camposObrigatoriosAusentes);
      await usuariosRepository.cadastrar({
        nome_completo, 
        cpf, 
        telefone, 
        endereco, 
        email
      });
    };
};