// src/pages/evento/ListaEventos.jsx

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getEventos,
  deleteEvento,
  getEventosFuturos,
} from "../../api/eventoService";
// [IMPORT ATUALIZADO] Adicionado getAvaliacoesPorEvento
import { saveAvaliacao, getAvaliacoesPorEvento } from "../../api/avaliacaoService";
import {
  FaCalendarAlt,
  FaPen,
  FaTrash,
  FaPlus,
  FaEye,
  FaTimes,
  FaStar,
  FaUserCircle // [IMPORT NOVO]
} from "react-icons/fa";
import { useAuth } from "../../contexts/authContext";
import "../../css/Evento.css";

function ListaEventos() {
  const navigate = useNavigate();
  const { user } = useAuth(); 

  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filtro
  const [mostrarFuturos, setMostrarFuturos] = useState(true);

  // Estados para controlar o Modal de Detalhes (Visualização)
  const [modalAberto, setModalAberto] = useState(false);
  const [eventoSelecionado, setEventoSelecionado] = useState(null);

  // [NOVOS ESTADOS] Para carregar a lista de avaliações dentro do modal de detalhes
  const [avaliacoesDoEvento, setAvaliacoesDoEvento] = useState([]);
  const [loadingAvaliacoes, setLoadingAvaliacoes] = useState(false);

  // Estados para o Modal de Avaliação (Cadastro)
  const [modalAvaliacaoAberto, setModalAvaliacaoAberto] = useState(false);
  const [eventoParaAvaliar, setEventoParaAvaliar] = useState(null);
  const [dadosAvaliacao, setDadosAvaliacao] = useState({ estrelas: 5, descricao: "" });

  // Permissão de gestor
  const isGestor = user?.tipoUsuario?.toLowerCase() === "gestor";

  useEffect(() => {
    const carregarEventos = async () => {
      try {
        setLoading(true);
        let data;
        if (mostrarFuturos) {
          data = await getEventosFuturos();
        } else {
          data = await getEventos();
        }
        console.log(`Dados recebidos (Futuros: ${mostrarFuturos}):`, data);
        setEventos(data);
      } catch (err) {
        console.error("Erro ao carregar eventos:", err);
        setError("Não foi possível carregar a lista de eventos.");
      } finally {
        setLoading(false);
      }
    };

    carregarEventos();
  }, [mostrarFuturos]);

  const handleNovoEvento = () => {
    navigate("/eventos/novo");
  };

  const handleIrParaAvaliacoes = () => {
    navigate("/avaliacoes");
  };

  const handleEditarEvento = (id) => {
    navigate(`/eventos/editar/${id}`);
  };

  const handleDelete = async (id) => {
    const confirmacao = window.confirm("Deseja realmente excluir este evento?");
    if (confirmacao) {
      try {
        await deleteEvento(id);
        setEventos((listaAtual) =>
          listaAtual.filter((evento) => evento.id !== id),
        );
        alert("Evento excluído com sucesso!");
      } catch (err) {
        console.error("Erro ao excluir:", err);
        alert("Erro ao excluir o evento. Tente novamente.");
      }
    }
  };

  // [ALTERADO] Função para abrir modal de detalhes e carregar avaliações
  const handleVerDetalhes = async (evento) => {
    setEventoSelecionado(evento);
    setModalAberto(true);

    // Reseta lista e inicia loading
    setAvaliacoesDoEvento([]);
    setLoadingAvaliacoes(true);

    try {
        const data = await getAvaliacoesPorEvento(evento.id);
        setAvaliacoesDoEvento(data);
    } catch (error) {
        console.error("Erro ao carregar avaliações no modal:", error);
    } finally {
        setLoadingAvaliacoes(false);
    }
  };

  const fecharModal = () => {
    setModalAberto(false);
    setEventoSelecionado(null);
    setAvaliacoesDoEvento([]); // Limpa ao fechar
  };

  // Funções para o Modal de Avaliação (Cadastro)
  const handleAbrirAvaliacao = (evento) => {
    setEventoParaAvaliar(evento);
    setDadosAvaliacao({ estrelas: 5, descricao: "" }); // Resetar formulário
    setModalAvaliacaoAberto(true);
  };

  const handleSalvarAvaliacao = async () => {
    if (!dadosAvaliacao.descricao.trim()) {
      alert("Por favor, escreva uma descrição.");
      return;
    }

    try {
      // Chama a API passando 'eventos' como o tipo do item
      await saveAvaliacao(eventoParaAvaliar.id, dadosAvaliacao, 'eventos');
      alert("Avaliação registrada com sucesso!");
      setModalAvaliacaoAberto(false);
    } catch (error) {
      console.error(error);
      alert(error.message || "Erro ao salvar avaliação. Verifique se você já avaliou este evento.");
    }
  };

  // --- FUNÇÕES DE FORMATAÇÃO ---
  const formatarData = (dataString) => {
    if (!dataString) return "Data n/d";
    const partes = dataString.split("-");
    if (partes.length === 3) {
      return `${partes[2]}/${partes[1]}/${partes[0]}`;
    }
    return dataString;
  };

  const formatarHora = (horaIso) => {
    if (!horaIso) return "";
    if (horaIso.includes("T")) {
      const tempo = horaIso.split("T")[1];
      return tempo.substring(0, 5);
    }
    return horaIso;
  };

  const formatarEndereco = (end) => {
    if (!end) return "Endereço não informado";
    return `${end.rua || ""}, ${end.numero || "S/N"} - ${end.bairro || ""}, ${end.cidade || ""}/${end.estado || ""}`;
  };

  // Helper para renderizar estrelas na lista
  const renderEstrelas = (qtd) => {
    return [...Array(5)].map((_, i) => (
        <FaStar key={i} size={14} color={i < qtd ? "#f1c40f" : "#e4e5e9"} />
    ));
  };

  if (loading)
    return (
      <div className="page-container">
        <p>Carregando eventos...</p>
      </div>
    );
  if (error)
    return (
      <div className="page-container">
        <p style={{ color: "red" }}>{error}</p>
      </div>
    );

  return (
    <div className="page-container">
      <div className="header-section">
        <h1>Eventos</h1>

        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          
          {/* Botão para ver MINHAS avaliações (navegação) */}
          {user && (
            <button 
                className="btn-novo" 
                onClick={handleIrParaAvaliacoes}
                style={{ backgroundColor: '#f1c40f', border: 'none' }}
                title="Minhas Avaliações"
            >
                <FaStar /> Minhas Avaliações
            </button>
          )}

          {/* CHECKBOX DE FILTRO */}
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer",
              backgroundColor: "#fff",
              padding: "8px 12px",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
              fontSize: "0.9rem",
              fontWeight: "500",
              color: "#555",
            }}
          >
            <input
              type="checkbox"
              checked={mostrarFuturos}
              onChange={(e) => setMostrarFuturos(e.target.checked)}
              style={{ cursor: "pointer" }}
            />
            Apenas Futuros
          </label>

          {/* Botão Novo Evento */}
          {(isGestor || user?.tipoUsuario?.toLowerCase() === "parceiro") && (
            <button className="btn-novo" onClick={handleNovoEvento}>
              <FaPlus /> Novo Evento
            </button>
          )}
        </div>
      </div>

      <div className="content-card">
        {eventos.length === 0 ? (
          <p style={{ padding: "20px", textAlign: "center", color: "#666" }}>
            {mostrarFuturos
              ? "Nenhum evento futuro encontrado."
              : "Nenhum evento cadastrado."}
          </p>
        ) : (
          <table className="custom-table">
            <thead>
              <tr>
                <th className="col-nome">EVENTO</th>
                <th className="col-data">DATA / HORÁRIO</th>
                <th className="col-local">LOCAL</th>
                <th className="col-acoes">
                  {isGestor ? "AÇÕES" : "DETALHES"}
                </th>
              </tr>
            </thead>
            <tbody>
              {eventos.map((evento) => (
                <tr key={evento.id}>
                  <td>
                    <div className="cell-nome">
                      <span className="icon-loc">
                        <FaCalendarAlt size={16} />
                      </span>
                      {evento.nome}
                    </div>
                  </td>
                  <td>
                    <div style={{ fontWeight: "500" }}>
                      {formatarData(evento.data)}
                    </div>
                    <div
                      style={{
                        fontSize: "0.85em",
                        color: "#666",
                        marginTop: "4px",
                      }}
                    >
                      {formatarHora(evento.hora)}
                    </div>
                  </td>
                  <td>
                    {evento.endereco
                      ? `${evento.endereco.cidade} - ${evento.endereco.estado}`
                      : evento.local || "Local não informado"}
                  </td>
                  <td>
                    <div className="actions">
                      {isGestor ||
                      (user?.tipoUsuario?.toLowerCase() === "parceiro" &&
                        evento.parceiroId === user.id) ? (
                        <>
                          <button
                            className="btn-action btn-edit"
                            title="Editar"
                            onClick={() => handleEditarEvento(evento.id)}
                          >
                            <FaPen size={12} />
                          </button>

                          {isGestor && (
                            <button
                              className="btn-action btn-delete"
                              title="Excluir"
                              onClick={() => handleDelete(evento.id)}
                            >
                              <FaTrash size={12} />
                            </button>
                          )}
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
                              onClick={() => handleVerDetalhes(evento)}
                            >
                              <FaEye size={12} />
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

      {/* --- MODAL DE DETALHES + LISTA DE AVALIAÇÕES --- */}
      {modalAberto && eventoSelecionado && (
        <div className="modal-overlay">
          <div className="modal-content-custom" style={{ maxWidth: '600px' }}>
            <div className="modal-header">
              <h3>{eventoSelecionado.nome}</h3>
              <button onClick={fecharModal} className="modal-close-btn">
                <FaTimes />
              </button>
            </div>

            <div className="modal-body">
              {/* --- Detalhes do Evento --- */}
              <div className="detail-item">
                <span className="detail-label">Descrição</span>
                <span className="detail-value">
                  {eventoSelecionado.descricao ||
                    "Nenhuma descrição informada."}
                </span>
              </div>

              <div className="detail-item">
                <span className="detail-label">Endereço Completo</span>
                <span className="detail-value">
                  {formatarEndereco(eventoSelecionado.endereco)}
                </span>
              </div>

              <div
                className="detail-item"
                style={{ display: "flex", gap: "20px" }}
              >
                <div>
                  <span className="detail-label">Data</span>
                  <span className="detail-value">
                    {formatarData(eventoSelecionado.data)}
                  </span>
                </div>
                <div>
                  <span className="detail-label">Horário</span>
                  <span className="detail-value">
                    {formatarHora(eventoSelecionado.hora)}
                  </span>
                </div>
              </div>

              <div className="detail-item">
                <span className="detail-label">Nível de Acessibilidade</span>
                <span className="detail-value">
                  {eventoSelecionado.nivelAcessibilidade
                    ? `Nível ${eventoSelecionado.nivelAcessibilidade}`
                    : "Não informado"}
                </span>
              </div>

              <div className="detail-item">
                <span className="detail-label">Público Alvo</span>
                <span className="detail-value">
                  {eventoSelecionado.publicoAlvo || "-"}
                </span>
              </div>

              <div className="detail-item">
                <span className="detail-label">Categoria</span>
                <span className="detail-value">
                  {eventoSelecionado.categoria || "-"}
                </span>
              </div>

              {eventoSelecionado.nomeParceiroResponsavel && (
                <div className="detail-item">
                  <span className="detail-label">Responsável/Parceiro</span>
                  <span className="detail-value">
                    {eventoSelecionado.nomeParceiroResponsavel}
                  </span>
                </div>
              )}

              {/* --- SEÇÃO DE AVALIAÇÕES --- */}
              <hr style={{ margin: "20px 0", border: "0", borderTop: "1px solid #eee" }} />
              
              <h4 style={{ 
                  fontSize: "1.1rem", 
                  color: "#333", 
                  marginBottom: "15px", 
                  display: "flex", 
                  alignItems: "center", 
                  gap: "8px" 
              }}>
                <FaStar color="#f1c40f" /> O que dizem sobre este evento
              </h4>

              {loadingAvaliacoes ? (
                <p style={{ color: "#666", fontStyle: "italic", textAlign: "center" }}>Carregando avaliações...</p>
              ) : avaliacoesDoEvento.length === 0 ? (
                <p style={{ 
                    color: "#999", 
                    textAlign: "center", 
                    padding: "15px", 
                    background: "#f9f9f9", 
                    borderRadius: "8px" 
                }}>
                   Ainda não há avaliações para este evento.
                </p>
              ) : (
                <div style={{ maxHeight: "250px", overflowY: "auto", paddingRight: "5px" }}>
                   {avaliacoesDoEvento.map((av) => (
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

export default ListaEventos;