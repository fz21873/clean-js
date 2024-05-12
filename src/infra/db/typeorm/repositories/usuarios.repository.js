const { typeormServer } = require("../setup")

const typeormUsuariosRepository = typeormServer.getRepository('Usuario')
const usuariosRepository = () =>{
  const  cadastrar = async ({nome_completo,cpf,telefone,email,endereco}) => {
    await typeormUsuariosRepository.save({
        nome_completo,
        cpf,
        telefone,
        email,
        endereco
    });
  };
  return { cadastrar };
};

module.exports = { usuariosRepository ,typeormUsuariosRepository}