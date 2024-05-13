const { usuariosRepository, typeormUsuariosRepository } = require("../src/infra/db/typeorm/repositories/usuarios.repository");

describe('Usuarios Repository', function(){
  let sut;
  beforeEach(async function(){
    await typeormUsuariosRepository.delete({});
  });
  
  beforeAll(function(){
    sut = usuariosRepository();
  });

  const usuarioDTO = {
    nome_completo: 'nome_valido',
    cpf:'cpf_valido',
    telefone:'telefone_valido',
    email:'email_valido',
    endereco:'endereco_valido'

}

  test('Deve retornar void ao criar um usuario',async function(){
    const usuarioCriado = await sut.cadastrar(usuarioDTO);
    expect(usuarioCriado).toBeUndefined();
  });

  test('Deve retornar um usuario se mesmo existir ao buscar por CPF', async function(){
    await typeormUsuariosRepository.save(usuarioDTO);
    const buscarPorCPFCadastrado = await sut.buscarPorCPF('cpf_valido');

    expect(buscarPorCPFCadastrado.id).toBeDefined();
    expect(buscarPorCPFCadastrado.nome_completo).toBe('nome_valido');
  });

  test('Debe retornar null se o usuario não existir ao buscar por CPF', async function(){
    const buscarPorCPFCadastrado = await sut.buscarPorCPF('cpf_noa_cadastrado');

    expect(buscarPorCPFCadastrado).toBeNull();
  });

  test('Deve retornar true se existe um usuario por CPF', async function(){
    await typeormUsuariosRepository.save(usuarioDTO);
    const existePorCPF = await sut.existePorCPF('cpf_valido');

    expect(existePorCPF).toBe(true);

  });

  test('Deve retornar true se existe um usuario por Email', async function(){
    await typeormUsuariosRepository.save(usuarioDTO);
    const existePorEmail = await sut.existePorEmail('email_valido');

    expect(existePorEmail).toBe(true);
  })
})