const { AppError } = require("../../shared/errors");
const httpResponse = require("../../shared/helpers/http.response");
const { usuarioValidator } = require("../../shared/validador/usuario/usuario.validator");

module.exports = async function cadastrarUsuarioController({cadastrarUsuarioUseCase, httpResquest}){
 const checaDependecias = cadastrarUsuarioUseCase && httpResquest && httpResquest.body;
 if(!checaDependecias) throw new AppError(AppError.dependencias);
 const {nome_completo, cpf, telefone, endereco, email} = usuarioValidator.parse(httpResquest.body) // httpResquest.body;
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