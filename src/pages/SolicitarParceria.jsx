import React, { useState, useEffect } from 'react'; // Adicione useEffect
import 'bootstrap/dist/css/bootstrap.min.css';
import { createSolicitacao } from '../api/SolicitacaoService';
// IMPORTANTE: Importe o authService para pegar o usuário real
import { getCurrentUser } from '../api/authService'; 

const SolicitarParceria = () => {

  const [exibirModal, setExibirModal] = useState(false);
  const [cnpj, setCnpj] = useState('');
  const [nomeEmpresa, setNomeEmpresa] = useState('');
  const [horarioFuncionamento, setHorarioFuncionamento] = useState(''); // novo campo
  const [usuarioId, setUsuarioId] = useState(null); // Estado para o ID
  const [loading, setLoading] = useState(false);

  // Pega o ID assim que a tela abre
  useEffect(() => {
    const user = getCurrentUser();
    if (user && user.id) {
        setUsuarioId(user.id);
    } else {
        alert("Você precisa estar logado para solicitar parceria.");
        window.location.href = '/login';
    }
  }, []);

  const handleSolicitar = async (e) => {
    e.preventDefault(); 
    setLoading(true); 

    if (!usuarioId) {
        alert("Erro: Usuário não identificado.");
        setLoading(false);
        return;
    }
    
    const dadosParaEnvio = {
      cnpj: cnpj,
        nomeEmpresa: nomeEmpresa, 
      usuarioId: usuarioId, // Usa o ID dinâmico
      horarioFuncionamento: horarioFuncionamento || null
    };

    try {
        await createSolicitacao(dadosParaEnvio);
        setExibirModal(true);
        setCnpj('');
        setNomeEmpresa('');
    } catch (error) {
        console.error("Erro ao solicitar:", error);
        // Mensagem de erro mais amigável
        const msg = error.response?.data?.message || "Erro ao enviar solicitação.";
        alert(msg);
    } finally {
        setLoading(false); 
    }
  };

  const handleVoltarInicio = () => {
    window.location.href = '/'; 
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light py-5 font-sans position-relative">
      
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
                    // Two-way binding
                    value={cnpj} 
                    onChange={(e) => setCnpj(e.target.value)}
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
                    // Two-way binding
                    value={nomeEmpresa}
                    onChange={(e) => setNomeEmpresa(e.target.value)}
                  />
                </div>

                  {/* Campo Horário de Funcionamento (texto, ex: '18 as 20') */}
                  <div className="mb-4">
                    <label htmlFor="horarioInput" className="form-label text-muted fw-bold text-uppercase small ps-2">Horário de Funcionamento</label>
                    <input
                      required
                      type="text"
                      id="horarioInput"
                      placeholder="Ex: 18 as 20"
                      className="form-control form-control-lg rounded-3 bg-light border-0 shadow-sm text-secondary fw-semibold p-3"
                      value={horarioFuncionamento}
                      onChange={(e) => setHorarioFuncionamento(e.target.value)}
                    />
                  </div>

                {/* Botão de Ação */}
                <div className="d-grid">
                  <button 
                    type="submit" 
                    className="btn btn-primary btn-lg rounded-pill fw-bold shadow py-3 fs-5"
                    disabled={loading} // Desabilita enquanto carrega
                  >
                    {loading ? (
                        <span><span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>Enviando...</span>
                    ) : 'Solicitar 🚀'}
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