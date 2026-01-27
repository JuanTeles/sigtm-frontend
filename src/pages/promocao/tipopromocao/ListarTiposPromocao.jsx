import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../../contexts/authContext';

const ListarTiposPromocao = () => {
  const { user } = useAuth();

  const [tipos, setTipos] = useState([]);
  const [showModalExcluir, setShowModalExcluir] = useState(false);
  const [itemSelecionado, setItemSelecionado] = useState(null);

  // 🔐 Verifica perfil
  const tipoUsuario = user?.tipoUsuario?.toLowerCase();
  const podeGerenciar =
    tipoUsuario === 'gestor' || tipoUsuario === 'parceiro';

  const carregarDados = () => {
    axios
      .get('http://localhost:8080/tipos-promocao/findall')
      .then(res => setTipos(res.data))
      .catch(() => alert('Erro ao carregar tipos.'));
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const handleExcluir = (item) => {
    setItemSelecionado(item);
    setShowModalExcluir(true);
  };

  const confirmExcluir = async () => {
    await axios.delete(
      `http://localhost:8080/tipos-promocao/delete/${itemSelecionado.id}`
    );
    setShowModalExcluir(false);
    carregarDados();
  };

  return (
    <div className="min-vh-100 bg-light py-5">
      <div className="container">

        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="fw-bold text-primary m-0">Tipos de Promoção</h2>
            <p className="text-muted small m-0">
              Gerencie os tipos cadastrados.
            </p>
          </div>

          {/* BOTÃO NOVO TIPO */}
          {podeGerenciar && (
            <Link
              to="/tipos-promocao/novo"
              className="btn btn-primary rounded-pill fw-bold px-4 shadow"
            >
              + Novo Tipo
            </Link>
          )}
        </div>

        <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-light">
                <tr>
                  <th className="ps-4">Título</th>
                  <th>Descrição</th>
                  {podeGerenciar && (
                    <th className="text-end pe-4">Ações</th>
                  )}
                </tr>
              </thead>

              <tbody>
                {tipos.map(item => (
                  <tr key={item.id}>
                    <td className="fw-bold ps-4">{item.titulo}</td>
                    <td>{item.descricao}</td>

                    {/* BOTÕES EDITAR / EXCLUIR */}
                    {podeGerenciar && (
                      <td className="text-end pe-4">
                        <Link
                          to={`/tipos-promocao/editar/${item.id}`}
                          className="btn btn-outline-primary btn-sm me-2"
                        >
                          ✎ Editar
                        </Link>

                        <button
                          onClick={() => handleExcluir(item)}
                          className="btn btn-outline-danger btn-sm"
                        >
                          ❌
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>
      </div>

      {/* MODAL DE EXCLUSÃO */}
      {showModalExcluir && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <div className="bg-white p-4 rounded-4 text-center">
            <h4 className="fw-bold">Excluir Tipo?</h4>
            <p>
              Confirmar exclusão de{' '}
              <strong>{itemSelecionado?.titulo}</strong>?
            </p>

            <div className="d-flex justify-content-center gap-2">
              <button
                className="btn btn-light"
                onClick={() => setShowModalExcluir(false)}
              >
                Cancelar
              </button>

              <button
                className="btn btn-danger"
                onClick={confirmExcluir}
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListarTiposPromocao;