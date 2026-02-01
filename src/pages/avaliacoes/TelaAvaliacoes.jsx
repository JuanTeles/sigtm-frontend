import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom"; // Importado para controle de navegação
import { useAuth } from "../../contexts/authContext";
import { getPontosTuristicos } from "../../api/pontoTuristicoService";
import { getEventos } from "../../api/eventoService";
import {
  saveAvaliacao,
  updateAvaliacao,
  getMinhasAvaliacoes,
} from "../../api/avaliacaoService";
import {
  FaStar,
  FaEdit,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaTimes,
} from "react-icons/fa";
import "../../css/PontoTuristico.css";

function TelaAvaliacoes() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [abaAtiva, setAbaAtiva] = useState("pontos");
  const [itens, setItens] = useState([]);
  const [minhasAvaliacoes, setMinhasAvaliacoes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Estados do Modal de Avaliação
  const [modalAberto, setModalAberto] = useState(false);
  const [itemParaAvaliar, setItemParaAvaliar] = useState(null);
  const [estrelas, setEstrelas] = useState(0);
  const [descricao, setDescricao] = useState("");
  const [editandoId, setEditandoId] = useState(null);

  // Função envolvida em useCallback para evitar alertas de dependência e loops
  const carregarTudo = useCallback(async () => {
    // alterações jeff: Impede chamadas se não houver usuário (evita erro 401 desnecessário)
    if (!user) return;

    setLoading(true);
    try {
      // Log para confirmar o usuário logado no console do navegador
      console.log("Usuário logado:", user.nome || user.email);

      // 1. Busca as avaliações que o Jefferson já fez (O pulo do gato)
      const avs = await getMinhasAvaliacoes();
      setMinhasAvaliacoes(avs);

      // 2. Busca a lista de itens conforme a aba selecionada
      let data;
      if (abaAtiva === "pontos") {
        data = await getPontosTuristicos();
      } else {
        data = await getEventos();
      }
      setItens(data || []);
    } catch (err) {
      console.error("Erro ao carregar dados", err);
      // Se o backend retornar 401, a sessão provavelmente expirou no Java
      if (err.response?.status === 401) {
        alert("Sessão expirada. Por favor, faça login novamente.");
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  }, [abaAtiva, user, navigate]);

  useEffect(() => {
    carregarTudo();
  }, [carregarTudo]);

  const abrirModal = (item, avaliacaoExistente = null) => {
    setItemParaAvaliar(item);
    if (avaliacaoExistente) {
      setEstrelas(avaliacaoExistente.estrelas);
      setDescricao(avaliacaoExistente.descricao);
      setEditandoId(avaliacaoExistente.id);
    } else {
      setEstrelas(0);
      setDescricao("");
      setEditandoId(null);
    }
    setModalAberto(true);
  };

  const handleSalvar = async () => {
    // alterações jeff: payload validado conforme o DTO do Backend
    const payload = {
      estrelas,
      descricao,
      usuarioId: user?.id,
    };

    try {
      if (editandoId) {
        await updateAvaliacao(editandoId, payload);
      } else {
        const endpointId = itemParaAvaliar.id;
        await saveAvaliacao(endpointId, payload, abaAtiva);
      }
      alert("Avaliação salva com sucesso!");
      setModalAberto(false);
      carregarTudo(); // Recarrega para atualizar os ícones na tabela
    } catch (err) {
      console.error("Erro ao salvar:", err);
      alert("Erro ao salvar avaliação. Verifique se escolheu as estrelas.");
    }
  };

  // Função que cruza os IDs para decidir qual ícone exibir (Avaliar vs Editar)
  const obterAvaliacao = (idDoItemDaLista) => {
    return minhasAvaliacoes.find((av) => {
      if (abaAtiva === "pontos") {
        return Number(av.pontoTuristicoId) === Number(idDoItemDaLista);
      } else {
        return Number(av.eventoId) === Number(idDoItemDaLista);
      }
    });
  };

  if (loading)
    return (
      <div className="page-container">
        <p>Carregando itens para avaliação...</p>
      </div>
    );

  return (
    <div className="page-container">
      <div className="header-section">
        <div className="d-flex gap-3">
          <button
            className={`btn-novo ${abaAtiva === "pontos" ? "" : "btn-outline"}`}
            onClick={() => setAbaAtiva("pontos")}
            style={{
              backgroundColor: abaAtiva === "pontos" ? "#3b82f6" : "#ccc",
              border: "none",
            }}
          >
            PONTOS TURÍSTICOS
          </button>
          <button
            className={`btn-novo ${abaAtiva === "eventos" ? "" : "btn-outline"}`}
            onClick={() => setAbaAtiva("eventos")}
            style={{
              backgroundColor: abaAtiva === "eventos" ? "#3b82f6" : "#ccc",
              border: "none",
            }}
          >
            EVENTOS
          </button>
        </div>
      </div>

      <div className="content-card">
        <table className="custom-table">
          <thead>
            <tr>
              <th>{abaAtiva === "pontos" ? "PONTO TURÍSTICO" : "EVENTO"}</th>
              <th>LOCALIZAÇÃO</th>
              <th>SUA AVALIAÇÃO</th>
            </tr>
          </thead>
          <tbody>
            {itens.length === 0 ? (
              <tr>
                <td
                  colSpan="3"
                  style={{ textAlign: "center", padding: "20px" }}
                >
                  Nenhum item encontrado para avaliar.
                </td>
              </tr>
            ) : (
              itens.map((item) => {
                const av = obterAvaliacao(item.id);
                return (
                  <tr key={item.id}>
                    <td>
                      <div className="cell-nome">
                        {abaAtiva === "pontos" ? (
                          <FaMapMarkerAlt />
                        ) : (
                          <FaCalendarAlt />
                        )}
                        {item.nome}
                      </div>
                    </td>
                    <td>
                      {item.endereco?.cidade || "Irecê"} -{" "}
                      {item.endereco?.estado || "BA"}
                    </td>
                    <td>
                      <div className="actions">
                        {av ? (
                          <button
                            className="btn-action btn-edit"
                            title="Editar minha avaliação"
                            onClick={() => abrirModal(item, av)}
                          >
                            <FaEdit color="#f1c40f" />
                          </button>
                        ) : (
                          <button
                            className="btn-action"
                            title="Clique para avaliar"
                            onClick={() => abrirModal(item)}
                          >
                            <FaStar color="#ccc" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* --- MODAL DE AVALIAÇÃO --- */}
      {modalAberto && (
        <div className="modal-overlay">
          <div className="modal-content-custom" style={{ maxWidth: "400px" }}>
            <div className="modal-header">
              <h3>Avaliar {itemParaAvaliar.nome}</h3>
              <button
                onClick={() => setModalAberto(false)}
                className="modal-close-btn"
              >
                <FaTimes />
              </button>
            </div>
            <div className="modal-body">
              <label className="detail-label">ESTRELAS</label>
              <div className="d-flex gap-2 mb-3">
                {[1, 2, 3, 4, 5].map((num) => (
                  <FaStar
                    key={num}
                    size={30}
                    color={num <= estrelas ? "#f1c40f" : "#ddd"}
                    style={{ cursor: "pointer" }}
                    onClick={() => setEstrelas(num)}
                  />
                ))}
              </div>
              <label className="detail-label">COMENTÁRIO</label>
              <textarea
                className="form-control"
                rows="4"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Conte como foi sua visita..."
              />
            </div>
            <div className="modal-footer">
              <button className="btn-modal-close" onClick={handleSalvar}>
                SALVAR AVALIAÇÃO
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TelaAvaliacoes;
