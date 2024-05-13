const { ZodError } = require("zod");
const buscarUsuarioPorCpfController = require("../../../src/interface-adapters/controllers/usuarioController/buscar-usuario-por-cpf.controller");
const { Either, AppError } = require("../../../src/shared/errors");
const httpResponse = require("../../../src/shared/helpers/http.response");

describe('Buscar por CPF controller ',  function(){
    const buscarUsuarioPorCpfUseCase = jest.fn();
   test('Debe retornar um httpResponse 200 e um usuario se o mesmo for encontrado', async function(){

    const usuarioDTO ={
        nome_completo:'qualquer_nome', 
        cpf:'999.999.999-99', 
        telefone:'qualquer_telefone', 
        endereco:'qualquer_endereco', 
        email:'qualquer_email@gmail.com'
    };

    buscarUsuarioPorCpfUseCase.mockResolvedValue(Either.Rigth(usuarioDTO));
    
      const httpResquest = {
        params:{
            cpf:'999.999.999-99'
        }
      };

      
      const response = await buscarUsuarioPorCpfController({buscarUsuarioPorCpfUseCase, httpResquest});

      expect(response).toEqual(httpResponse(200,usuarioDTO));
      expect(buscarUsuarioPorCpfUseCase).toHaveBeenCalledWith(httpResquest.params);
      expect(buscarUsuarioPorCpfUseCase).toHaveBeenCalledTimes(1);
      
   });

   test('Debe retornar htppResponse 200 e null se nenhum usuario for encontrado', async function(){
    buscarUsuarioPorCpfUseCase.mockResolvedValue(Either.Rigth(null));
      const httpResquest = {
        params:{
            cpf:'999.999.999-99'
        }
      };

      const response = await buscarUsuarioPorCpfController({buscarUsuarioPorCpfUseCase, httpResquest});

      expect(response).toEqual(httpResponse(200,null));
      expect(buscarUsuarioPorCpfUseCase).toHaveBeenCalledWith(httpResquest.params);
      expect(buscarUsuarioPorCpfUseCase).toHaveBeenCalledTimes(1);
      
   });

   test('Deve retornar um throw AppError se as dependecias buscarUsuarioPorCpfUseCase e httpResquest não forem fornecidos',
    function(){
        expect(buscarUsuarioPorCpfController({})).rejects.toThrow(new AppError(AppError.dependencias));
    });

    test('Deve retornar um error do usuario validator se os campos obrigatorios não forem fornecidos',
    async function(){
        const httpResquest = {
            params:{}
         };
         expect(() => buscarUsuarioPorCpfController({ buscarUsuarioPorCpfUseCase, httpResquest}))
         .rejects.toBeInstanceOf(ZodError);
    });
})