const AppError = require("../shared/errors/AppError");

module.exports = function cadastrarUsuarioUseCase({ usuariosRepository }){
   if (!usuariosRepository) throw new AppError(AppError.dependencias);
    return async function ({nome_completo, cpf, telefone, endereco, email}) {
      const checaCampos = nome_completo && cpf && telefone && endereco && email
      if (!checaCampos) throw new AppError(AppError.camposObrigatoriosAusentes);
      const checaSeJaExisteUmUsuarioCadastradoComCpf = await usuariosRepository.existeCpf(cpf);
      if(checaSeJaExisteUmUsuarioCadastradoComCpf) throw new AppError('CPF ja cadastrado');
      await usuariosRepository.cadastrar({
        nome_completo, 
        cpf, 
        telefone, 
        endereco, 
        email
      });
    };
};