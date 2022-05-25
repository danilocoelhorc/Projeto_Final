const form = document.querySelector('#form-recados');
const divErro = document.querySelector("#msg-erro");
const tabela = document.querySelector("#tbody");
let idx = form.idx.value; 
let usuarioId = Number(sessionStorage.getItem('logado'));
const session = localStorage.getItem("session");

checkLogged();

function checkLogged (){
    if(session) {
        sessionStorage.setItem("log", session);
        usuarioId = session;
    }

    if (!usuarioId) {
        window.location.href = "index.html"
        return;
    }
}

const atualizarLocalStorage = (recados) => {
    localStorage.setItem("recados", JSON.stringify(recados));
};

const recuperarLocalStorage = () => {
    const recados = JSON.parse(localStorage.getItem("recados") || "[]");
    return recados;
};

const salvarProduto = (event) => {
    event.preventDefault();
    divErro.innerHTML = "";
    const descricao = form.descricao.value;
    const detalhamento = form.detalhamento.value;
    const erros = [];

    if (!descricao || descricao.length < 2) {
        erros.push("<p>Nome inválido</p>");
    }
    if (erros.length > 0) {
        divErro.innerHTML = erros.join(" ");
        return;
    }

    if(idx == "novo"){
        const recados = recuperarLocalStorage();
        let i = 1;
        let idt = 0;
        for(const pro of recados){
            if(pro.usuarioId === usuarioId){
                //i+=1;
                idt = Number(pro.id);
            }
        }

        recados.push({ id: idt+=1, descricao, detalhamento, usuarioId});
        atualizarLocalStorage(recados);
        preencherTabela();
        form.reset();
    }else{
        let recado = {
            id: idx, descricao, detalhamento, usuarioId 
        }
        editar(idx, recado);
        preencherTabela();
        form.reset();
        idx = "novo";
    }
   
};

const preencherTabela = () => {
    const recados = recuperarLocalStorage();
    tabela.innerHTML = "";
    for (const recado of recados) {

        if(recado.usuarioId === usuarioId){
            tabela.innerHTML += `
        <tr>
            <th>${recado.id}</th>
            <td>${recado.descricao}</td>
            <td>${recado.detalhamento}</td>
            <td>
                <img type="button" width="40" src="./img/delet.svg" onclick="removerProduto(${recado.id})" />
                <img type="button" width="40" src="./img/editar.png" onclick="atualizaProduto(${recado.id})" />
            </td>
        </tr>
    `;
        }
    }
};

const removerProduto = (id) => {
    const recados = recuperarLocalStorage();
    const indexRecado = recados.findIndex((recado) => recado.id === id);
    if (indexRecado < 0)
        return;
    recados.splice(indexRecado, 1);
    atualizarLocalStorage(recados);
    alert("Recado excluido");
    preencherTabela();
};

function editar(idx, recado){
    const recados = JSON.parse(localStorage.getItem("recados") || "[]");
    const indexRecado = recados.findIndex((p) => p.id === idx);
    recados[indexRecado] = recado;
    localStorage.setItem("recados", JSON.stringify(recados));
}

const atualizaProduto = (id)=>{
    const recados = recuperarLocalStorage();
    const indexRecado = recados.findIndex((recado) => recado.id === id);
    form.descricao.value = recados[indexRecado].descricao;
    form.detalhamento.value = recados[indexRecado].detalhamento;
    idx = id;
}

form === null || form === void 0 ? void 0 : form.addEventListener("submit", salvarProduto);
document.addEventListener("DOMContentLoaded", preencherTabela);

let sair = document.querySelector('#sair');

sair.addEventListener('click', function(){
    saindo()
});

function saindo(){
    sessionStorage.removeItem("logado");
    localStorage.removeItem("session");


    window.location.href = "index.html";
}

