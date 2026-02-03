import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  getSolicitacoes,
  getSolicitacaoById,
  createSolicitacao,
  deleteSolicitacao
} from '../api/SolicitacaoService';

const TelaListagemSolicitacoes = () => {
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [loading, setLoading] = useState(false);

  // Estados para Modais
  const [showModalRecusar, setShowModalRecusar] = useState(false);
  const [itemSelecionado, setItemSelecionado] = useState(null);

  // Ação de clique no botão "Recusar"
  const handleClickRecusar = (item) => {
    setItemSelecionado(item);
    setShowModalRecusar(true);
  };

  // Confirmação da recusa
  const handleConfirmarRecusa = () => {
    (async () => {
      try {
        await deleteSolicitacao(itemSelecionado.id);
        setSolicitacoes(prev => prev.filter(s => s.id !== itemSelecionado.id));
        setShowModalRecusar(false);
        alert('Solicitação recusada e removida.');
      } catch (err) {
        console.error(err);
        alert('Erro ao recusar solicitação. Verifique o console.');
      }
    })();
  };

  const handleAprovar = async (item) => {
    if (!window.confirm(`Aprovar solicitação de ${item.empresa || item.nomeEmpresa || 'entidade'}?`)) return;
    try {
      // Observação: o backend mostrado não possui endpoint de "aprovar" explícito.
      // Por enquanto removemos a solicitação localmente (como se tivesse sido processada)
      // e chamamos o DELETE para limpar a solicitação no servidor.
      await deleteSolicitacao(item.id);
      setSolicitacoes(prev => prev.filter(s => s.id !== item.id));
      alert('Solicitação aprovada (processamento básico).');
    } catch (err) {
      console.error(err);
      alert('Erro ao aprovar solicitação. Verifique o console.');
    }
  };

  // Carrega solicitações do backend
  const loadSolicitacoes = async () => {
    setLoading(true);
    try {
      const data = await getSolicitacoes();
      // Não filtrar no front — exibe o que o backend retornar.
      setSolicitacoes(data || []);
    } catch (err) {
      console.error(err);
      alert('Erro ao carregar solicitações.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSolicitacoes();
  }, []);

  return (
    <div className="min-vh-100 bg-light py-5 font-sans">
      <div className="container">
        
        {/* Cabeçalho da Página (Fora do Card) */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="fw-bold text-primary m-0">Solicitações de Parceria</h2>
            <p className="text-muted small m-0">Gerencie os novos pedidos de cadastro.</p>
          </div>
  
        </div>

        {/* CARD PRINCIPAL DA TABELA */}
        <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
          
          {/* Barra de Ferramentas (Busca e Filtros) */}
          <div className="card-header bg-white border-0 p-4 d-flex flex-column flex-md-row gap-3 justify-content-between align-items-center">
            
            {/* Input de Busca Moderno */}
            <div className="input-group" style={{ maxWidth: '400px' }}>
              <span className="input-group-text bg-light border-0 ps-3 rounded-start-4 text-muted">
                🔍
              </span>
              <input 
                type="text" 
                className="form-control bg-light border-0 py-2 rounded-end-4 text-secondary fw-semibold" 
                placeholder="Buscar por CNPJ ou Empresa..." 
              />
            </div>

            {/* Botão de Atualizar */}
            <button className="btn btn-light text-primary rounded-circle p-2 shadow-sm" title="Atualizar Lista">
              🔄
            </button>
          </div>

          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-light">
                <tr>
                  <th className="py-3 ps-4 text-uppercase text-muted small fw-bold border-0">Empresa / Parceiro</th>
                  <th className="py-3 text-uppercase text-muted small fw-bold border-0">CNPJ</th>
                  <th className="py-3 text-uppercase text-muted small fw-bold border-0">Contato</th>
                  <th className="py-3 text-uppercase text-muted small fw-bold border-0">Status</th>
                  <th className="py-3 text-end pe-4 text-uppercase text-muted small fw-bold border-0">Ações</th>
                </tr>
              </thead>
              <tbody>
                {solicitacoes.length === 0 && !loading ? (
                  <tr>
                    <td colSpan={5} className="text-center py-4 text-muted">Nenhuma solicitação encontrada.</td>
                  </tr>
                ) : (
                solicitacoes.map((item) => (
                  <tr key={item.id} style={{ cursor: 'pointer' }}>
                    
                    {/* Coluna Empresa/Parceiro */}
                    <td className="ps-4 py-3 border-bottom-0">
                      <div className="d-flex align-items-center">
                        <div className="bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center fw-bold me-3" style={{width: '40px', height: '40px'}}>
                          {item.empresa.charAt(0)}
                        </div>
                        <div>
                          <div className="fw-bold text-dark">{item.empresa}</div>
                          <div className="small text-muted">{item.parceiro}</div>
                        </div>
                      </div>
                    </td>

                    {/* Coluna CNPJ */}
                    <td className="text-secondary fw-semibold border-bottom-0">
                      {item.cnpj}
                    </td>

                    {/* Coluna Contato */}
                    <td className="border-bottom-0">
                        <div className="d-flex flex-column">
                        <span className="text-dark small fw-semibold">📧 {item.email || item.usuarioEmail || item.usuario?.email || '-'}</span>
                        <span className="text-muted small">📱 {item.telefone || item.usuarioTelefone || '-'}</span>
                      </div>
                    </td>

                    {/* Coluna Status */}
                    <td className="border-bottom-0">
                      <span className="badge bg-warning text-dark bg-opacity-25 border border-warning rounded-pill px-3">
                        {item.status || item.situacao || item.solicitacaoStatus || 'Pendente'}
                      </span>
                    </td>

                    {/* Coluna Ações */}
                    <td className="text-end pe-4 border-bottom-0">
                      <div className="d-flex justify-content-end gap-2">
                        <button onClick={() => handleClickRecusar(item)}
                            className="btn btn-outline-danger btn-sm rounded-3 border-0 px-2" 
                            title="Recusar"
                        >
                          ❌
                        </button>
                        <button onClick={() => handleAprovar(item)} className="btn btn-success btn-sm rounded-3 px-3 fw-bold shadow-sm" title="Aprovar">
                          ✓ Aprovar
                        </button>
                      </div>
                    </td>

                  </tr>
                ))) }
              </tbody>
            </table>
          </div>
          
          {/* Rodapé da Tabela (Paginação Simples) */}
          <div className="card-footer bg-white border-0 py-3 d-flex justify-content-between align-items-center px-4">
            <small className="text-muted fw-bold">Mostrando 3 de 3 registros</small>
            <nav>
              <ul className="pagination pagination-sm m-0">
                <li className="page-item disabled"><span className="page-link border-0 rounded-start-3">Anterior</span></li>
                <li className="page-item active"><span className="page-link border-0 bg-primary shadow-sm">1</span></li>
                <li className="page-item"><a className="page-link border-0 text-muted" href="#">2</a></li>
                <li className="page-item"><a className="page-link border-0 rounded-end-3 text-primary fw-bold" href="#">Próximo</a></li>
              </ul>
            </nav>
          </div>

        </div>
      </div>

{/* --- MODAL DE CONFIRMAÇÃO (RECUSAR) --- */}
      {showModalRecusar && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
          <div className="bg-white p-4 rounded-4 shadow-lg text-center m-3" style={{ maxWidth: '380px' }}>
            <div className="mb-3 text-warning" style={{ fontSize: '3rem' }}>🚫</div>
            <h4 className="fw-bold text-dark mb-2">Recusar Solicitação?</h4>
            <p className="text-muted mb-4">
              Deseja realmente recusar a parceria de <strong>{itemSelecionado?.empresa}</strong>?
            </p>
            <div className="d-grid gap-2 d-flex justify-content-center">
                <button onClick={() => setShowModalRecusar(false)} className="btn btn-light rounded-pill px-4 fw-bold">Cancelar</button>
                <button onClick={handleConfirmarRecusa} className="btn btn-danger rounded-pill px-4 fw-bold shadow-sm">Confirmar Recusa</button>
            </div>
          </div>
        </div>
      )}
      
    </div>




  );
};

export default TelaListagemSolicitacoes;