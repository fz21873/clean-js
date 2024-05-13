module.exports = async function cadastrarUsuarioController({cadastrarUsarioUseCase, httpResquest}){
 const {nome_completo, cpf, telefone, endereco, email} = httpResquest.body;
 const output = cadastrarUsarioUseCase({
    nome_completo, 
    cpf, 
    telefone, 
    endereco, 
    email
 });

 return output.fold(
    (error) => httpResquest(400, error.message),
    () => httpResquest(201,null)
 );
};