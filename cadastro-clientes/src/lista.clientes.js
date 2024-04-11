import React from 'react';

function ListaClientes() {
  const clientes = [
    { nome: 'Cliente 1', telefone: '123-456-7890' },
    { nome: 'Cliente 2', telefone: '456-789-0123' },
    { nome: 'Cliente 3', telefone: '789-012-3456' }
  ];

  return (
    <div>
      <h1>Lista de Clientes</h1>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Telefone</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente, index) => (
            <tr key={index}>
              <td>{cliente.nome}</td>
              <td>{cliente.telefone}</td>
              <td>
                <button>Editar</button>
                <button>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <a href="/assets/html/cadastrar.clientes.html"><button>Voltar para Cadastro</button></a>
    </div>
  );
}

export default ListaClientes;
