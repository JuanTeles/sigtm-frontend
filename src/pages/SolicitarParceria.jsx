import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const SolicitarParceria = () => {
  // Estado para controlar se o modal está visível ou não
  const [exibirModal, setExibirModal] = useState(false);

  // Função disparada ao enviar o formulário
  const handleSolicitar = (e) => {
    e.preventDefault(); // Evita o recarregamento padrão da página
    setExibirModal(true); // Mostra o modal
  };

  // Função para redirecionar (aqui simulamos indo para a home '/')
  const handleVoltarInicio = () => {
    window.location.href = '/'; // Redireciona para a raiz
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light py-5 font-sans position-relative">
      
      {/* --- INÍCIO DO CONTEÚDO DA TELA --- */}
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-5">
            
            <div className="card border-0 shadow-lg rounded-4 p-4 p-md-5 bg-white">
              
              <h2 className="text-center text-primary fw-bold mb-4">
                Solicitar Parceiro
              </h2>
              
              <p className="text-center text-muted mb-4">
                Preencha os dados da sua empresa para iniciar o processo.
              </p>

              <form onSubmit={handleSolicitar}>
                {/* Campo CNPJ */}
                <div className="mb-4">
                  <label htmlFor="cnpjInput" className="form-label text-muted fw-bold text-uppercase small ps-2">
                    CNPJ:
                  </label>
                  <input
                    required
                    type="text"
                    id="cnpjInput"
                    className="form-control form-control-lg rounded-3 bg-light border-0 shadow-sm text-secondary fw-semibold p-3"
                    placeholder="00.000.000/0001-00"
                  />
                </div>

                {/* Campo Nome da Empresa */}
                <div className="mb-5">
                  <label htmlFor="nomeEmpresaInput" className="form-label text-muted fw-bold text-uppercase small ps-2">
                    Nome da Empresa:
                  </label>
                  <input
                    required
                    type="text"
                    id="nomeEmpresaInput"
                    className="form-control form-control-lg rounded-3 bg-light border-0 shadow-sm text-secondary fw-semibold p-3"
                    placeholder="Digite o nome fantasia"
                  />
                </div>

                {/* Botão de Ação */}
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary btn-lg rounded-pill fw-bold shadow py-3 fs-5">
                    Solicitar 🚀
                  </button>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>



      {/* --- MODAL (OVERLAY) --- */}
      {exibirModal && (
        <div 
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}
        >

          <div className="bg-white p-5 rounded-4 shadow-lg text-center m-3 animate__animated animate__fadeIn" style={{ maxWidth: '400px' }}>
            
            <div className="mb-3" style={{ fontSize: '4rem' }}>
              ✅
            </div>

            <h3 className="fw-bold text-dark mb-3">Sucesso!</h3>
            
            <p className="text-muted mb-4 fs-5">
              Solicitação enviada com sucesso.
            </p>

            <button 
              onClick={handleVoltarInicio}
              className="btn btn-primary btn-lg rounded-pill fw-bold w-100 shadow-sm"
            >
              Voltar ao Início
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default SolicitarParceria;