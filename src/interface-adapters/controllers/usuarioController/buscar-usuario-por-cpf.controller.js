const httpResponse = require("../../../shared/helpers/http.response");
const { buscarPorCPFValidator } = require("../../../shared/validador/usuario/usuario.validator");

module.exports = async function buscarUsuarioPorCPFController({buscarUsuarioPorCpfUseCase, httpResquest}){
    const { cpf } = buscarPorCPFValidator.parse(httpResquest.params);
    const output = await buscarUsuarioPorCpfUseCase({cpf});

    return output.fold(
        (error) => httpResponse(400, error.message),
        (usuario) => httpResponse(200,usuario)
     );
}