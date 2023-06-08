const usuarios = [
    {
        login: 'matheuscamposdoamaral15@gmail.com',
        senha: 'Amarelo@10'
    },
    {
        login: 'pedrolucad7700@gmail.com',
        senha: 'pdrisgay'
    },
    {
        login: 'ebner.kimberly@gmail.com',
        senha: 'Amarelo@10'
    },
    
]   


function logar() {
    
    let pegaUsuario = document.getElementById('login').value
    let pegaSenha = document.getElementById('senha').value
    let validaLogin = false

    for (let i in usuarios) {
        if (pegaUsuario == usuarios[i].login && pegaSenha == usuarios[i].senha) 
        {
            validaLogin = true
            break
        }
    }
    if (validaLogin == true) 
        {
            location.href = '/pages/Tela_Principal/index.html'
        }

        else 
        {
            alert('Usuário ou senha incorretos.')
        }
  }

