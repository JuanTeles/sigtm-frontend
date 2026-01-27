import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../contexts/authContext';

const ListarPromocoes = () => {
  const { user } = useAuth();
  const [promocoes, setPromocoes] = useState([]);
  const [loading, setLoading] = useState(true);

  const podeGerenciar =
    user?.tipoUsuario?.toLowerCase() === 'gestor' ||
    user?.tipoUsuario?.toLowerCase() === 'parceiro';

  // 🔹 Formata data ISO -> dd/MM/yyyy
  const formatarData = (data) => {
    if (!data) return '-';
    const d = new Date(data);
    return d.toLocaleDateString('pt-BR');
  };

  const carregarPromocoes = async () => {
    try {
      const response = await axios.get(
        'http://localhost:8080/promocoes/findall'
      );
      setPromocoes(response.data);
    } catch (error) {
      alert('Erro ao carregar promoções.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarPromocoes();
  }, []);

  const excluirPromocao = async (id) => {
    if (!window.confirm('Deseja realmente excluir esta promoção?')) return;

    try {
      await axios.delete(`http://localhost:8080/promocoes/delete/${id}`);
      carregarPromocoes();
    } catch (error) {
      alert('Erro ao excluir promoção.');
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <p>Carregando promoções...</p>
      </div>
    );
  }

  return (
    <div className="min-vh-100 bg-light py-5">
      <div className="container">

        {/* TOPO */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="fw-bold text-primary m-0">Promoções</h2>
            <p className="text-muted small m-0">
              Lista de promoções cadastradas
            </p>
          </div>

          {podeGerenciar && (
            <div className="d-flex gap-2">
              <Link
                to="/tipos-promocao"
                className="btn btn-outline-primary rounded-pill fw-bold px-4"
              >
                Tipos de Promoção
              </Link>

              <Link
                to="/promocoes/nova"
                className="btn btn-primary rounded-pill fw-bold px-4"
              >
                + Nova Promoção
              </Link>
            </div>
          )}
        </div>

        {/* TABELA */}
        <div className="card border-0 shadow rounded-4 overflow-hidden">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-light">
                <tr>
                  <th className="ps-4">Título</th>
                  <th>Tipo</th>
                  <th>Início</th>
                  <th>Término</th>
                  <th>Descrição</th>
                  <th>Regras</th>
                  {podeGerenciar && (
                    <th className="text-end pe-4">Ações</th>
                  )}
                </tr>
              </thead>

              <tbody>
                {promocoes.length === 0 ? (
                  <tr>
                    <td colSpan={podeGerenciar ? 7 : 6} className="text-center py-4">
                      Nenhuma promoção cadastrada.
                    </td>
                  </tr>
                ) : (
                  promocoes.map((item) => (
                    <tr key={item.id}>
                      <td className="fw-bold ps-4">{item.titulo}</td>
                      <td>{item.tituloTipoPromocao || '-'}</td>
                      <td>{formatarData(item.dataInicio)}</td>
                      <td>{formatarData(item.dataTermino)}</td>
                      <td className="text-truncate" style={{ maxWidth: 200 }}>
                        {item.descricao}
                      </td>
                      <td className="text-truncate" style={{ maxWidth: 200 }}>
                        {item.regras}
                      </td>

                      {podeGerenciar && (
                        <td className="text-end pe-4">
                          <Link
                            to={`/promocoes/editar/${item.id}`}
                            className="btn btn-outline-primary btn-sm me-2"
                          >
                            ✎ Editar
                          </Link>

                          <button
                            onClick={() => excluirPromocao(item.id)}
                            className="btn btn-outline-danger btn-sm"
                          >
                            ❌
                          </button>
                        </td>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ListarPromocoes;