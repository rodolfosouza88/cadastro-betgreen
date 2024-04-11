function cadastrarCliente() {
    let nome = document.getElementById('nome').value;
    let telefone = document.getElementById('tel').value;

    if (nome.trim() === '' || telefone.trim() === '') {
        exibirMensagemErro('Preencha os campos');
        return;
    }

    let clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    clientes.push({ nome: nome, telefone: telefone });
    localStorage.setItem('clientes', JSON.stringify(clientes));

    exibirMensagemSucesso('Cliente cadastrado com Sucesso!');
}

function exibirMensagemErro(mensagem) {
    let msgError = document.getElementById('msgError');
    msgError.textContent = mensagem;
    msgError.style.display = 'block';
}

function exibirMensagemSucesso(mensagem) {
    let msgSuccess = document.getElementById('msgSuccess');
    msgSuccess.textContent = mensagem;
    msgSuccess.style.display = 'block';
}

function formatarTelefone(input) {
    let valor = input.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos, exceto o backspace
    let regex = /^(\d{2})(\d{0,5})(\d{0,4})$/; // Regex para capturar os grupos de números

    // Formatar o número de telefone conforme o padrão "(XX) XXXXX-XXXX"
    valor = valor.replace(regex, function (match, p1, p2, p3) {
        return '(' + p1 + ') ' + (p2 ? p2 + '-' : '') + p3;
    });

    input.value = valor; // Atualizar o valor do input com o número formatado
}
