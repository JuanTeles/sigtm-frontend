import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEventos, deleteEvento } from '../../api/eventoService'; 
import { FaCalendarAlt, FaPen, FaTrash, FaPlus } from 'react-icons/fa';

// MUDANÇA: Importando o CSS específico de Evento para corrigir bugs visuais
import '../../css/Evento.css'; 

function ListaEventos() {
  const navigate = useNavigate();
  
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const carregarEventos = async () => {
      try {
        setLoading(true);
        const data = await getEventos();
        setEventos(data);
      } catch (err) {
        console.error("Erro ao carregar eventos:", err);
        setError('Não foi possível carregar a lista de eventos.');
      } finally {
        setLoading(false);
      }
    };

    carregarEventos();
  }, []);

  const handleNovoEvento = () => {
    navigate('/eventos/novo');
  };

  const handleEditarEvento = (id) => {
    navigate(`/eventos/editar/${id}`);
  };

  const handleDelete = async (id) => {
    const confirmacao = window.confirm("Deseja realmente excluir este evento?");
    
    if (confirmacao) {
      try {
        await deleteEvento(id);
        setEventos(listaAtual => listaAtual.filter(evento => evento.id !== id));
        alert("Evento excluído com sucesso!");
      } catch (err) {
        console.error("Erro ao excluir:", err);
        alert("Erro ao excluir o evento. Tente novamente.");
      }
    }
  };

  if (loading) return <div className="page-container"><p>Carregando eventos...</p></div>;
  if (error) return <div className="page-container"><p style={{ color: 'red' }}>{error}</p></div>;

  return (
    <div className="page-container">
      <div className="header-section">
        <h1>Eventos</h1>
        
        <button className="btn-novo" onClick={handleNovoEvento}>
          <FaPlus /> Novo Evento
        </button>
      </div>

      <div className="content-card">
        {eventos.length === 0 ? (
          <p style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
            Nenhum evento cadastrado.
          </p>
        ) : (
          <table className="custom-table">
            <thead>
              {/* Adicionei classes nas TH para travar a largura das colunas */}
              <tr>
                <th className="col-nome">EVENTO</th>
                <th className="col-data">DATA / HORÁRIO</th>
                <th className="col-local">LOCAL</th>
                <th className="col-acoes">AÇÕES</th>
              </tr>
            </thead>
            <tbody>
              {eventos.map((evento) => (
                <tr key={evento.id}>
                  <td>
                    <div className="cell-nome">
                      <span className="icon-loc"><FaCalendarAlt size={16} /></span>
                      {evento.nome}
                    </div>
                  </td>
                  <td>
                    {/* Exibe a data e o horário em blocos separados */}
                    <div style={{ fontWeight: '500' }}>{evento.data || 'Data n/d'}</div>
                    <div style={{ fontSize: '0.85em', color: '#666', marginTop: '4px' }}>
                        {evento.horario || ''}
                    </div>
                  </td>
                  <td>
                    {evento.endereco 
                      ? `${evento.endereco.cidade} - ${evento.endereco.estado}`
                      : (evento.local || 'Local não informado')}
                  </td>
                  <td>
                    <div className="actions">
                      <button 
                        className="btn-action btn-edit" 
                        title="Editar"
                        onClick={() => handleEditarEvento(evento.id)}
                      >
                        <FaPen size={12} />
                      </button>
                      
                      <button 
                        className="btn-action btn-delete" 
                        title="Excluir"
                        onClick={() => handleDelete(evento.id)}
                      >
                        <FaTrash size={12} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default ListaEventos;