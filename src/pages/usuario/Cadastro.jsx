import React from 'react';
import { Link } from 'react-router-dom'; // Import para navegação (botão cancelar)

const Cadastro = () => {
  return (
    // O container principal não precisa de Header/Footer aqui, pois o App.js já cuida disso.
    <div className="container py-5">
      
      <h1 className="fw-bold mb-4">CADASTRAR USUÁRIO:</h1>

      {/* Container Cinza do Formulário */}
      <div className="p-5 rounded shadow-sm" style={{ backgroundColor: '#d1d5db' }}> 
        
        <form>
          {/* Linha 1: Nome, CPF, Telefone */}
          <div className="row g-4 mb-4">
            <div className="col-md-4">
              <label className="form-label fw-bold text-secondary small">NOME</label>
              <input type="text" className="form-control p-3 border-0" />
            </div>
            <div className="col-md-4">
              <label className="form-label fw-bold text-secondary small">CPF / CNPJ:</label>
              <input type="text" className="form-control p-3 border-0"  />
            </div>
            <div className="col-md-4">
              <label className="form-label fw-bold text-secondary small">TELEFONE:</label>
              <input type="text" className="form-control p-3 border-0" />
            </div>
          </div>

          {/* Linha 2: Login, Senha, Email */}
          <div className="row g-4 mb-5">
            <div className="col-md-4">
              <label className="form-label fw-bold text-secondary small">LOGIN:</label>
              <input type="text" className="form-control p-3 border-0" />
            </div>
            <div className="col-md-4">
              <label className="form-label fw-bold text-secondary small">SENHA:</label>
              <input type="password" className="form-control p-3 border-0"  />
            </div>
            <div className="col-md-4">
              <label className="form-label fw-bold text-secondary small">EMAIL:</label>
              <input type="email" className="form-control p-3 border-0" />
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="row mt-4">
            <div className="col-12 d-flex flex-wrap justify-content-center gap-4">
              {/* Botão Cancelar - Volta para a Home ou Login */}
              <Link 
                to="/" 
                className="btn btn-primary rounded-pill px-5 py-2 fw-bold shadow text-decoration-none d-flex align-items-center justify-content-center" 
                style={{ minWidth: '200px', backgroundColor: '#3b82f6', borderColor: '#3b82f6' }}
              >
                CANCELAR
              </Link>

              {/* Botão Cadastrar - Envia o formulário */}
              <button 
                type="submit" 
                className="btn btn-primary rounded-pill px-5 py-2 fw-bold shadow" 
                style={{ minWidth: '200px', backgroundColor: '#3b82f6', borderColor: '#3b82f6' }}
              >
                CADASTRAR
              </button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Cadastro;