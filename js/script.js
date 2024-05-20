$(document).ready(function() {
    // Mostrar a seção correta ao clicar nos links de navegação
    $('.nav-link').click(function(event) {
        event.preventDefault();
        const target = $(this).data('target');
        $('section').removeClass('active'); // Remover a classe 'active' de todas as seções
        $('#' + target).addClass('active'); // Adicionar a classe 'active' à seção selecionada
    });

    // Lidar com o formulário de registro de usuário
    $('#register-form').submit(function(event) {
        event.preventDefault();
        console.log("Register form submitted");

        const email = $('#register-email').val();
        const senha = $('#register-senha').val();
        const confirmSenha = $('#confirm-senha').val();

        // Verificar se as senhas coincidem
        if (senha !== confirmSenha) {
            alert("As senhas não coincidem!");
            return;
        }

        // Recuperar usuários armazenados
        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

        // Verificar se o e-mail já está cadastrado
        const emailExiste = usuarios.some(usuario => usuario.email === email);

        if (emailExiste) {
            alert("Este e-mail já está cadastrado!");
            return;
        }

        // Adicionar novo usuário
        usuarios.push({ email: email, senha: senha });
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        alert("Cadastro realizado com sucesso!");
        $('section').removeClass('active'); // Remover a classe 'active' de todas as seções
        $('#login-section').addClass('active'); // Mostrar a seção de login
    });

    // Lidar com o formulário de login
    $('#login-form').submit(function(event) {
        event.preventDefault();
        console.log("Login form submitted");

        const email = $('#login-email').val();
        const senha = $('#login-senha').val();

        // Recuperar usuários armazenados
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

        // Verificar se os dados de login estão corretos
        const usuarioValido = usuarios.find(usuario => usuario.email === email && usuario.senha === senha);

        if (usuarioValido) {
            alert("Login bem-sucedido!");
            $('section').removeClass('active'); // Remover a classe 'active' de todas as seções
            $('#clientes-section').addClass('active'); // Mostrar a seção de clientes
            loadClientes();
        } else {
            alert("Credenciais inválidas!");
        }
    });

    // Lidar com o formulário de cadastro de clientes
    $('#client-form').submit(function(event) {
        event.preventDefault();
        console.log("Client form submitted");

        const nome = $('#client-nome').val();
        const telefone = $('#client-telefone').val();

        // Salvar novo cliente no localStorage
        let clientes = JSON.parse(localStorage.getItem('clientes')) || [];
        clientes.push({ nome: nome, telefone: telefone });
        localStorage.setItem('clientes', JSON.stringify(clientes));
        alert("Cliente cadastrado com sucesso!");
        loadClientes();
    });

    // Máscara de telefone (00) 00000-0000
    $('#client-telefone').mask('(00) 00000-0000');

    // Carregar clientes salvos no localStorage
    function loadClientes() {
        const clientes = JSON.parse(localStorage.getItem('clientes')) || [];
        const clientList = $('#client-list');
        clientList.empty();
        clientes.forEach((cliente, index) => {
            const editBtnId = 'edit-client-' + index;
            const deleteBtnId = 'delete-client-' + index;
            clientList.append('<li>' + cliente.nome + ' - ' + cliente.telefone + ' <button id="' + editBtnId + '">Editar</button> <button id="' + deleteBtnId + '">Excluir</button></li>');
            $('#' + editBtnId).click(function() {
                const novoNome = prompt("Digite o novo nome para " + cliente.nome + ":");
                const novoTelefone = prompt("Digite o novo telefone para " + cliente.telefone + ":");
                if (novoNome !== null && novoTelefone !== null) {
                    clientes[index].nome = novoNome;
                    clientes[index].telefone = novoTelefone;
                    localStorage.setItem('clientes', JSON.stringify(clientes));
                    loadClientes();
                }
            });
            $('#' + deleteBtnId).click(function() {
                if (confirm("Tem certeza que deseja excluir o cliente " + cliente.nome + "?")) {
                    clientes.splice(index, 1);
                    localStorage.setItem('clientes', JSON.stringify(clientes));
                    loadClientes();
                }
            });
        });
    }

    // Lidar com o clique no botão "Esqueci minha senha"
    $('#forgot-password').click(function() {
        const email = $('#login-email').val();
        if (!email) {
            alert("Por favor, insira seu e-mail para redefinir a senha.");
            return;
        }
        // Aqui você pode adicionar a lógica para enviar um e-mail de redefinição de senha
        alert("Um e-mail de redefinição de senha foi enviado para " + email);
    });

    // Lidar com a exibição da senha
    $('#show-password').click(function() {
        const senhaInput = $('#login-senha');
        const tipo = senhaInput.attr('type');
        if (tipo === 'password') {
            senhaInput.attr('type', 'text');
            $(this).addClass('fa-eye-slash').removeClass('fa-eye');
        } else {
            senhaInput.attr('type', 'password');
            $(this).addClass('fa-eye').removeClass('fa-eye-slash');
        }
    });
});
