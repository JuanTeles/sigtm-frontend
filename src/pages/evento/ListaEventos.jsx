import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEventos, deleteEvento, getEventosFuturos } from '../../api/eventoService'; 
import { FaCalendarAlt, FaPen, FaTrash, FaPlus } from 'react-icons/fa'; 
import '../../css/Evento.css'; 

function ListaEventos() {
  const navigate = useNavigate();
  
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // NOVO STATE: Controla o filtro (false = todos, true = apenas futuros)
  const [mostrarFuturos, setMostrarFuturos] = useState(true);

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
        setError('Não foi possível carregar a lista de eventos.');
      } finally {
        setLoading(false);
      }
    };

    carregarEventos();
  }, [mostrarFuturos]); 

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

  // --- FUNÇÕES DE FORMATAÇÃO ---
  const formatarData = (dataString) => {
    if (!dataString) return 'Data n/d';
    const partes = dataString.split('-');
    if (partes.length === 3) {
        return `${partes[2]}/${partes[1]}/${partes[0]}`;
    }
    return dataString;
  };

  const formatarHora = (horaIso) => {
    if (!horaIso) return ''; 
    if (horaIso.includes('T')) {
        const tempo = horaIso.split('T')[1];
        return tempo.substring(0, 5); 
    }
    return horaIso;
  };

  if (loading) return <div className="page-container"><p>Carregando eventos...</p></div>;
  if (error) return <div className="page-container"><p style={{ color: 'red' }}>{error}</p></div>;

  return (
    <div className="page-container">
      <div className="header-section">
        <h1>Eventos</h1>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            {/* --- CHECKBOX DE FILTRO --- */}
            <label style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px', 
                cursor: 'pointer',
                backgroundColor: '#fff',
                padding: '8px 12px',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                fontSize: '0.9rem',
                fontWeight: '500',
                color: '#555'
            }}>
                <input 
                    type="checkbox" 
                    checked={mostrarFuturos} 
                    onChange={(e) => setMostrarFuturos(e.target.checked)} 
                    style={{ cursor: 'pointer' }}
                />
                Apenas Futuros
            </label>

            <button className="btn-novo" onClick={handleNovoEvento}>
            <FaPlus /> Novo Evento
            </button>
        </div>
      </div>

      <div className="content-card">
        {eventos.length === 0 ? (
          <p style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
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
                    <div style={{ fontWeight: '500' }}>
                        {formatarData(evento.data)}
                    </div>
                    <div style={{ fontSize: '0.85em', color: '#666', marginTop: '4px' }}>
                        {formatarHora(evento.hora)}
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