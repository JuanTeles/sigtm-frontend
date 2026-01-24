// src/pages/usuario/Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext"; 
import Swal from 'sweetalert2';

// Importa o CSS criado acima
import "../../css/Login.css"; 

const Login = () => {
  // Estados de dados (Backend)
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  
  // Estado visual (Mostrar/Esconder senha)
  const [showPassword, setShowPassword] = useState(false);

  const { signIn } = useAuth(); 
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro(""); 

    // Feedback visual de "Carregando"
    Swal.fire({
      title: 'Aguarde...',
      text: 'Validando suas credenciais',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    const resultado = await signIn(email, senha);

    if (resultado.success) {
      // Confirmação de Sucesso
      Swal.fire({
        icon: 'success',
        title: 'Bem-vindo!',
        text: 'Login realizado com sucesso.',
        timer: 1500,
        showConfirmButton: false
      }).then(() => {
        navigate("/"); 
      });
    } else {
      // Confirmação de Erro
      Swal.fire({
        icon: 'error',
        title: 'Falha no Login',
        text: resultado.message || 'Verifique seu e-mail e senha.',
        confirmButtonColor: '#212529' // Cor do seu botão dark
      });
      setErro(resultado.message);
    }
  };

  return (
    <>
      
      {/* Container principal com fundo cinza escuro (estilo no CSS) */}
      <div className="login-wrapper">
        
        {/* O Cartão Branco de Login */}
        <div className="card border-0 rounded-3 shadow p-4 bg-white login-card">
          <div className="card-body">
            
            <h3 className="text-center fw-bold mb-4">LOGIN</h3>

            <form onSubmit={handleLogin}>
              {/* Campo Email / CPF */}
              <div className="mb-3">
                <label htmlFor="emailInput" className="form-label form-label-custom">
                  Email ou CPF
                </label>
                <input 
                  type="text" 
                  className="form-control py-2" 
                  id="emailInput" 
                  placeholder="exemplo@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Campo Senha */}
              <div className="mb-3">
                <label htmlFor="passwordInput" className="form-label form-label-custom">
                  Senha
                </label>
                <input 
                  type={showPassword ? "text" : "password"} // Muda o tipo dinamicamente
                  className="form-control py-2" 
                  id="passwordInput" 
                  placeholder="Digite sua senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                />
              </div>

              {/* Checkbox e Link de Cadastro */}
              <div className="mb-4">
                <div className="form-check mb-2">
                  <input 
                    className="form-check-input bg-dark border-dark" 
                    type="checkbox" 
                    id="showPasswordCheck"
                    checked={showPassword}
                    onChange={() => setShowPassword(!showPassword)}
                  />
                  <label className="form-check-label small fw-bold text-dark" htmlFor="showPasswordCheck">
                    Mostrar a senha
                  </label>
                </div>
                
                {/* Link para cadastro */}
                <div className="small text-secondary">
                  Não tem conta? <Link to="/cadastro" className="text-dark fw-bold text-decoration-underline">Cadastre-se</Link>
                </div>
              </div>

              {/* Exibição de Erros (Backend) */}
              {erro && <p className="error-message">{erro}</p>}

              {/* Botão de Entrar */}
              <button 
                type="submit" 
                className="btn btn-dark w-100 py-2 btn-custom-dark"
              >
                ENTRAR
              </button>

            </form>
          </div>
        </div>

      </div>
      
    </>
  );
};

export default Login;