import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const ListarTiposPromocao = () => {
  const [tipos, setTipos] = useState([
    { id: 1, titulo: "Desconto Sazonal", descricao: "Aplicada em épocas específicas do ano." },
    { id: 2, titulo: "Oferta Especial", descricao: "Promoções de curto prazo para atrair clientes." },
  ]);

  const [showModalExcluir, setShowModalExcluir] = useState(false);
  const [itemSelecionado, setItemSelecionado] = useState(null);

  const handleExcluir = (item) => {
    setItemSelecionado(item);
    setShowModalExcluir(true);
  };

  const confirmExcluir = () => {
    setTipos(tipos.filter(t => t.id !== itemSelecionado.id));
    setShowModalExcluir(false);
    alert("Tipo de promoção excluído.");
  };

  return (
    <div className="min-vh-100 bg-light py-5 font-sans">
      <div className="container">

        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="fw-bold text-primary m-0">Tipos de Promoção</h2>
            <p className="text-muted small m-0">Gerencie os tipos cadastrados.</p>
          </div>

          <Link to="/Promocoes" className="btn btn-primary rounded-pill fw-bold px-4 shadow">
            + Promoções
          </Link>
        </div>

        <div className="card border-0 shadow-lg rounded-4 overflow-hidden">

          {/* Busca */}
          <div className="card-header bg-white border-0 p-4 d-flex flex-column flex-md-row gap-3 justify-content-between align-items-center">
            <div className="input-group" style={{ maxWidth: '400px' }}>
              <span className="input-group-text bg-light border-0 ps-3 rounded-start-4 text-muted">🔍</span>
              <input className="form-control bg-light border-0 py-2 rounded-end-4 text-secondary fw-semibold"
                     placeholder="Buscar por título..." />
            </div>

            <button className="btn btn-light text-primary rounded-circle p-2 shadow-sm">🔄</button>
          </div>

          {/* Tabela */}
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-light">
                <tr>
                  <th className="py-3 ps-4 text-uppercase text-muted small fw-bold border-0">Título</th>
                  <th className="py-3 text-uppercase text-muted small fw-bold border-0">Descrição</th>
                  <th className="py-3 text-end pe-4 text-uppercase text-muted small fw-bold border-0">Ações</th>
                </tr>
              </thead>
              <tbody>
                {tipos.map(item => (
                  <tr key={item.id}>
                    <td className="fw-bold ps-4">{item.titulo}</td>
                    <td className="text-secondary">{item.descricao}</td>
                    <td className="text-end pe-4">
                      <div className="d-flex justify-content-end gap-2">
                        <Link to={`/tipos-promocao/editar/:id${item.id}`} className="btn btn-outline-primary btn-sm border-0 px-3">
                          ✎ Editar
                        </Link>
                        <button onClick={() => handleExcluir(item)} className="btn btn-outline-danger btn-sm border-0 px-2">
                          ❌
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="card-footer bg-white border-0 py-3 d-flex justify-content-between align-items-center px-4">
            <small className="text-muted fw-bold">Mostrando {tipos.length} registros</small>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModalExcluir && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
             style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="bg-white p-4 rounded-4 shadow-lg text-center m-3" style={{ maxWidth: "380px" }}>
            <div className="mb-3 text-danger" style={{ fontSize: "3rem" }}>🗑️</div>
            <h4 className="fw-bold">Excluir Tipo?</h4>
            <p className="text-muted">
              Confirmar exclusão de <strong>{itemSelecionado?.titulo}</strong>?
            </p>

            <div className="d-flex justify-content-center gap-2">
              <button className="btn btn-light rounded-pill px-4 fw-bold"
                      onClick={() => setShowModalExcluir(false)}>Cancelar</button>

              <button className="btn btn-danger rounded-pill px-4 fw-bold shadow-sm"
                      onClick={confirmExcluir}>Excluir</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListarTiposPromocao;
