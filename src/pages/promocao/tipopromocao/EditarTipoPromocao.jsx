import React from 'react';
import { Link } from 'react-router-dom';

const EditarTipoPromocao = () => {
  return (
    <div className="container py-5">
      <h1 className="fw-bold mb-4">EDITAR TIPO DE PROMOÇÃO</h1>

      <div className="p-4 p-md-5 rounded shadow-sm" style={{ backgroundColor: '#e5e7eb' }}>
        <form>
          <div className="row g-4 mb-4">
            
            {/* Coluna Esquerda */}
            <div className="col-md-6 d-flex flex-column gap-3">
              <div>
                <label className="form-label fw-bold text-secondary small">TÍTULO:</label>
                <input type="text" className="form-control p-3 border-0" defaultValue="Desconto Sazonal" />
              </div>
              <div className="flex-grow-1">
                <label className="form-label fw-bold text-secondary small">REGRA:</label>
                <textarea 
                  className="form-control border-0 p-3 h-100" 
                  style={{ minHeight: '150px', resize: 'none' }}
                  defaultValue="Aplicável apenas para compras acima de R$ 100,00."
                ></textarea>
              </div>
            </div>

            {/* Coluna Direita */}
            <div className="col-md-6 d-flex flex-column">
              <label className="form-label fw-bold text-secondary small">DESCRIÇÃO:</label>
              <textarea 
                className="form-control border-0 p-3 h-100" 
                style={{ minHeight: '240px', resize: 'none' }}
                defaultValue="Promoções válidas durante as trocas de estação (Primavera/Verão)."
              ></textarea>
            </div>

          </div>

          <div className="d-flex justify-content-center gap-3 mt-5">
            <Link to="/paineladm" className="btn btn-primary rounded-pill px-5 py-2 fw-bold shadow border-0" style={{ backgroundColor: '#3b82f6', minWidth: '160px' }}>
              CANCELAR
            </Link>
            <button type="submit" className="btn btn-primary rounded-pill px-5 py-2 fw-bold shadow border-0" style={{ backgroundColor: '#3b82f6', minWidth: '160px' }}>
              ATUALIZAR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarTipoPromocao;