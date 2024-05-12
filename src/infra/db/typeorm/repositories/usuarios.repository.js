const { typeormServer } = require("../setup")

const typeormUsuariosRepository = typeormServer.getRepository('Usuario')
const usuariosRepository = function(){
  const  cadastrar = async function({nome_completo,cpf,telefone,email,endereco}){
    await typeormUsuariosRepository.save({
        nome_completo,
        cpf,
        telefone,
        email,
        endereco
    });
  };

   const buscarPorCPF = async function(cpf){
   const usuario = await typeormUsuariosRepository.findOne({
    where:{
        cpf:cpf
    }
   });
   return usuario;
  };
  return { cadastrar, buscarPorCPF };
};

module.exports = { usuariosRepository ,typeormUsuariosRepository}