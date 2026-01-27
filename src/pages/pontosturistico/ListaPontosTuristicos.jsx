// src/pages/pontosturistico/ListaPontosTuristicos.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPontosTuristicos, deletePontoTuristico } from '../../api/pontoTuristicoService';
import { useAuth } from '../../contexts/authContext';
import { FaMapMarkerAlt, FaPen, FaTrash, FaPlus, FaEye, FaTimes } from 'react-icons/fa';
import '../../css/PontoTuristico.css'; // Importando o CSS atualizado

function ListaPontosTuristicos() {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [pontos, setPontos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estado para controlar o Modal
  const [modalAberto, setModalAberto] = useState(false);
  // Agora armazena o objeto completo do ponto turístico
  const [pontoSelecionado, setPontoSelecionado] = useState(null);

  useEffect(() => {
    const buscarPontos = async () => {
      try {
        setLoading(true);
        const dados = await getPontosTuristicos();
        setPontos(dados);
      } catch (err) {
        console.error("Erro ao buscar pontos:", err);
        setError(err.response?.data?.message || 'Não foi possível carregar os dados.');
      } finally {
        setLoading(false);
      }
    };

    buscarPontos();
  }, []);

  const handleNovoPonto = () => navigate('/pontos-turisticos/novo');
  const handleEditarPonto = (id) => navigate(`/pontos-turisticos/editar/${id}`);

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este ponto turístico?")) {
      try {
        await deletePontoTuristico(id);
        setPontos(pontos.filter(p => p.id !== id));
        alert("Ponto turístico removido com sucesso!");
      } catch (err) {
        alert("Erro ao excluir. Tente novamente.");
      }
    }
  };

  const handleVerDetalhes = (ponto) => {
    setPontoSelecionado(ponto);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setPontoSelecionado(null);
  };

  const isGestor = user?.tipoUsuario?.toLowerCase() === 'gestor';

  // Helper para formatar endereço (caso não venha formatado do back)
  const formatarEndereco = (end) => {
    if (!end) return 'Endereço não informado';
    return `${end.rua || 'Rua não informada'}, ${end.numero || 'S/N'} - ${end.bairro || ''}, ${end.cidade || ''}/${end.estado || ''}`;
  };

  if (loading) return <div className="page-container"><p>Carregando...</p></div>;
  if (error) return <div className="page-container"><p style={{ color: 'red' }}>Erro: {error}</p></div>;

  return (
    <div className="page-container">
      <div className="header-section">
        <h1>Pontos Turísticos</h1>
        
        {isGestor && (
          <button className="btn-novo" onClick={handleNovoPonto}>
            <FaPlus /> Novo Ponto
          </button>
        )}
      </div>

      <div className="content-card">
        {pontos.length === 0 ? (
          <p className="empty-msg" style={{textAlign: 'center', padding: '20px', color: '#666'}}>
            Nenhum ponto turístico cadastrado.
          </p>
        ) : (
          <table className="custom-table">
            <thead>
              <tr>
                <th>NOME</th>
                <th>LOCALIZAÇÃO</th>
                <th>BAIRRO</th>
                <th>{isGestor ? 'AÇÕES' : 'DETALHES'}</th>
              </tr>
            </thead>
            <tbody>
              {pontos.map((ponto) => (
                <tr key={ponto.id}>
                  <td>
                    <div className="cell-nome">
                      <FaMapMarkerAlt className="icon-loc" />
                      {ponto.nome}
                    </div>
                  </td>
                  <td>
                    {ponto.endereco 
                      ? `${ponto.endereco.cidade} - ${ponto.endereco.estado}`
                      : 'Endereço n/d'}
                  </td>
                  <td>{ponto.endereco?.bairro || '-'}</td>
                  <td>
                    <div className="actions">
                      {isGestor ? (
                        <>
                          <button 
                            className="btn-action btn-edit" 
                            title="Editar"
                            onClick={() => handleEditarPonto(ponto.id)}
                          >
                            <FaPen />
                          </button>
                          <button 
                            className="btn-action btn-delete" 
                            title="Excluir"
                            onClick={() => handleDelete(ponto.id)}
                          >
                            <FaTrash />
                          </button>
                        </>
                      ) : (
                        <button 
                          className="btn-action" 
                          title="Ver Detalhes"
                          style={{ backgroundColor: '#17a2b8', color: '#fff', border: 'none' }}
                          onClick={() => handleVerDetalhes(ponto)}
                        >
                          <FaEye />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* MODAL COMPLETO */}
      {modalAberto && pontoSelecionado && (
        <div className="modal-overlay">
          <div className="modal-content-custom">
            
            <div className="modal-header">
              <h3>{pontoSelecionado.nome}</h3>
              <button onClick={fecharModal} className="modal-close-btn">
                <FaTimes />
              </button>
            </div>
            
            <div className="modal-body">
              
              <div className="detail-item">
                <span className="detail-label">Descrição</span>
                <span className="detail-value">
                  {pontoSelecionado.descricao || "Nenhuma descrição informada."}
                </span>
              </div>

              <div className="detail-item">
                <span className="detail-label">Endereço Completo</span>
                <span className="detail-value">
                  {formatarEndereco(pontoSelecionado.endereco)}
                </span>
              </div>

              <div className="detail-item" style={{ display: 'flex', gap: '20px' }}>
                <div>
                  <span className="detail-label">Abertura</span>
                  <span className="detail-value">{pontoSelecionado.horarioAbertura || '-'}</span>
                </div>
                <div>
                  <span className="detail-label">Fechamento</span>
                  <span className="detail-value">{pontoSelecionado.horarioFechamento || '-'}</span>
                </div>
              </div>

              <div className="detail-item">
                <span className="detail-label">Nível de Acessibilidade</span>
                <span className="detail-value">
                  {pontoSelecionado.nivelAcessibilidade 
                    ? `Nível ${pontoSelecionado.nivelAcessibilidade}` 
                    : 'Não informado'}
                </span>
              </div>

              {pontoSelecionado.nomeGestorResponsavel && (
                <div className="detail-item">
                  <span className="detail-label">Responsável</span>
                  <span className="detail-value">{pontoSelecionado.nomeGestorResponsavel}</span>
                </div>
              )}

            </div>
            
            <div className="modal-footer">
              <button onClick={fecharModal} className="btn-modal-close">
                Fechar
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

export default ListaPontosTuristicos;