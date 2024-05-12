## Estruturas

## UsuariosRepository
[] cadastrar({nome_completo,cpf,telefone,endereco,emai}) => Promise<void>
[] existeCpf(cpf) => Promise<boolean>
[] exiteEmail(email) => Promise <boolean>
[] buscarPor(cpf) => Promise<usuario>

## LivrosRepository
[] cadastrar({nome,quantidade,autor,genero,ISBN}) => Promise<void>
[] existePorISBN(ISBN) => Promise<boolean>