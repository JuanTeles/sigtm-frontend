import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const ListarPromocoes = () => {
  const [promocoes, setPromocoes] = useState([
    {
      id: 1,
      titulo: "Black Friday Irecê",
      tipo: "Desconto Sazonal",
      dataInicio: "20/11/2025",
      dataFim: "25/11/2025",
      status: "Ativa"
    },
    {
      id: 2,
      titulo: "Festival de Verão",
      tipo: "Oferta Especial",
      dataInicio: "01/12/2025",
      dataFim: "15/12/2025",
      status: "Agendada"
    },
  ]);

  const [showModalExcluir, setShowModalExcluir] = useState(false);
  const [itemSelecionado, setItemSelecionado] = useState(null);

  const handleClickExcluir = (item) => {
    setItemSelecionado(item);
    setShowModalExcluir(true);
  };

  const handleConfirmarExclusao = () => {
    setPromocoes(promocoes.filter(p => p.id !== itemSelecionado.id));
    setShowModalExcluir(false);
    alert("Promoção removida com sucesso.");
  };

  return (
    <div className="min-vh-100 bg-light py-5 font-sans">
      <div className="container">

        {/* Cabeçalho */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="fw-bold text-primary m-0">Promoções</h2>
            <p className="text-muted small m-0">Gerencie as promoções cadastradas.</p>
          </div>

          <Link to="/tipos-promocao" className="btn btn-primary rounded-pill fw-bold px-4 shadow">
            + Tipos de promoção
          </Link>
        </div>

        {/* CARD */}
        <div className="card border-0 shadow-lg rounded-4 overflow-hidden">

          {/* Busca */}
          <div className="card-header bg-white border-0 p-4 d-flex flex-column flex-md-row gap-3 justify-content-between align-items-center">
            <div className="input-group" style={{ maxWidth: '400px' }}>
              <span className="input-group-text bg-light border-0 ps-3 rounded-start-4 text-muted">
                🔍
              </span>
              <input 
                type="text"
                className="form-control bg-light border-0 py-2 rounded-end-4 text-secondary fw-semibold"
                placeholder="Buscar por título ou tipo..."
              />
            </div>

            <button className="btn btn-light text-primary rounded-circle p-2 shadow-sm" title="Atualizar">
              🔄
            </button>
          </div>

          {/* Tabela */}
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-light">
                <tr>
                  <th className="py-3 ps-4 text-uppercase text-muted small fw-bold border-0">Título</th>
                  <th className="py-3 text-uppercase text-muted small fw-bold border-0">Tipo</th>
                  <th className="py-3 text-uppercase text-muted small fw-bold border-0">Início</th>
                  <th className="py-3 text-uppercase text-muted small fw-bold border-0">Término</th>
                  <th className="py-3 text-uppercase text-muted small fw-bold border-0">Status</th>
                  <th className="py-3 text-end pe-4 text-uppercase text-muted small fw-bold border-0">Ações</th>
                </tr>
              </thead>
              <tbody>
                {promocoes.map(item => (
                  <tr key={item.id}>
                    <td className="ps-4 fw-bold">{item.titulo}</td>
                    <td className="text-secondary fw-semibold">{item.tipo}</td>
                    <td>{item.dataInicio}</td>
                    <td>{item.dataFim}</td>
                    <td>
                      <span className="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3">
                        {item.status}
                      </span>
                    </td>
                    <td className="text-end pe-4">
                      <div className="d-flex justify-content-end gap-2">
                        <Link to={`/promocoes/editar/:id${item.id}`} className="btn btn-outline-primary btn-sm rounded-3 border-0 px-3 fw-bold">
                          ✎ Editar
                        </Link>
                        <button
                          onClick={() => handleClickExcluir(item)}
                          className="btn btn-outline-danger btn-sm rounded-3 border-0 px-2"
                        >
                          ❌
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Rodapé */}
          <div className="card-footer bg-white border-0 py-3 d-flex justify-content-between align-items-center px-4">
            <small className="text-muted fw-bold">Mostrando {promocoes.length} registros</small>
          </div>
        </div>
      </div>

      {/* MODAL EXCLUIR */}
      {showModalExcluir && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
             style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
          <div className="bg-white p-4 rounded-4 shadow-lg text-center m-3" style={{ maxWidth: '380px' }}>
            <div className="mb-3 text-danger" style={{ fontSize: '3rem' }}>🗑️</div>
            <h4 className="fw-bold text-dark mb-2">Excluir Promoção?</h4>
            <p className="text-muted mb-4">
              Deseja realmente excluir <strong>{itemSelecionado?.titulo}</strong>?
            </p>

            <div className="d-flex justify-content-center gap-2">
              <button onClick={() => setShowModalExcluir(false)} className="btn btn-light rounded-pill px-4 fw-bold">
                Cancelar
              </button>
              <button onClick={handleConfirmarExclusao} className="btn btn-danger rounded-pill px-4 fw-bold shadow-sm">
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ListarPromocoes;
