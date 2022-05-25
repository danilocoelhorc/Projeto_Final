const form = document.querySelector('#form-recados');
const tabela = document.querySelector('#tbody');

const atualizarLocalStorage = (recados) => {localStorage.setItem('recados', JSON.stringify(recados))}

const recuperarLocalStorage = () => JSON.parse(localStorage.getItem('recados') || '[]');

const salvarRecado = (e) => {
    e.preventDefault()
    const descricao = form.descricao.value;
    const detalhamento = form.detalhamento.value;

    if(idx == 'novo'){
        const recados = recuperarLocalStorage();
        recados.push({id:recados.length + 1, descricao, detalhamento});
        atualizarLocalStorage(recados);
        preencherTabela();
        form.reset();
    }else{
        let recados = {id: idx, descricao, detalhamento}

        atualizarProduto(idx, recados);
        preencherTabela();
        form.reset();
        idx = 'novo';
    }

}

const preencherTabela = () =>{
    const recados = recuperarLocalStorage();
    tabela.innerHTML = '';
    for(const recado of recados){ 
        tabela.innerHTML += `

            <tr>
                <th scope="row">${recado.id}</th>
                <td>${recado.descricao}</td>
                <td>${recado.detalhamento}</td>
                <td>
                    <img  type="button" width="40" src="./img/delet.svg" onclick="removerProduto(${recado.id})" />
                    <img type="button" width="40" src="./img/editar.png" onclick="editarProduto(${recado.id})" />
                </td>
            </tr>
    
        `;
    }
}

const removerProduto = (id) =>{
    const recados = recuperarLocalStorage();
    const indexRecados = recados.findIndex((recados) => recados.id === id)
    if(indexRecados < 0) return;
    recados.splice(indexRecados, 1);
    atualizarLocalStorage(recados);
    alert('Recado deletado');
    preencherTabela();
}


const atualizarProduto = (id, recado) => {
    const recados = recuperarLocalStorage();
    const indexRecados = recados.findIndex((p) => p.id === id);
    recados[indexRecados] = recado;
    atualizarLocalStorage(recados);
}

const editarProduto = (id) =>{
    const recados = recuperarLocalStorage();
    const indexRecados = recados.findIndex((recado) => recado.id === id)
    form.descricao.value = recados[indexRecados].descricao;
    form.detalhamento.value = recados[indexRecados].detalhamento;
    idx = id;
}

form === null || form === void 0 ? void 0 : form.addEventListener('submit', salvarProduto);
document.addEventListener('DOMContentLoaded', preencherTabela);