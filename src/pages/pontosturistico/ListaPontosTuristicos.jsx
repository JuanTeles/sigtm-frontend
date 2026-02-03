// src/pages/pontosturistico/ListaPontosTuristicos.jsx

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getPontosTuristicos,
  deletePontoTuristico,
} from "../../api/pontoTuristicoService";
// [IMPORT ATUALIZADO] Adicionado getAvaliacoesPorPonto
import { saveAvaliacao, getAvaliacoesPorPonto } from "../../api/avaliacaoService";
import { useAuth } from "../../contexts/authContext";
import {
  FaMapMarkerAlt,
  FaPen,
  FaTrash,
  FaPlus,
  FaEye,
  FaTimes,
  FaStar,
  FaUserCircle // [IMPORT NOVO] Ícone de usuário para a lista de comentários
} from "react-icons/fa";
import "../../css/PontoTuristico.css";

function ListaPontosTuristicos() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [pontos, setPontos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estados para controlar o Modal de Detalhes
  const [modalAberto, setModalAberto] = useState(false);
  const [pontoSelecionado, setPontoSelecionado] = useState(null);

  // [NOVOS ESTADOS] Para carregar a lista de avaliações dentro do modal de detalhes
  const [avaliacoesDoPonto, setAvaliacoesDoPonto] = useState([]);
  const [loadingAvaliacoes, setLoadingAvaliacoes] = useState(false);

  // Estados para o Modal de Avaliação (Cadastro)
  const [modalAvaliacaoAberto, setModalAvaliacaoAberto] = useState(false);
  const [pontoParaAvaliar, setPontoParaAvaliar] = useState(null);
  const [dadosAvaliacao, setDadosAvaliacao] = useState({ estrelas: 5, descricao: "" });

  const isGestor = user?.tipoUsuario?.toLowerCase() === "gestor";

  useEffect(() => {
    const buscarPontos = async () => {
      try {
        setLoading(true);
        const dados = await getPontosTuristicos();
        setPontos(dados);
      } catch (err) {
        console.error("Erro ao buscar pontos:", err);
        setError(
          err.response?.data?.message || "Não foi possível carregar os dados.",
        );
      } finally {
        setLoading(false);
      }
    };

    buscarPontos();
  }, []);

  const handleNovoPonto = () => navigate("/pontos-turisticos/novo");
  const handleEditarPonto = (id) => navigate(`/pontos-turisticos/editar/${id}`);
  
  // Atalho para ir ver minhas avaliações
  const handleIrParaAvaliacoes = () => {
    navigate("/avaliacoes");
  };

  const handleDelete = async (id) => {
    if (
      window.confirm("Tem certeza que deseja excluir este ponto turístico?")
    ) {
      try {
        await deletePontoTuristico(id);
        setPontos(pontos.filter((p) => p.id !== id));
        alert("Ponto turístico removido com sucesso!");
      } catch (err) {
        alert("Erro ao excluir. Tente novamente.");
      }
    }
  };

  // [ALTERADO] Função atualizada para buscar as avaliações ao abrir os detalhes
  const handleVerDetalhes = async (ponto) => {
    setPontoSelecionado(ponto);
    setModalAberto(true);
    
    // Reseta a lista anterior e define loading
    setAvaliacoesDoPonto([]);
    setLoadingAvaliacoes(true);

    try {
        // Busca as avaliações públicas deste ponto
        const data = await getAvaliacoesPorPonto(ponto.id);
        setAvaliacoesDoPonto(data);
    } catch (error) {
        console.error("Erro ao carregar avaliações no modal:", error);
    } finally {
        setLoadingAvaliacoes(false);
    }
  };

  const fecharModal = () => {
    setModalAberto(false);
    setPontoSelecionado(null);
    setAvaliacoesDoPonto([]); // Limpa a lista ao fechar
  };

  // Funções para Avaliação (Cadastro)
  const handleAbrirAvaliacao = (ponto) => {
    setPontoParaAvaliar(ponto);
    setDadosAvaliacao({ estrelas: 5, descricao: "" });
    setModalAvaliacaoAberto(true);
  };

  const handleSalvarAvaliacao = async () => {
    if (!dadosAvaliacao.descricao.trim()) {
      alert("Por favor, escreva uma descrição.");
      return;
    }

    try {
      // Chama a API com tipo 'pontos'
      await saveAvaliacao(pontoParaAvaliar.id, dadosAvaliacao, 'pontos');
      alert("Avaliação registrada com sucesso!");
      setModalAvaliacaoAberto(false);
    } catch (error) {
      console.error(error);
      alert(error.message || "Erro ao salvar avaliação. Você já avaliou este local?");
    }
  };

  const formatarEndereco = (end) => {
    if (!end) return "Endereço não informado";
    return `${end.rua || "Rua não informada"}, ${end.numero || "S/N"} - ${end.bairro || ""}, ${end.cidade || ""}/${end.estado || ""}`;
  };

  // Helper para renderizar estrelas na visualização de comentários
  const renderEstrelas = (qtd) => {
    return [...Array(5)].map((_, i) => (
        <FaStar key={i} size={14} color={i < qtd ? "#f1c40f" : "#e4e5e9"} />
    ));
  };

  if (loading)
    return (
      <div className="page-container">
        <p>Carregando...</p>
      </div>
    );
  if (error)
    return (
      <div className="page-container">
        <p style={{ color: "red" }}>Erro: {error}</p>
      </div>
    );

  return (
    <div className="page-container">
      <div className="header-section">
        <h1>Pontos Turísticos</h1>

        <div style={{ display: "flex", gap: "10px" }}>
            {/* Botão Minhas Avaliações */}
            {user && (
                <button 
                    className="btn-novo" 
                    onClick={handleIrParaAvaliacoes}
                    style={{ backgroundColor: '#f1c40f', border: 'none' }}
                >
                    <FaStar /> Minhas Avaliações
                </button>
            )}

            {isGestor && (
            <button className="btn-novo" onClick={handleNovoPonto}>
                <FaPlus /> Novo Ponto
            </button>
            )}
        </div>
      </div>

      <div className="content-card">
        {pontos.length === 0 ? (
          <p
            className="empty-msg"
            style={{ textAlign: "center", padding: "20px", color: "#666" }}
          >
            Nenhum ponto turístico cadastrado.
          </p>
        ) : (
          <table className="custom-table">
            <thead>
              <tr>
                <th>NOME</th>
                <th>LOCALIZAÇÃO</th>
                <th>BAIRRO</th>
                <th>{isGestor ? "AÇÕES" : "DETALHES"}</th>
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
                      : "Endereço n/d"}
                  </td>
                  <td>{ponto.endereco?.bairro || "-"}</td>
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
                        // Ações para Usuário Comum
                        <div style={{ display: "flex", gap: "5px" }}>
                            <button
                                className="btn-action"
                                title="Ver Detalhes e Avaliações"
                                style={{
                                    backgroundColor: "#17a2b8",
                                    color: "#fff",
                                    border: "none",
                                }}
                                onClick={() => handleVerDetalhes(ponto)}
                            >
                                <FaEye />
                            </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* MODAL DE DETALHES + LISTA DE AVALIAÇÕES */}
      {modalAberto && pontoSelecionado && (
        <div className="modal-overlay">
          <div className="modal-content-custom" style={{ maxWidth: '600px' }}>
            <div className="modal-header">
              <h3>{pontoSelecionado.nome}</h3>
              <button onClick={fecharModal} className="modal-close-btn">
                <FaTimes />
              </button>
            </div>

            <div className="modal-body">
              {/* --- Detalhes do Ponto --- */}
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

              <div
                className="detail-item"
                style={{ display: "flex", gap: "20px" }}
              >
                <div>
                  <span className="detail-label">Abertura</span>
                  <span className="detail-value">
                    {pontoSelecionado.horarioAbertura || "-"}
                  </span>
                </div>
                <div>
                  <span className="detail-label">Fechamento</span>
                  <span className="detail-value">
                    {pontoSelecionado.horarioFechamento || "-"}
                  </span>
                </div>
              </div>

              <div className="detail-item">
                <span className="detail-label">Nível de Acessibilidade</span>
                <span className="detail-value">
                  {pontoSelecionado.nivelAcessibilidade
                    ? `Nível ${pontoSelecionado.nivelAcessibilidade}`
                    : "Não informado"}
                </span>
              </div>

              {pontoSelecionado.nomeGestorResponsavel && (
                <div className="detail-item">
                  <span className="detail-label">Responsável</span>
                  <span className="detail-value">
                    {pontoSelecionado.nomeGestorResponsavel}
                  </span>
                </div>
              )}

              {/* --- SEÇÃO DE AVALIAÇÕES NO MODAL --- */}
              <hr style={{ margin: "20px 0", border: "0", borderTop: "1px solid #eee" }} />
              
              <h4 style={{ 
                  fontSize: "1.1rem", 
                  color: "#333", 
                  marginBottom: "15px", 
                  display: "flex", 
                  alignItems: "center", 
                  gap: "8px" 
              }}>
                <FaStar color="#f1c40f" /> O que os visitantes dizem
              </h4>

              {loadingAvaliacoes ? (
                <p style={{ color: "#666", fontStyle: "italic", textAlign: "center" }}>Carregando avaliações...</p>
              ) : avaliacoesDoPonto.length === 0 ? (
                <p style={{ 
                    color: "#999", 
                    textAlign: "center", 
                    padding: "15px", 
                    background: "#f9f9f9", 
                    borderRadius: "8px" 
                }}>
                   Ainda não há avaliações para este local.
                </p>
              ) : (
                <div style={{ maxHeight: "250px", overflowY: "auto", paddingRight: "5px" }}>
                   {avaliacoesDoPonto.map((av) => (
                     <div key={av.id} style={{ 
                        backgroundColor: "#fff", 
                        border: "1px solid #e0e0e0", 
                        borderRadius: "8px", 
                        padding: "12px", 
                        marginBottom: "10px",
                        boxShadow: "0 1px 2px rgba(0,0,0,0.03)"
                     }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: "600", color: "#444" }}>
                                <FaUserCircle color="#ccc" size={20} />
                                <span>{av.nomeAutor || "Visitante Anônimo"}</span>
                            </div>
                            <div title={`${av.estrelas} Estrelas`}>
                                {renderEstrelas(av.estrelas)}
                            </div>
                        </div>
                        <p style={{ margin: "0 0 0 28px", color: "#555", fontSize: "0.9rem", lineHeight: "1.4" }}>
                            {av.descricao}
                        </p>
                     </div>
                   ))}
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