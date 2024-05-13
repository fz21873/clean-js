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

  const existePorCPF = async function(cpf){
    const usuario = await typeormUsuariosRepository.count({
        where:{
            cpf
        }
    });
    return usuario === 0 ? false : true;
  };

  const existePorEmail = async function(email){
    const usuario = typeormUsuariosRepository.count({
        where:{
            email
        }
    });

    return usuario === 0 ? false : true;

  };

  return { cadastrar, buscarPorCPF,existePorCPF, existePorEmail };
};

module.exports = { usuariosRepository ,typeormUsuariosRepository}