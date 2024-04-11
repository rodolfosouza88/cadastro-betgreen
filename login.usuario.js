// Função para verificar se o e-mail já está cadastrado
function verificarCadastroExistente(email) {
    let listaUser = JSON.parse(localStorage.getItem('listaUser') || '[]');

    for (let i = 0; i < listaUser.length; i++) {
        if (listaUser[i].emailCad === email) {
            return listaUser[i].senhaCad; // Retornar a senha do usuário cadastrado
        }
    }

    return null; // Usuário não cadastrado
}

// Função para verificar se algum campo obrigatório está vazio
function verificarCamposPreenchidos() {
    let nome = document.getElementById('nome').value;
    let email = document.getElementById('email').value;
    let senha = document.getElementById('senha').value;
    let confirmSenha = document.getElementById('confirmSenha').value;

    return nome && email && senha && confirmSenha; // Retorna true se todos os campos estiverem preenchidos
}

function cadastrar() {
    let msgError = document.querySelector('#msgError');

    // Verificar se algum campo obrigatório está vazio
    if (!verificarCamposPreenchidos()) {
        msgError.innerHTML = 'Preencha todos os campos obrigatórios antes de cadastrar';
        msgError.style.display = 'block';
        return; // Encerrar a função
    }

    let nome = document.getElementById('nome').value;
    let email = document.getElementById('email').value;
    let senha = document.getElementById('senha').value;
    let confirmSenha = document.getElementById('confirmSenha').value;

    // Verificar se o usuário já está cadastrado
    let senhaCadastrada = verificarCadastroExistente(email);
    if (senhaCadastrada !== null) {
        alert("Você já tem cadastro.\nSua senha para login é: " + senhaCadastrada);
        return; // Encerrar a função
    }

    // Adicionar o usuário à lista
    let listaUser = JSON.parse(localStorage.getItem('listaUser') || '[]');
    listaUser.push({
        nomeCad: nome,
        emailCad: email,
        senhaCad: senha
    });
    localStorage.setItem('listaUser', JSON.stringify(listaUser));

    // Exibir mensagem de sucesso
    let msgSuccess = document.querySelector('#msgSuccess');
    msgSuccess.innerHTML = 'Usuário cadastrado com sucesso';
    msgSuccess.style.display = 'block';

    // Limpar campos
    document.getElementById('nome').value = '';
    document.getElementById('email').value = '';
    document.getElementById('senha').value = '';
    document.getElementById('confirmSenha').value = '';

    // Redirecionar para a página index.html após 3 segundos
    setTimeout(function () {
        window.location.href = 'index.html';
    }, 3000);
}

document.addEventListener('DOMContentLoaded', function () {
    let btn = document.querySelector('.fa-eye')

    btn.addEventListener('click', () => {
        let inputSenha = document.querySelector('#senha')

        if (inputSenha.getAttribute('type') == 'password') {
            inputSenha.setAttribute('type', 'text')
        } else {
            inputSenha.setAttribute('type', 'password')
        }
    })
});
