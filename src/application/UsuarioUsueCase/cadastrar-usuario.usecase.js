const { Either } = require("../../shared/errors");
const AppError = require("../../shared/errors/AppError");
const { valorJaCadastrado } = require("../../shared/errors/Either");

module.exports = function cadastrarUsuarioUseCase({ usuariosRepository }){
   if (!usuariosRepository) throw new AppError(AppError.dependencias);
    return async function ({nome_completo, cpf, telefone, endereco, email}) {
      const checaCampos = nome_completo && cpf && telefone && endereco && email
      if (!checaCampos) throw new AppError(AppError.camposObrigatoriosAusentes);

      const checaSeJaExisteUmUsuarioCadastradoComCpf = await usuariosRepository.existeCpf(cpf);
      if(checaSeJaExisteUmUsuarioCadastradoComCpf) return Either.Left(valorJaCadastrado('cpf'));

      const checaSeJaExisteUmUsuarioCadastradoComEmail = await usuariosRepository.existeEmail(email);
      if(checaSeJaExisteUmUsuarioCadastradoComEmail) return Either.Left(valorJaCadastrado('email'));
      
      await usuariosRepository.cadastrar({
        nome_completo, 
        cpf, 
        telefone, 
        endereco, 
        email
      });
      return Either.Rigth(null);
    };
};