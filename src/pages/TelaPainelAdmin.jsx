import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const TelaPainelAdmin = () => {
  
  // Lista de funcionalidades do painel
  // Ajuste os caminhos (to) conforme as rotas que você já tem no App.js
  const menuItens = [
    {
      titulo: "Solicitações",
      descricao: "Gerenciar pedidos de parceria pendentes.",
      icone: "📋",
      rota: "/TelaListagemSolicitacoes", 
      cor: "primary"
    },
    {
      titulo: "Pontos Turísticos",
      descricao: "Listar, editar ou remover locais turísticos.",
      icone: "🗺️", 
      rota: "/pontos-turisticos", // Rota existente no seu App.js
      cor: "success"
    },
    {
      titulo: "Eventos",
      descricao: "Gerenciar calendário de eventos da cidade.",
      icone: "📅",
      rota: "/eventos", 
      cor: "warning"
    },
    {
      titulo: "Promoções",
      descricao: "Visualizar campanhas e ofertas ativas.",
      icone: "🏷️",
      rota: "/cadastro-promocao", // Ajuste conforme sua rota de listagem
      cor: "danger"
    },
    {
      titulo: "Usuários",
      descricao: "Administrar contas de usuários cadastrados.",
      icone: "👥",
      rota: "/usuarios", // Rota futura/exemplo
      cor: "info"
    },
    {
      titulo: "Parceiros",
      descricao: "Ver lista de empresas parceiras aceitas.",
      icone: "🤝",
      rota: "/parceiros",
      cor: "secondary"
    }
  ];

  return (
    <div className="min-vh-100 bg-light py-5 font-sans">
      <div className="container">
        

        <div className="text-center mb-5">
          <span className="badge bg-warning text-dark rounded-pill px-3 py-2 mb-3 fw-bold shadow-sm">
            ÁREA RESTRITA
          </span>
          <h2 className="fw-bold text-primary display-6">Painel do Administrador</h2>
          <p className="text-muted">Selecione uma opção abaixo para gerenciar o sistema.</p>
        </div>


        <div className="row g-4">
          {menuItens.map((item, index) => (
            <div key={index} className="col-12 col-md-6 col-lg-4">
              
    
              <Link to={item.rota} className="text-decoration-none">
                <div 
                  className="card h-100 border-0 shadow-sm rounded-4 p-4 hover-card transition-all"
                  style={{ transition: 'transform 0.2s, box-shadow 0.2s' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 .5rem 1rem rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 .125rem .25rem rgba(0,0,0,0.075)';
                  }}
                >
                  <div className="d-flex align-items-center mb-3">
                   
                    <div className={`bg-${item.cor} bg-opacity-10 text-${item.cor} rounded-circle d-flex align-items-center justify-content-center p-3 fs-3 me-3`} style={{ width: '60px', height: '60px' }}>
                      {item.icone}
                    </div>
                    <h5 className="fw-bold text-dark m-0">{item.titulo}</h5>
                  </div>
                  
                  <p className="text-muted small mb-0 ps-1">
                    {item.descricao}
                  </p>
                  
                  <div className="text-end mt-3">
                    <span className={`text-${item.cor} fw-bold small`}>ACESSAR &rarr;</span>
                  </div>
                </div>
              </Link>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default TelaPainelAdmin;