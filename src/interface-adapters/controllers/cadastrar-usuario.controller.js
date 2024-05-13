const httpResponse = require("../../shared/helpers/http.response");

module.exports = async function cadastrarUsuarioController({cadastrarUsuarioUseCase, httpResquest}){
 const {nome_completo, cpf, telefone, endereco, email} = httpResquest.body;
 const output = await cadastrarUsuarioUseCase({
    nome_completo, 
    cpf, 
    telefone, 
    endereco, 
    email
 });

 return output.fold(
    (error) => httpResponse(400, error.message),
    () => httpResponse(201,null)
 );
};