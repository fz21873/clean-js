const cadastrarUsuarioUsecase = require("../src/application/cadastrar-usuario.usecase");
const { Either } = require("../src/shared/errors");
const AppError = require("../src/shared/errors/AppError");
const { valorJaCadastrado } = require("../src/shared/errors/Either");

describe('Cadastrar usuario Usecase',function(){
    const usuariosRepository = {
        cadastrar: jest.fn(),
        existeCpf: jest.fn(),
        existeEmail: jest.fn(),
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
     
       expect(output.rigth).toBeNull();
       expect(usuariosRepository.cadastrar).toHaveBeenCalledWith(usuarioDTO);
       expect(usuariosRepository.cadastrar).toHaveBeenCalledTimes(1);
     });
   
   test("Debe retornar um throw AppError se o usuariosRepository não for fornecido", function() {
       expect(() => cadastrarUsuarioUsecase({})).toThrow(new AppError(AppError.dependencias));
   });

   test('Deve retornar um throw AppError se os campos obrigatorios não forem fornecido', async function() {
       const sut  = cadastrarUsuarioUsecase({ usuariosRepository });
       await expect(() => sut({})).rejects.toThrow(new AppError(AppError.camposObrigatoriosAusentes));
   });

   test('Debe retornar um Either.Left se o cpf já foi cadastrado', async function() {
    usuariosRepository.existeCpf.mockResolvedValue(true);
    const usuarioDTO = {
      nome_completo : 'nome_valido',
      cpf: 'cpf_ja_cadastrado',
      telefone: 'telefone_valido',
      endereco: 'endereço_valido',
      email: 'email_valido'
    };
    const sut  = cadastrarUsuarioUsecase({usuariosRepository});
    const output = await sut(usuarioDTO);

    expect(output.rigth).toBeNull();
    expect(output.left).toEqual(Either.valorJaCadastrado('cpf'));
    expect(usuariosRepository.existeCpf).toHaveBeenLastCalledWith(usuarioDTO.cpf);
    expect(usuariosRepository.existeCpf).toHaveBeenCalledTimes(1);
   });

   test('Debe retornar um Either.Left se o email já foi cadastrado', async function(){
    usuariosRepository.existeCpf.mockResolvedValue(false);
    usuariosRepository.existeEmail.mockResolvedValue(true);
    const usuarioDTO = {
      nome_completo : 'nome_valido',
      cpf: 'cpf_valido',
      telefone: 'telefone_valido',
      endereco: 'endereço_valido',
      email: 'email_ja_cadastrado'
    };

    const sut = cadastrarUsuarioUsecase({usuariosRepository});
    const output = await sut(usuarioDTO);

    expect(output.rigth).toBeNull();
    expect(output.left).toEqual(Either.valorJaCadastrado('email'));
    expect(usuariosRepository.existeEmail).toHaveBeenLastCalledWith(usuarioDTO.email);
    expect(usuariosRepository.existeEmail).toHaveBeenCalledTimes(1);
   });

});