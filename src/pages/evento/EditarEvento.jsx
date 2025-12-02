import React from 'react';
import { Link } from 'react-router-dom';

const EditarEvento = () => {
  return (
    <div className="container py-5">
      <h1 className="fw-bold mb-4">EDITAR EVENTO</h1>

      <div className="p-4 p-md-5 rounded shadow-sm" style={{ backgroundColor: '#e5e7eb' }}>
        <form>
          {/* Cabeçalho */}
          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <label className="form-label fw-bold text-secondary small">NOME</label>
              <input type="text" className="form-control p-3 border-0" defaultValue="São João de Irecê 2025" />
            </div>
            <div className="col-md-3">
              <label className="form-label fw-bold text-secondary small">ESTADO:</label>
              <input type="text" className="form-control p-3 border-0" defaultValue="BA" />
            </div>
            <div className="col-md-3">
              <label className="form-label fw-bold text-secondary small">CIDADE:</label>
              <input type="text" className="form-control p-3 border-0" defaultValue="Irecê" />
            </div>
          </div>

          {/* Corpo */}
          <div className="row g-4 mb-4">
            
            {/* Esquerda */}
            <div className="col-md-6 d-flex flex-column gap-3">
              <div className="flex-grow-1">
                <label className="form-label fw-bold text-secondary small">DESCRIÇÃO</label>
                <textarea 
                  className="form-control border-0 p-3 h-100" 
                  style={{ minHeight: '120px', resize: 'none' }}
                  defaultValue="O maior São João da Bahia, com atrações nacionais e locais no Palco Dori Caymmi."
                ></textarea>
              </div>

              <div className="row g-3">
                <div className="col-6">
                  <label className="form-label fw-bold text-secondary small">DATA:</label>
                  <input type="date" className="form-control p-3 border-0 text-secondary" defaultValue="2025-06-20" />
                </div>
                <div className="col-6">
                  <label className="form-label fw-bold text-secondary small">HORÁRIO:</label>
                  <input type="time" className="form-control p-3 border-0 text-secondary" defaultValue="19:00" />
                </div>
              </div>

              <div>
                <label className="form-label fw-bold text-secondary small d-block mb-2">NIVEL DE ACESSIBILIDADE:</label>
                <input type="range" className="form-range" min="0" max="5" id="accessibilityRange" defaultValue="5" />
                <div className="d-flex justify-content-between text-secondary small px-1">
                  <span>Baixo</span>
                  <span>Médio</span>
                  <span>Alto</span>
                </div>
              </div>
            </div>

            {/* Direita */}
            <div className="col-md-6 d-flex flex-column gap-3">
              <div>
                <label className="form-label fw-bold text-secondary small">BAIRRO:</label>
                <input type="text" className="form-control p-3 border-0 mb-3" defaultValue="Centro" />
                
                <div className="row g-3">
                  <div className="col-8">
                    <label className="form-label fw-bold text-secondary small">RUA:</label>
                    <input type="text" className="form-control p-3 border-0" defaultValue="Praça Clériston Andrade" />
                  </div>
                  <div className="col-4">
                    <label className="form-label fw-bold text-secondary small">Nº:</label>
                    <input type="text" className="form-control p-3 border-0" defaultValue="S/N" />
                  </div>
                </div>
              </div>

              <div>
                <label className="form-label fw-bold text-secondary small">PROGRAMAÇÃO:</label>
                <input type="text" className="form-control p-3 border-0" defaultValue="Show de Abertura, Quadrilhas, Bandas de Forró" />
              </div>

              <div className="row g-3">
                <div className="col-6">
                  <label className="form-label fw-bold text-secondary small">PÚBLICO ALVO:</label>
                  <input type="text" className="form-control p-3 border-0" defaultValue="Livre" />
                </div>
                <div className="col-6">
                  <label className="form-label fw-bold text-secondary small">CATEGORIA:</label>
                  <input type="text" className="form-control p-3 border-0" defaultValue="Festas Juninas" />
                </div>
              </div>
            </div>
          </div>

          {/* Botões */}
          <div className="d-flex justify-content-center gap-3 mt-5">
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
              ATUALIZAR
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default EditarEvento;