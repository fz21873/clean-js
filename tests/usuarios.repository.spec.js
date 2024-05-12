const { usuariosRepository, typeormUsuariosRepository } = require("../src/infra/db/typeorm/repositories/usuarios.repository");

describe('Usuarios Repository', function(){

  beforeEach(async function(){
    await typeormUsuariosRepository.delete({});
  });

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
  });

  test('Deve retornar um usuario se mesmo existir ao buscar por CPF', async function(){
    await typeormUsuariosRepository.save({
        nome_completo: 'nome_valido',
        cpf:'cpf_valido',
        telefone:'telefone_valido',
        email:'email_valido',
        endereco:'endereco_valido'
    });
    const sut  = usuariosRepository();
    const buscarPorCPFCadastrado = await sut.buscarPorCPF('cpf_valido');

    expect(buscarPorCPFCadastrado.id).toBeDefined();
    expect(buscarPorCPFCadastrado.nome_completo).toBe('nome_valido');
  })
})