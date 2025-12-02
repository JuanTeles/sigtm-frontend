import React from 'react';
import { Link } from 'react-router-dom';

const EditarPromocao = () => {
  return (
    <div className="container py-5">
      <h1 className="fw-bold mb-4">EDITAR PROMOÇÃO</h1>

      <div className="p-4 p-md-5 rounded shadow-sm" style={{ backgroundColor: '#e5e7eb' }}>
        <form>
          {/* Linha 1 */}
          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <label className="form-label fw-bold text-secondary small">TÍTULO:</label>
              <input type="text" className="form-control p-3 border-0" defaultValue="Black Friday Irecê" />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-bold text-secondary small">TIPO DE PROMOÇÃO:</label>
              <input type="text" className="form-control p-3 border-0" defaultValue="Desconto Sazonal" />
            </div>
          </div>

          {/* Linha 2 */}
          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <label className="form-label fw-bold text-secondary small">DESCRIÇÃO</label>
              <textarea 
                className="form-control border-0 p-3" 
                rows="5" 
                style={{ resize: 'none' }} 
                defaultValue="Super descontos em todas as lojas do centro."
              ></textarea>
            </div>
            <div className="col-md-6">
              <label className="form-label fw-bold text-secondary small">REGRAS:</label>
              <textarea 
                className="form-control border-0 p-3" 
                rows="5" 
                style={{ resize: 'none' }} 
                defaultValue="Não acumulativo com outras promoções."
              ></textarea>
            </div>
          </div>

          {/* Linha 3 */}
          <div className="row g-3 mb-5">
            <div className="col-md-3">
              <label className="form-label fw-bold text-secondary small">DATA DE INÍCIO:</label>
              <input type="date" className="form-control p-3 border-0 text-secondary" defaultValue="2025-11-20" />
            </div>
            <div className="col-md-3">
              <label className="form-label fw-bold text-secondary small">DATA DE TÉRMINO:</label>
              <input type="date" className="form-control p-3 border-0 text-secondary" defaultValue="2025-11-25" />
            </div>
          </div>

          {/* Botões */}
          <div className="d-flex justify-content-center gap-3">
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

export default EditarPromocao;