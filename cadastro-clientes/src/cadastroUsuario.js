import React, { useState } from 'react';
import './CadastroUsuarios.css'; // Importe o arquivo de estilo aqui se necessário

function CadastroUsuarios() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmSenha, setConfirmSenha] = useState('');
    const [msgError, setMsgError] = useState('');
    const [msgSuccess, setMsgSuccess] = useState('');

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
        return nome && email && senha && confirmSenha; // Retorna true se todos os campos estiverem preenchidos
    }

    function cadastrar() {
        // Verificar se algum campo obrigatório está vazio
        if (!verificarCamposPreenchidos()) {
            setMsgError('Preencha todos os campos obrigatórios antes de cadastrar');
            return; // Encerrar a função
        }

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
        setMsgSuccess('Usuário cadastrado com sucesso');

        // Limpar campos
        setNome('');
        setEmail('');
        setSenha('');
        setConfirmSenha('');

        // Redirecionar para a página index.html após 3 segundos
        setTimeout(function () {
            window.location.href = 'index.html';
        }, 3000);
    }

    return (
        <div className='container'>
            <div className='card'>
                <div className="img"><img src="/img/Logo.webp" width="60px" height="60px" alt="Logo"></div>
                <h1> Cadastrar Usuário</h1>

                <div id='msgError'>{msgError}</div>
                <div id='msgSuccess'>{msgSuccess}</div>

                <div className="label-float">
                    <input type="text" id="nome" placeholder=" " value={nome} onChange={(e) => setNome(e.target.value)} required />
                    <label id="labelNome" htmlFor="nome">Nome</label>
                </div>

                <div className="label-float">
                    <input type="text" id="email" placeholder=" " value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <label id="labelEmail" htmlFor="email">E-mail</label>
                </div>

                <div className="label-float">
                    <input type="password" id="senha" placeholder=" " value={senha} onChange={(e) => setSenha(e.target.value)} required />
                    <label id="labelSenha" htmlFor="senha">Senha</label>
                    <i id="verSenha" className="fa fa-eye" aria-hidden="true"></i>
                </div>

                <div className="label-float">
                    <input type="password" id="confirmSenha" placeholder=" " value={confirmSenha} onChange={(e) => setConfirmSenha(e.target.value)} required />
                    <label id="labelConfirmSenha" htmlFor="confirmSenha">Confirmar Senha</label>
                    <i id="verConfirmSenha" className="fa fa-eye" aria-hidden="true"></i>
                </div>

                <div className='justify-center'>
                    <button onClick={cadastrar}>Cadastrar</button>
                </div>

                <div className='justify-center'>
                    <a href="/index.html"><button>Voltar</button></a>
                </div>
            </div>
        </div>
    );
}

export default CadastroUsuarios;
