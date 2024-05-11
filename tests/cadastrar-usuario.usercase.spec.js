const cadastrarUsuarioUsecase = require("../src/application/cadastrar-usuario.usecase");
const AppError = require("../src/shared/errors/AppError");

describe('Cadastrar usuario Usecase',function(){
    const usuariosRepository = {
        cadastrar: jest.fn(),
        existeCpf: jest.fn()
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

   test('Deve retornar um throw AppError se os campos obrigatorios não forem fornecido', async function() {
       const sut  = cadastrarUsuarioUsecase({ usuariosRepository });
       await expect(() => sut({})).rejects.toThrow(new AppError(AppError.camposObrigatoriosAusentes));
   });

   test('Debe retornar um throw AppErroe se o cpf ja foi cadastrado', function() {
    usuariosRepository.existeCpf.mockResolvedValue(true);
    const usuarioDTO = {
      nome_completo : 'nome_valido',
      cpf: 'cpf_ja_cadastrado',
      telefone: 'telefone_valido',
      endereco: 'endereço_valido',
      email: 'email_vaido'
    };
    const sut  = cadastrarUsuarioUsecase({usuariosRepository});
      expect(() => sut(usuarioDTO)).rejects.toThrow(new AppError('CPF ja cadastrado'));
   });
});