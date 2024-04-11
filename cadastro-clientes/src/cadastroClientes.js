import React, { useState } from 'react';
import './CadastroClientes.css'; // Importe o arquivo de estilo aqui se necessário

function CadastroClientes() {
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [msgError, setMsgError] = useState('');
    const [msgSuccess, setMsgSuccess] = useState('');

    function cadastrarCliente() {
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
        setMsgError(mensagem);
    }

    function exibirMensagemSucesso(mensagem) {
        setMsgSuccess(mensagem);
    }

    function formatarTelefone(event) {
        let valor = event.target.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos, exceto o backspace
        let regex = /^(\d{2})(\d{0,5})(\d{0,4})$/; // Regex para capturar os grupos de números

        // Formatar o número de telefone conforme o padrão "(XX) XXXXX-XXXX"
        valor = valor.replace(regex, function (match, p1, p2, p3) {
            return '(' + p1 + ') ' + (p2 ? p2 + '-' : '') + p3;
        });

        setTelefone(valor); // Atualizar o valor do telefone
    }

    return (
        <div className='container'>
            <div className='card'>
                <div className="img"><img src="img/Logo.webp" width="60px" height="60px" alt="Logo" /></div>
                <h1> Cadastro de Clientes</h1>

                <div id='msgError'>{msgError}</div>
                <div id='msgSuccess'>{msgSuccess}</div>

                <div className="label-float">
                    <input type="text" id="nome" placeholder=" " value={nome} onChange={(e) => setNome(e.target.value)} required />
                    <label id="labelNome" htmlFor="nome">Nome</label>
                </div>

                <div className="label-float">
                    <input type="tel" id="tel" placeholder=" " value={telefone} onChange={formatarTelefone} required />
                    <label id="labelTel" htmlFor="tel">Telefone</label>
                </div>

                <div className='justify-center'>
                    <button onClick={cadastrarCliente}>Cadastrar Cliente</button>
                </div>

                <div className='justify-center'>
                    <a href="/lista.clientes.html"><button>Ver Clientes</button></a>
                </div>

                <div className='justify-center'>
                    <a href="/html/index.html"><button>Voltar</button></a>
                </div>
            </div>
        </div>
    );
}

export default CadastroClientes;
