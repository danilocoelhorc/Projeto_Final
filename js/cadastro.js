document.querySelector('#criar-conta').addEventListener('click', (c)=>{
    c.preventDefault();
    let login = document.querySelector('#login').value;
    let senha = document.querySelector('#senha').value;
    salvar(login, senha);
});

function salvar(l, s){
    let db = JSON.parse(localStorage.getItem('usuarios') || '[]');
    let usuario = {
        id: db.length + 1,
        login: l,
        senha: s
    }
    db.push(usuario);
    localStorage.setItem('usuarios', JSON.stringify(db));
    location.href = 'index.html';    
}
