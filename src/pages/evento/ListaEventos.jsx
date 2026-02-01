import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getEventos,
  deleteEvento,
  getEventosFuturos,
} from "../../api/eventoService";
import {
  FaCalendarAlt,
  FaPen,
  FaTrash,
  FaPlus,
  FaEye,
  FaTimes,
  FaStar, // alterações jeff: adicionado ícone de estrela para avaliações
} from "react-icons/fa"; //  adicionado FaTimes para o modal
import { useAuth } from "../../contexts/authContext"; //  importação do contexto de autenticação
import "../../css/Evento.css";

function ListaEventos() {
  const navigate = useNavigate();
  const { user } = useAuth(); //  obtendo dados do usuário logado

  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // NOVO STATE: Controla o filtro (false = todos, true = apenas futuros)
  const [mostrarFuturos, setMostrarFuturos] = useState(true);

  // Estados para controlar o Modal de Detalhes
  const [modalAberto, setModalAberto] = useState(false);
  const [eventoSelecionado, setEventoSelecionado] = useState(null);

  // definindo a permissão de gestor para uso no componente
  const isGestor = user?.tipoUsuario?.toLowerCase() === "gestor";

  useEffect(() => {
    const carregarEventos = async () => {
      try {
        setLoading(true);

        // LÓGICA DO FILTRO: Escolhe qual serviço chamar
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

  // alterações jeff: Função para navegar até a tela de avaliações
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

  // Funções para abrir e fechar o modal
  const handleVerDetalhes = (evento) => {
    setEventoSelecionado(evento);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setEventoSelecionado(null);
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

  // Helper para formatar endereço completo no modal
  const formatarEndereco = (end) => {
    if (!end) return "Endereço não informado";
    return `${end.rua || ""}, ${end.numero || "S/N"} - ${end.bairro || ""}, ${end.cidade || ""}/${end.estado || ""}`;
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
          
          {/* alterações jeff: Botão de Avaliações disponível para usuários logados */}
          {user && (
            <button 
                className="btn-novo" 
                onClick={handleIrParaAvaliacoes}
                style={{ backgroundColor: '#f1c40f', border: 'none' }} // Amarelo conforme solicitado
            >
                <FaStar /> Avaliar
            </button>
          )}

          {/* --- CHECKBOX DE FILTRO --- */}
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

          {/* Botão condicional - apenas Gestores ou Parceiros podem criar novos eventos */}
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
              {/* Adicionei classes nas TH para travar a largura das colunas */}
              <tr>
                <th className="col-nome">EVENTO</th>
                <th className="col-data">DATA / HORÁRIO</th>
                <th className="col-local">LOCAL</th>
                <th className="col-acoes">
                  {isGestor ? "AÇÕES" : "DETALHES"}
                </th>{" "}
                {/*Título condicional */}
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
                    {/* Exibe a data e o horário em blocos separados */}
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
                      {/* Tratamento da visibilidade dos botões de ação */}
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

                          {/* Apenas Gestor vê o botão de excluir */}
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
                        /* Botão de visualização habilitado com onClick para o modal */
                        <button
                          className="btn-action"
                          title="Ver Detalhes"
                          style={{
                            backgroundColor: "#17a2b8",
                            color: "#fff",
                            border: "none",
                          }}
                          onClick={() => handleVerDetalhes(evento)}
                        >
                          <FaEye size={12} />
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

      {/* --- MODAL DE DETALHES  --- */}
      {modalAberto && eventoSelecionado && (
        <div className="modal-overlay">
          <div className="modal-content-custom">
            <div className="modal-header">
              <h3>{eventoSelecionado.nome}</h3>
              <button onClick={fecharModal} className="modal-close-btn">
                <FaTimes />
              </button>
            </div>

            <div className="modal-body">
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