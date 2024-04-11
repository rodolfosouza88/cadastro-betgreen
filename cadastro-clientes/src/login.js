import React, { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (email === 'usuario@example.com' && senha === '123456') {
      // Lógica de autenticação bem-sucedida
      console.log('Login bem-sucedido!');
    } else {
      setError('Usuário ou senha incorretos');
    }
  };

  return (
    <div className="container">
      <section>
        <div className="card">
          <div className="img"><img src="/assets/img/Logo.webp" width="80px" height="80px" alt="Logo"></div>
          <h1> Entrar </h1>

          <div id='msgError'>{error}</div>

          <div className='label-float'>
            <input type='text' id='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
            <label htmlFor='email'>E-mail</label>
          </div>

          <div className='label-float'>
            <input type='password' id='senha' value={senha} onChange={(e) => setSenha(e.target.value)} required />
            <label htmlFor='senha'>Senha</label>
            <i className="fa fa-eye" aria-hidden="true"></i>
          </div>

          <div className='justify-center'>
            <button onClick={handleLogin}>Entrar</button>
          </div>

          <div className='justify-center'>
            <hr />
          </div>

          <p> Não tem uma conta? <a href="/assets/html/login.usuario.html"> Cadastre-se </a> </p>
        </div>
      </section>
    </div>
  );
}

export default Login;
