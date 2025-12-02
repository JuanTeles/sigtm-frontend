import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import essencial para navegar entre páginas

const Login = () => {
  // Estado para controlar se mostra ou esconde a senha
  const [showPassword, setShowPassword] = useState(false);

  return (
    // Container principal com fundo cinza escuro, ocupando toda a altura disponível
    <div className="d-flex align-items-center justify-content-center w-100 py-5" style={{ backgroundColor: '#7d7d7d', minHeight: '100%' }}>
      
      {/* O Cartão Branco de Login */}
      <div className="card border-0 rounded-3 shadow p-4 bg-white" style={{ width: '100%', maxWidth: '400px' }}>
        <div className="card-body">
          
          <form>
            {/* Campo Email */}
            <div className="mb-3">
              <label htmlFor="emailInput" className="form-label fw-bold text-secondary small">Email</label>
              <input 
                type="email" 
                className="form-control py-2" 
                id="emailInput" 
                placeholder="" 
              />
            </div>

            {/* Campo Senha */}
            <div className="mb-3">
              <label htmlFor="passwordInput" className="form-label fw-bold text-secondary small">Senha</label>
              <input 
                type={showPassword ? "text" : "password"} // Muda o tipo dinamicamente
                className="form-control py-2" 
                id="passwordInput" 
                placeholder="" 
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
              
              {/* AQUI ESTÁ A MÁGICA: O Link leva para a rota /cadastro */}
              <div className="small text-secondary">
                Não tem conta? <Link to="/cadastro" className="text-dark fw-bold text-decoration-underline">Cadastre-se</Link>
              </div>
            </div>

            {/* Botão de Login (Register) */}
            <button 
              type="submit" 
              className="btn btn-dark w-100 py-2" 
              style={{ backgroundColor: '#212529', borderRadius: '4px' }}
            >
              Entrar
            </button>

          </form>
        </div>
      </div>

    </div>
  );
};

export default Login;