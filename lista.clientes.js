document.addEventListener('DOMContentLoaded', function () {
    exibirClientes();
});

function exibirClientes() {
    let clientesBody = document.getElementById('clientesBody');
    clientesBody.innerHTML = ''; // Limpa o conteúdo anterior

    let clientes = JSON.parse(localStorage.getItem('clientes')) || [];

    clientes.forEach(function (cliente, index) {
        let row = document.createElement('tr');

        let nomeCell = document.createElement('td');
        nomeCell.textContent = cliente.nome;

        let telCell = document.createElement('td');
        telCell.textContent = formatarTelefone(cliente.telefone);

        let acoesCell = document.createElement('td');
        let editarBtn = criarBotao('Editar', index, 'editar');
        let excluirBtn = criarBotao('Excluir', index, 'excluir');
        acoesCell.appendChild(editarBtn);
        acoesCell.appendChild(excluirBtn);

        row.appendChild(nomeCell);
        row.appendChild(telCell);
        row.appendChild(acoesCell);

        clientesBody.appendChild(row);
    });
}

function criarBotao(texto, indice, acao) {
    let btn = document.createElement('button');
    btn.textContent = texto;
    btn.className = 'btn ' + acao;
    btn.addEventListener('click', function () {
        if (acao === 'editar') {
            editarCliente(indice);
        } else if (acao === 'excluir') {
            excluirCliente(indice);
        }
    });
    return btn;
}

function editarCliente(indice) {
    let clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    let novoNome = prompt('Digite o novo nome:');
    let novoTelefone = prompt('Digite o novo telefone:');
    if (novoNome && novoTelefone) {
        clientes[indice].nome = novoNome;
        clientes[indice].telefone = novoTelefone;
        localStorage.setItem('clientes', JSON.stringify(clientes));
        exibirClientes();
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}

function excluirCliente(indice) {
    if (confirm('Tem certeza que deseja excluir este cliente?')) {
        let clientes = JSON.parse(localStorage.getItem('clientes')) || [];
        clientes.splice(indice, 1);
        localStorage.setItem('clientes', JSON.stringify(clientes));
        exibirClientes();
    }
}

function formatarTelefone(telefone) {
    const ddd = telefone.substring(0, 2);
    const resto = telefone.substring(2);
    return `${ddd}${resto}`;
}

