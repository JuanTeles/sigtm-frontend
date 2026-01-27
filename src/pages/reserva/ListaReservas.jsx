import React, { useEffect, useState } from 'react';
// --- CORREÇÃO AQUI: O nome deve ser EXATAMENTE igual ao do arquivo service ---
import { listarReservas } from '../../api/reservaService'; 
import { CalendarEvent, GeoAlt, Trash, TicketDetailed, JournalBookmark } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';

const ListaReservas = () => {
  const navigate = useNavigate();
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        // --- CORREÇÃO AQUI TAMBÉM: Chamando a função com o nome certo ---
        const dados = await listarReservas(); 
        setReservas(dados);
      } catch (error) {
        console.error("Erro ao buscar reservas:", error);
        setErro('Não foi possível carregar seu histórico de reservas.');
      } finally {
        setLoading(false);
      }
    };

    fetchReservas();
  }, []);

  // O restante do código permanece idêntico...
  const getDetalhesItem = (reserva) => {
    if (reserva.evento) {
      return { 
        nome: reserva.evento.nome, 
        tipo: 'Evento', 
        icon: <CalendarEvent className="text-primary bg-light p-2 rounded-circle" size={40} /> 
      };
    } else if (reserva.pontoTuristico) {
      return { 
        nome: reserva.pontoTuristico.nome, 
        tipo: 'Ponto Turístico', 
        icon: <GeoAlt className="text-success bg-light p-2 rounded-circle" size={40} /> 
      };
    }
    return { 
      nome: 'Item desconhecido', 
      tipo: '-', 
      icon: <JournalBookmark className="text-secondary" size={40} /> 
    };
  };

  const formatarData = (dataArray) => {
    if (!dataArray) return '-';
    if (Array.isArray(dataArray)) {
        const date = new Date(dataArray[0], dataArray[1] - 1, dataArray[2]);
        return date.toLocaleDateString('pt-BR');
    }
    return new Date(dataArray).toLocaleDateString('pt-BR');
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-light font-sans">
      <div className="container py-5">
        
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold text-dark m-0">MINHAS RESERVAS</h2>
        </div>

        <div className="card border-0 shadow-sm rounded-3">
          <div className="card-body p-0">
            
            {loading ? (
              <div className="text-center p-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Carregando...</span>
                </div>
              </div>
            ) : erro ? (
              <div className="alert alert-danger m-4 rounded-3">{erro}</div>
            ) : reservas.length === 0 ? (
              <div className="text-center p-5 text-muted">
                <h4>Nenhuma reserva encontrada.</h4>
                <p>Que tal explorar novos lugares?</p>
                <button onClick={() => navigate('/fazer-reserva')} className="btn btn-outline-primary mt-2">
                  Fazer nova reserva
                </button>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="bg-light text-secondary small text-uppercase fw-bold">
                    <tr>
                      <th scope="col" className="ps-4 py-3" style={{width: '40%'}}>Item Reservado</th>
                      <th scope="col" className="py-3">Data da Visita</th>
                      <th scope="col" className="py-3">Token</th>
                      <th scope="col" className="text-end pe-4 py-3">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="border-top-0">
                    {reservas.map((reserva) => {
                      const item = getDetalhesItem(reserva);
                      return (
                        <tr key={reserva.id} style={{cursor: 'pointer'}}>
                          <td className="ps-4 py-3">
                            <div className="d-flex align-items-center">
                              <div className="me-3">
                                {item.icon}
                              </div>
                              <div>
                                <h6 className="mb-0 fw-semibold text-dark">{item.nome}</h6>
                                <small className="text-muted" style={{fontSize: '0.8rem'}}>{item.tipo}</small>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 text-dark fw-medium">
                            {formatarData(reserva.dataReserva)}
                          </td>
                          <td className="py-3">
                            <span className="badge bg-light text-primary border border-primary px-3 py-2 rounded-pill font-monospace">
                              <TicketDetailed className="me-2"/>
                              {reserva.token || 'PENDENTE'}
                            </span>
                          </td>
                          <td className="text-end pe-4 py-3">
                            <button 
                              className="btn btn-light text-danger btn-sm rounded-circle p-2 shadow-sm"
                              title="Cancelar Reserva"
                              onClick={(e) => {
                                e.stopPropagation();
                                alert('Funcionalidade de cancelamento será implementada na próxima etapa.');
                              }}
                            >
                              <Trash size={18} />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListaReservas;