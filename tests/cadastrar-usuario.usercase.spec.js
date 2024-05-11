const cadastrarUsuarioUsecase = require("../src/application/cadastrar-usuario.usecase");
const AppError = require("../src/shared/errors/AppError");

describe('Cadastrar usuario Usecase',function(){
    const usuariosRepository = {
        cadastrar: jest.fn()
    }
test('Deve poder cadastrar um usuario', async function() {
    const usuarioDTO = {
      nome_completo : 'nome_valido',
      cpf: 'cpf_valido',
      telefone: 'telefone_valido',
      endereco: 'endereço_valido',
      email: 'email_vaido'
    };
    const sut = cadastrarUsuarioUsecase({usuariosRepository});
    const output = await sut(usuarioDTO);

    expect(output).toBeUndefined();
    expect(usuariosRepository.cadastrar).toHaveBeenCalledWith(usuarioDTO);
    expect(usuariosRepository.cadastrar).toHaveBeenCalledTimes(1);
  });

test("Debe retornar um throw AppError se o usuariosRepository não for fornecido", function() {
    expect(() => cadastrarUsuarioUsecase({})).toThrow(new AppError(AppError.dependencias));
});
});