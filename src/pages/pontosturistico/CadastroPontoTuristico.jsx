import React from 'react';
import { Link } from 'react-router-dom';

const CadastroPontoTuristico = () => {
  return (
    <div className="container py-5">
      <h1 className="fw-bold mb-4">CADASTRAR PONTO TURÍSTICO:</h1>

      {/* Container Cinza do Formulário */}
      <div className="p-4 p-md-5 rounded shadow-sm" style={{ backgroundColor: '#e5e7eb' }}>
        
        <form>
          {/* --- LINHA 1: Nome, Estado, Cidade --- */}
          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <label className="form-label fw-bold text-secondary small">NOME</label>
              <input type="text" className="form-control p-3 border-0" placeholder="Value" />
            </div>
            <div className="col-md-3">
              <label className="form-label fw-bold text-secondary small">ESTADO:</label>
              <input type="text" className="form-control p-3 border-0" placeholder="Value" />
            </div>
            <div className="col-md-3">
              <label className="form-label fw-bold text-secondary small">CIDADE:</label>
              <input type="text" className="form-control p-3 border-0" placeholder="Value" />
            </div>
          </div>

          {/* --- BLOCO CENTRAL: Descrição (Esq) vs Endereço (Dir) --- */}
          <div className="row g-3 mb-3">
            
            {/* Coluna da Esquerda: Descrição Grande */}
            <div className="col-md-6">
              <label className="form-label fw-bold text-secondary small">DESCRIÇÃO</label>
              <textarea 
                className="form-control border-0 p-3" 
                rows="5" 
                placeholder="Value"
                style={{ resize: 'none' }}
              ></textarea>
            </div>

            {/* Coluna da Direita: Bairro, Rua, Número */}
            <div className="col-md-6 d-flex flex-column gap-3">
              <div>
                <label className="form-label fw-bold text-secondary small">BAIRRO:</label>
                <input type="text" className="form-control p-3 border-0" placeholder="Value" />
              </div>
              
              <div className="row g-3">
                <div className="col-8">
                  <label className="form-label fw-bold text-secondary small">RUA:</label>
                  <input type="text" className="form-control p-3 border-0" placeholder="Value" />
                </div>
                <div className="col-4">
                  <label className="form-label fw-bold text-secondary small">Nº:</label>
                  <input type="text" className="form-control p-3 border-0" placeholder="Value" />
                </div>
              </div>
            </div>
          </div>

          {/* --- LINHA 3: Horários e Acessibilidade --- */}
          <div className="row g-3 mb-5 align-items-end">
            <div className="col-md-3">
              <label className="form-label fw-bold text-secondary small">HORÁRIO DE ABERTURA:</label>
              <input type="time" className="form-control p-3 border-0 text-secondary" />
            </div>
            <div className="col-md-3">
              <label className="form-label fw-bold text-secondary small">HORÁRIO DE FECHAMENTO:</label>
              <input type="time" className="form-control p-3 border-0 text-secondary" />
            </div>
            
            <div className="col-md-6">
              <label className="form-label fw-bold text-secondary small d-block mb-2">NIVEL DE ACESSIBILIDADE:</label>
              <input type="range" className="form-range" min="0" max="5" id="accessibilityRange" />
              <div className="d-flex justify-content-between text-secondary small px-1">
                <span>Baixo</span>
                <span>Médio</span>
                <span>Alto</span>
              </div>
            </div>
          </div>

          {/* --- BOTÕES --- */}
          <div className="d-flex justify-content-center gap-3">
            <Link 
              to="/paineladm" 
              className="btn btn-primary rounded-pill px-5 py-2 fw-bold shadow border-0" 
              style={{ backgroundColor: '#3b82f6', minWidth: '160px' }}
            >
              CANCELAR
            </Link>
            <button 
              type="submit" 
              className="btn btn-primary rounded-pill px-5 py-2 fw-bold shadow border-0" 
              style={{ backgroundColor: '#3b82f6', minWidth: '160px' }}
            >
              CADASTRAR
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CadastroPontoTuristico;