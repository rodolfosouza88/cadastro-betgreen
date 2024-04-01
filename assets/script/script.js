let btn = document.querySelector('.fa-eye')

btn.addEventListener('click', () => {
    let inputSenha = document.querySelector('#senha')

    if (inputSenha.getAttribute('type') == 'password') {
        inputSenha.setAttribute('type', 'text')
    } else {
        inputSenha.setAttribute('type', 'password')
    }
})

function entrar() {
    let email = document.querySelector('#email')
    let emailLabel = document.querySelector('#emailLabel')

    let senha = document.querySelector('#senha')
    let senhaLabel = document.querySelector('#senhaLabel')

    let msgError = document.querySelector('#msgError')
    let listaUser = []

    listaUser = JSON.parse(localStorage.getItem('listaUser'))

    let userValid = listaUser.find(item => item.emailCad === email.value && item.senhaCad === senha.value)

    if (userValid) {
        window.location.href = "/assets/html/cadastrar.clientes.html"
        msgError.setAttribute('style', 'display: none')
        console.log('Usuário aceito!')
    } else {
        emailLabel.setAttribute('style', 'color: red')
        email.setAttribute('style', 'border-color: red')
        senhaLabel.setAttribute('style', 'color: red')
        senha.setAttribute('style', 'border-color: red')
        msgError.setAttribute('style', 'display: block')
        msgError.innerHTML = 'Usuário ou senha incorretos'
        email.focus()
    }
}
