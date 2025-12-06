
import { Link } from 'react-router-dom';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Calendar, GeoAlt, ListCheck, XCircle, CheckCircle } from 'react-bootstrap-icons'; // Ícones opcionais para dar o visual moderno

const TelaReservaModerna = () => {
  return (
    <div className="d-flex flex-column min-vh-100 bg-light font-sans">


      {/* 2. Conteúdo Centralizado */}
      <div className="flex-grow-1 d-flex align-items-center justify-content-center py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-6">
              
              {/* Card Branco com Sombras e Bordas Arredondadas (Estilo Imagem 1) */}
              <div className="card border-0 shadow-lg rounded-4 p-4 p-md-5">
                
                {/* Título */}
                <h2 className="text-center text-primary fw-bold mb-4">
                  O que você deseja reservar?
                </h2>

                <form>
                  {/* Botões de Listagem: Estilizados como os botões grandes da Imagem 1 (Azul e Amarelo) */}
                  <div className="row g-3 mb-4">
                    <div className="col-sm-6">
                      <button type="button" className="btn btn-primary w-100 py-3 rounded-4 d-flex flex-column align-items-center justify-content-center shadow-sm h-100 border-0 bg-gradient">
                        <ListCheck size={24} className="mb-2" />
                        <span className="fw-bold">Listar Pontos</span>
                        <small className="opacity-75" style={{fontSize: '0.75rem'}}>Ver opções turísticas</small>
                      </button>
                    </div>
                    <div className="col-sm-6">
                      <button type="button" className="btn btn-warning w-100 py-3 rounded-4 d-flex flex-column align-items-center justify-content-center shadow-sm h-100 text-dark border-0 bg-gradient">
                        <Calendar size={24} className="mb-2" />
                        <span className="fw-bold">Listar Eventos</span>
                        <small className="opacity-75" style={{fontSize: '0.75rem'}}>Ver agenda cultural</small>
                      </button>
                    </div>
                  </div>

                  <hr className="text-muted opacity-25 my-4" />

                  {/* Radio Buttons Modernizados */}
                  <div className="mb-4">
                    <label className="form-label text-muted fw-bold text-uppercase small ls-1">Tipo de Reserva</label>
                    <div className="d-flex gap-3 bg-light p-2 rounded-3 border">
                      <div className="form-check flex-fill text-center">
                        <input className="form-check-input float-none me-2" type="radio" name="tipoReserva" id="radioTuristico" defaultChecked />
                        <label className="form-check-label fw-semibold text-secondary" htmlFor="radioTuristico">
                          Ponto Turístico
                        </label>
                      </div>
                      <div className="vr opacity-25"></div>
                      <div className="form-check flex-fill text-center">
                        <input className="form-check-input float-none me-2" type="radio" name="tipoReserva" id="radioEvento" />
                        <label className="form-check-label fw-semibold text-secondary" htmlFor="radioEvento">
                          Evento
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Select e Data */}
                  <div className="mb-3">
                    <label className="form-label text-muted fw-bold text-uppercase small">Selecione o Local</label>
                    <select className="form-select form-select-lg rounded-3 bg-light border-0 shadow-sm text-secondary fw-semibold">
                      <option selected>Escolha uma opção...</option>
                      <option value="1">Cachoeira do Ferro Doido</option>
                      <option value="2">Praça do Feijão</option>
                    </select>
                  </div>

                  <div className="mb-5">
                    <label className="form-label text-muted fw-bold text-uppercase small">Data da Reserva</label>
                    <input 
                      type="date" 
                      className="form-control form-control-lg rounded-3 bg-light border-0 shadow-sm text-secondary fw-semibold"
                    />
                  </div>

                  {/* Botões de Ação */}
                  <div className="d-grid gap-2 d-md-flex justify-content-between align-items-center">
                    <button type="button" className="btn btn-link text-decoration-none text-muted fw-bold px-4">
                      <span className="d-flex align-items-center gap-2">
                        <XCircle /> Cancelar
                      </span>
                    </button>
                    <button type="button" className="btn btn-primary btn-lg rounded-pill px-5 fw-bold shadow-sm">
                      <span className="d-flex align-items-center gap-2">
                         Reservar <CheckCircle />
                      </span>
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