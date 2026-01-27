import React, { useState, useEffect } from 'react';
// Adicionei 'JournalText' aos imports de ícones
import { ListCheck, Calendar, GeoAlt, CheckCircle, XCircle, JournalText } from 'react-bootstrap-icons';
import { salvarReserva, listarPontosParaReserva, listarEventosParaReserva } from '../api/reservaService';
import { useNavigate } from 'react-router-dom';

const TelaReservaModerna = () => {
  const navigate = useNavigate();

  // Estado para controlar APENAS o formulário (Radio Buttons)
  const [tipoReserva, setTipoReserva] = useState('PONTO'); // 'PONTO' ou 'EVENTO'
  
  // Lista carregada no Select (Dropdown)
  const [itensDisponiveis, setItensDisponiveis] = useState([]); 
  const [loading, setLoading] = useState(false);
  
  // Dados do formulário para envio
  const [formData, setFormData] = useState({
    itemId: '',
    dataReserva: ''
  });

  // Feedback visual
  const [mensagem, setMensagem] = useState({ tipo: '', texto: '' });

  // 1. Carregar a lista do Select sempre que o TIPO (Radio Button) mudar
  useEffect(() => {
    const carregarItens = async () => {
      setLoading(true);
      setItensDisponiveis([]); 
      setMensagem({ tipo: '', texto: '' });

      try {
        let dados = [];
        if (tipoReserva === 'PONTO') {
          dados = await listarPontosParaReserva(); 
        } else {
          dados = await listarEventosParaReserva();
        }
        setItensDisponiveis(dados);
      } catch (error) {
        console.error("Erro ao buscar itens", error);
        setMensagem({ tipo: 'erro', texto: 'Não foi possível carregar as opções do formulário.' });
      } finally {
        setLoading(false);
      }
    };

    carregarItens();
  }, [tipoReserva]);

  // 2. Lidar com preenchimento dos inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 3. Enviar Reserva
  const handleSubmit = async () => {
    if (!formData.itemId || !formData.dataReserva) {
      setMensagem({ tipo: 'erro', texto: 'Selecione o local e a data para continuar.' });
      return;
    }

    const payload = {
      dataReserva: formData.dataReserva,
      pontoTuristicoId: tipoReserva === 'PONTO' ? formData.itemId : null,
      eventoId: tipoReserva === 'EVENTO' ? formData.itemId : null
    };

    try {
      setLoading(true);
      const resposta = await salvarReserva(payload);
      setMensagem({ 
        tipo: 'sucesso', 
        texto: `Reserva confirmada! Seu Token: ${resposta.token}` 
      });
      setFormData({ itemId: '', dataReserva: '' }); // Limpa formulário
    } catch (error) {
      const msgErro = error.response?.data?.message || 'Erro ao realizar a reserva.';
      setMensagem({ tipo: 'erro', texto: msgErro });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-light font-sans">
      
      <div className="flex-grow-1 d-flex align-items-center justify-content-center py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-10 col-lg-8"> 
              {/* Aumentei um pouco a largura da coluna pai para caber 3 botões melhor */}
              
              <div className="card border-0 shadow-lg rounded-4 p-4 p-md-5">
                
                <h2 className="text-center text-primary fw-bold mb-4">
                  Reservas & Consultas
                </h2>

                {/* Feedback de Erro ou Sucesso */}
                {mensagem.texto && (
                  <div className={`alert ${mensagem.tipo === 'sucesso' ? 'alert-success' : 'alert-danger'} rounded-3 mb-4`} role="alert">
                    {mensagem.tipo === 'sucesso' ? <CheckCircle className="me-2"/> : <XCircle className="me-2"/>}
                    {mensagem.texto}
                  </div>
                )}

                <form>
                  {/* --- BOTÕES DE NAVEGAÇÃO (Alterado para 3 colunas) --- */}
                  <div className="row g-3 mb-4">
                    
                    {/* Botão 1: Pontos */}
                    <div className="col-md-4">
                      <button 
                        type="button" 
                        onClick={() => navigate('/pontos-turisticos')} 
                        className="btn btn-primary w-100 py-3 rounded-4 d-flex flex-column align-items-center justify-content-center shadow-sm h-100 border-0 bg-gradient"
                      >
                        <ListCheck size={24} className="mb-2" />
                        <span className="fw-bold">Pontos Turísticos</span>
                        <small className="opacity-75" style={{fontSize: '0.7rem'}}>Ver lista</small>
                      </button>
                    </div>

                    {/* Botão 2 (NOVO): Ver Reservas (CENTRO) */}
                    <div className="col-md-4">
                      <button 
                        type="button" 
                        onClick={() => navigate('/lista-reservas')} // Rota sugerida
                        className="btn btn-info w-100 py-3 rounded-4 d-flex flex-column align-items-center justify-content-center shadow-sm h-100 border-0 bg-gradient text-white"
                        style={{ backgroundColor: '#0dcaf0' }}
                      >
                        <JournalText size={24} className="mb-2" />
                        <span className="fw-bold">Minhas Reservas</span>
                        <small className="opacity-75" style={{fontSize: '0.7rem'}}>Consultar histórico</small>
                      </button>
                    </div>

                    {/* Botão 3: Eventos */}
                    <div className="col-md-4">
                      <button 
                        type="button" 
                        onClick={() => navigate('/eventos')}
                        className="btn btn-warning w-100 py-3 rounded-4 d-flex flex-column align-items-center justify-content-center shadow-sm h-100 text-dark border-0 bg-gradient"
                      >
                        <Calendar size={24} className="mb-2" />
                        <span className="fw-bold">Agenda de Eventos</span>
                        <small className="opacity-75" style={{fontSize: '0.7rem'}}>Ver lista</small>
                      </button>
                    </div>
                  </div>

                  <hr className="text-muted opacity-25 my-4" />

                  <h5 className="text-center text-muted fw-bold mb-3">Nova Reserva</h5>

                  {/* --- RADIO BUTTONS (Controlam o Formulário) --- */}
                  <div className="mb-4">
                    <label className="form-label text-muted fw-bold text-uppercase small ls-1">O que reservar?</label>
                    <div className="d-flex gap-3 bg-light p-2 rounded-3 border">
                      <div className="form-check flex-fill text-center">
                        <input 
                          className="form-check-input float-none me-2" 
                          type="radio" 
                          name="tipoReserva" 
                          id="radioTuristico" 
                          checked={tipoReserva === 'PONTO'}
                          onChange={() => setTipoReserva('PONTO')}
                        />
                        <label className="form-check-label fw-semibold text-secondary" htmlFor="radioTuristico">
                          Ponto Turístico
                        </label>
                      </div>
                      <div className="vr opacity-25"></div>
                      <div className="form-check flex-fill text-center">
                        <input 
                          className="form-check-input float-none me-2" 
                          type="radio" 
                          name="tipoReserva" 
                          id="radioEvento" 
                          checked={tipoReserva === 'EVENTO'}
                          onChange={() => setTipoReserva('EVENTO')}
                        />
                        <label className="form-check-label fw-semibold text-secondary" htmlFor="radioEvento">
                          Evento
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Select Dinâmico */}
                  <div className="mb-3">
                    <label className="form-label text-muted fw-bold text-uppercase small">
                      {tipoReserva === 'PONTO' ? 'Qual Ponto Turístico?' : 'Qual Evento?'}
                    </label>
                    <div className="input-group">
                        <span className="input-group-text bg-light border-0"><GeoAlt /></span>
                        <select 
                          name="itemId"
                          className="form-select form-select-lg rounded-end-3 bg-light border-0 shadow-sm text-secondary fw-semibold"
                          value={formData.itemId}
                          onChange={handleChange}
                          disabled={loading}
                        >
                          <option value="">Selecione uma opção...</option>
                          {itensDisponiveis.map(item => (
                            <option key={item.id} value={item.id}>
                              {item.nome}
                            </option>
                          ))}
                        </select>
                    </div>
                  </div>

                  {/* Data */}
                  <div className="mb-5">
                    <label className="form-label text-muted fw-bold text-uppercase small">Data da Visita</label>
                    <input 
                      type="date" 
                      name="dataReserva"
                      className="form-control form-control-lg rounded-3 bg-light border-0 shadow-sm text-secondary fw-semibold"
                      value={formData.dataReserva}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Ações */}
                  <div className="d-grid gap-2 d-md-flex justify-content-between align-items-center">
                    <button 
                      type="button" 
                      onClick={() => navigate('/')} 
                      className="btn btn-link text-decoration-none text-muted fw-bold px-4"
                    >
                      Cancelar
                    </button>
                    
                    <button 
                      type="button" 
                      onClick={handleSubmit}
                      disabled={loading}
                      className="btn btn-primary btn-lg rounded-pill px-5 fw-bold shadow-sm"
                    >
                      {loading ? 'Processando...' : 'Confirmar Reserva'}
                    </button>
                  </div>

                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TelaReservaModerna;