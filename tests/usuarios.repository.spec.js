const { usuariosRepository } = require("../src/infra/db/typeorm/repositories/usuarios.repository");

describe('Usuarios Repository', function(){
  test('Deve retornar void ao criar um usuario',async function(){
    const sut  = usuariosRepository();
    const usuarioCriado = await sut.cadastrar({
        nome_completo: 'nome_valido',
        cpf:'cpf_valido',
        telefone:'telefone_valido',
        email:'email_valido',
        endereco:'endereco_valido'

    });
    expect(usuarioCriado).toBeUndefined();
  })
})