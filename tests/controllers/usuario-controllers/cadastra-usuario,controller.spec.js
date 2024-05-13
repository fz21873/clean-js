const cadastrarUsuarioController = require("../../../src/interface-adapters/controllers/cadastrar-usuario.controller");
const { Either } = require("../../../src/shared/errors");
const httpResponse = require("../../../src/shared/helpers/http.response");


describe('Cadastrar usuriao Controller', function(){
    const cadastrarUsuarioUseCase = jest.fn();
  test('Deve retornar um httpResponse 201 e null se o cadastro for realizado com sucesso', async function(){
    cadastrarUsuarioUseCase.mockResolvedValue(Either.Rigth(null));
     const httpResquest = {
        body:{
          nome_completo:'qualquer_nome', 
          cpf:'qualquer_cpf', 
          telefone:'qualquer_telefone', 
          endereco:'qualquer_endereco', 
          email:'qualquer_email'
        }
     };

     const response = await cadastrarUsuarioController({
        cadastrarUsuarioUseCase,
        httpResquest
     })

     expect(response).toEqual(httpResponse(201,null));
     expect(cadastrarUsuarioUseCase).toHaveBeenCalledWith(httpResquest.body);
     expect(cadastrarUsuarioUseCase).toHaveBeenCalledTimes(1);
  })
})