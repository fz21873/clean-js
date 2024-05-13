module.exports = async function cadastrarUsuarioController({cadastrarUsarioUseCase, httpResquest}){
 const {nome_completo, cpf, telefone, endereco, email} = httpResquest.body;
 const output = cadastrarUsarioUseCase({
    nome_completo, 
    cpf, 
    telefone, 
    endereco, 
    email
 });
}