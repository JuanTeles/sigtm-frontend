// src/pages/usuario/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext"; // Importa o hook
import Header from "../../components/Header";
import Footer from "../../components/Footer";
//import "../usuario/Login.css"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  
  const { signIn } = useAuth(); // Pega a função de login do contexto
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro(""); // Limpa erros anteriores

    const resultado = await signIn(email, senha);

    if (resultado.success) {
      navigate("/"); // Redireciona para a Home ou Dashboard
    } else {
      setErro(resultado.message);
    }
  };

  return (
    <>
      <Header />
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email ou CPF:</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="senha">Senha:</label>
            <input
              type="password"
              id="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>
          
          {erro && <p style={{ color: 'red', textAlign: 'center' }}>{erro}</p>}

          <button type="submit" className="login-btn">Entrar</button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Login;