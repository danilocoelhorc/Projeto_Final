document.querySelector('#logar').addEventListener('click', (l)=>{l.preventDefault();
    entrar()})

function entrar(){
    let usuario = document.querySelector('#login');
    let senha = document.querySelector('#senha');
    let listaDeUsuarios = [];
    let validacao = {
        login: ' ',
        senha: ' '
    }

    listaDeUsuarios = JSON.parse(localStorage.getItem('usuarios'));
    listaDeUsuarios.forEach(item=>{
        if(usuario.value === item.login && senha.value === item.senha){
            validacao = {
                id: item.id,
                login: item.login,
                senha: item.senha
            }
        }
    })

    if(usuario.value === validacao.login && senha.value === validacao.senha){
        alert('Seja bem vindo Senhor ' + login.value)
        saveSession(validacao.id);
        window.location.href ='recados.html';
    }
    else{
        alert('Usuário ou senha não conferem')
    }
}

function saveSession(data){
    if(saveSession){
        localStorage.setItem("session", data);
    }

    sessionStorage.setItem("logado", JSON.stringify(data));

}

