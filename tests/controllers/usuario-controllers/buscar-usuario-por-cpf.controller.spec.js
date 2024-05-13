const buscarUsuarioPorCpfController = require("../../../src/interface-adapters/controllers/usuarioController/buscar-usuario-por-cpf.controller");
const { Either } = require("../../../src/shared/errors");
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
      
   })
})