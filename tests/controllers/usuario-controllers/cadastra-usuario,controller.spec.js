const { ZodError } = require("zod");
const cadastrarUsuarioController = require("../../../src/interface-adapters/controllers/usuarioController/cadastrar-usuario.controller");
const { Either, AppError } = require("../../../src/shared/errors");
const httpResponse = require("../../../src/shared/helpers/http.response");


describe('Cadastrar usuriao Controller', function(){
    const cadastrarUsuarioUseCase = jest.fn();
  test('Deve retornar um httpResponse 201 e null se o cadastro for realizado com sucesso', async function(){
    cadastrarUsuarioUseCase.mockResolvedValue(Either.Rigth(null));
     const httpResquest = {
        body:{
          nome_completo:'qualquer_nome', 
          cpf:'999.999.999-99', 
          telefone:'qualquer_telefone', 
          endereco:'qualquer_endereco', 
          email:'qualquer_email@gmail.com'
        }
     };

     const response = await cadastrarUsuarioController({
        cadastrarUsuarioUseCase,
        httpResquest
     })

     expect(response).toEqual(httpResponse(201,null));
     expect(cadastrarUsuarioUseCase).toHaveBeenCalledWith(httpResquest.body);
     expect(cadastrarUsuarioUseCase).toHaveBeenCalledTimes(1);
  });

  test('Deve retornar um throw AppError se o cadastrarUsuarioUseCase e httpResquest não for fornecido', function(){
    expect(() => cadastrarUsuarioController({})).rejects.toThrow(new AppError(AppError.dependencias));
  });

  test('Deve retornar um httpResponse 400 e error.message se o cadastro do usuario não for realizado com sucesso por logica de useCase',
    async function(){

        cadastrarUsuarioUseCase.mockResolvedValue(Either.Left({message:'logica_invalida'}));
        const httpResquest = {
           body:{
             nome_completo:'qualquer_nome', 
             cpf:'999.999.999-99', 
             telefone:'qualquer_telefone', 
             endereco:'qualquer_endereco', 
             email:'qualquer_email@gmail.com'
           }
        };
   
        const response = await cadastrarUsuarioController({
           cadastrarUsuarioUseCase,
           httpResquest
        })
   
        expect(response).toEqual(httpResponse(400,'logica_invalida'));
        expect(cadastrarUsuarioUseCase).toHaveBeenCalledWith(httpResquest.body);
        expect(cadastrarUsuarioUseCase).toHaveBeenCalledTimes(1);
     });

     test('Deve retornar um erro do usuario.validador se der error na validação dos dados', function(){
      const httpResquest = {
         body:{}
      };
      expect(() => cadastrarUsuarioController({ cadastrarUsuarioUseCase, httpResquest}))
      .rejects.toBeInstanceOf(ZodError);
     });

    });