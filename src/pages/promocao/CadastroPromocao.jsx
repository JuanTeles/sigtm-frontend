import React from 'react';
import { Link } from 'react-router-dom';

const CadastroPromocao = () => {
  return (
    <div className="container py-5">
      <h1 className="fw-bold mb-4">CADASTRAR PROMOÇÃO</h1>

      <div className="p-4 p-md-5 rounded shadow-sm" style={{ backgroundColor: '#e5e7eb' }}>
        <form>
          {/* Linha 1 */}
          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <label className="form-label fw-bold text-secondary small">TÍTULO:</label>
              <input type="text" className="form-control p-3 border-0" placeholder="Value" />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-bold text-secondary small">TIPO DE PROMOÇÃO:</label>
              <input type="text" className="form-control p-3 border-0" placeholder="Value" />
            </div>
          </div>

          {/* Linha 2 (Textareas lado a lado) */}
          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <label className="form-label fw-bold text-secondary small">DESCRIÇÃO</label>
              <textarea 
                className="form-control border-0 p-3" 
                rows="5" 
                style={{ resize: 'none' }} 
                placeholder="Value"
              ></textarea>
            </div>
            <div className="col-md-6">
              <label className="form-label fw-bold text-secondary small">REGRAS:</label>
              <textarea 
                className="form-control border-0 p-3" 
                rows="5" 
                style={{ resize: 'none' }} 
                placeholder="Value"
              ></textarea>
            </div>
          </div>

          {/* Linha 3 (Datas) */}
          <div className="row g-3 mb-5">
            <div className="col-md-3">
              <label className="form-label fw-bold text-secondary small">DATA DE INÍCIO:</label>
              <input type="date" className="form-control p-3 border-0 text-secondary" />
            </div>
            <div className="col-md-3">
              <label className="form-label fw-bold text-secondary small">DATA DE TÉRMINO:</label>
              <input type="date" className="form-control p-3 border-0 text-secondary" />
            </div>
          </div>

          {/* Botões */}
          <div className="d-flex justify-content-center gap-3">
            <Link to="/paineladm" className="btn btn-primary rounded-pill px-5 py-2 fw-bold shadow border-0" style={{ backgroundColor: '#3b82f6', minWidth: '160px' }}>
              CANCELAR
            </Link>
            <button type="submit" className="btn btn-primary rounded-pill px-5 py-2 fw-bold shadow border-0" style={{ backgroundColor: '#3b82f6', minWidth: '160px' }}>
              CADASTRAR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CadastroPromocao;