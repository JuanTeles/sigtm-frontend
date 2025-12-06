import React from 'react';
import { Link } from 'react-router-dom'; // Importante para o redirecionamento
import 'bootstrap/dist/css/bootstrap.min.css';

const TelaListaParceiros = () => {
  // Dados simulados de Parceiros já aprovados
  const parceiros = [
    {
      id: 1,
      razaoSocial: "Restaurante Sabor do Sertão Ltda",
      cnpj: "12.345.678/0001-90",
      segmento: "Gastronomia",
      email: "contato@sabordosertao.com",
      telefone: "(74) 99988-1234",
      status: "Ativo"
    },
    {
      id: 2,
      razaoSocial: "Hotel Irecê Palace",
      cnpj: "98.765.432/0001-10",
      segmento: "Hospedagem",
      email: "reservas@irecepalace.com.br",
      telefone: "(74) 3641-5555",
      status: "Ativo"
    },
    {
      id: 3,
      razaoSocial: "Agência de Turismo Sol e Terra",
      cnpj: "45.123.789/0001-55",
      segmento: "Turismo",
      email: "guias@soleterra.com",
      telefone: "(74) 98877-0000",
      status: "Bloqueado" // Exemplo de status diferente
    }
  ];

  return (
    <div className="min-vh-100 bg-light py-5 font-sans">
      <div className="container">
        
        {/* CABEÇALHO: Título + Botão de Redirecionamento para Solicitações */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4 gap-3">
          <div>
            <h2 className="fw-bold text-primary m-0">Parceiros Cadastrados</h2>
            <p className="text-muted small m-0">Gerencie as empresas parceiras do sistema.</p>
          </div>

          {/* O BOTÃO QUE VOCÊ PEDIU: Redireciona para a tela de solicitações */}
          <Link to="/TelaListagemSolicitacoes" className="btn btn-outline-primary rounded-pill px-4 py-2 fw-bold shadow-sm d-flex align-items-center gap-2">
            <span>📋</span> Ver Solicitações Pendentes
          </Link>
        </div>

        {/* CARD PRINCIPAL */}
        <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
          
          {/* BARRA DE FERRAMENTAS (Busca + Atualizar) */}
          <div className="card-header bg-white border-0 p-4 d-flex flex-column flex-md-row gap-3 justify-content-between align-items-center">
            
            {/* Input de Busca */}
            <div className="input-group" style={{ maxWidth: '400px' }}>
              <span className="input-group-text bg-light border-0 ps-3 rounded-start-4 text-muted">
                🔍
              </span>
              <input 
                type="text" 
                className="form-control bg-light border-0 py-2 rounded-end-4 text-secondary fw-semibold" 
                placeholder="Buscar parceiro, CNPJ..." 
              />
            </div>

            {/* Botão Atualizar */}
            <button className="btn btn-light text-primary rounded-circle p-2 shadow-sm transition-all" title="Atualizar Lista">
              🔄
            </button>
          </div>

          {/* TABELA DE PARCEIROS */}
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-light">
                <tr>
                  <th className="py-3 ps-4 text-uppercase text-muted small fw-bold border-0">Razão Social / Segmento</th>
                  <th className="py-3 text-uppercase text-muted small fw-bold border-0">CNPJ</th>
                  <th className="py-3 text-uppercase text-muted small fw-bold border-0">Contato</th>
                  <th className="py-3 text-center text-uppercase text-muted small fw-bold border-0">Status</th>
                  <th className="py-3 text-end pe-4 text-uppercase text-muted small fw-bold border-0">Gerenciar</th>
                </tr>
              </thead>
              <tbody>
                {parceiros.map((parceiro) => (
                  <tr key={parceiro.id}>
                    
                    {/* Coluna Razão Social e Segmento */}
                    <td className="ps-4 py-3 border-bottom-0">
                      <div className="d-flex align-items-center">
                        {/* Avatar/Ícone da empresa */}
                        <div className="bg-primary bg-opacity-10 text-primary rounded-3 d-flex align-items-center justify-content-center fw-bold me-3 fs-5" style={{width: '45px', height: '45px'}}>
                          🏢
                        </div>
                        <div>
                          <div className="fw-bold text-dark">{parceiro.razaoSocial}</div>
                          <span className="badge bg-secondary bg-opacity-10 text-secondary rounded-pill border border-secondary border-opacity-10">
                            {parceiro.segmento}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Coluna CNPJ */}
                    <td className="text-secondary fw-semibold border-bottom-0 font-monospace">
                      {parceiro.cnpj}
                    </td>

                    {/* Coluna Contato */}
                    <td className="border-bottom-0">
                      <div className="d-flex flex-column">
                        <span className="text-dark small fw-semibold">📧 {parceiro.email}</span>
                        <span className="text-muted small">📱 {parceiro.telefone}</span>
                      </div>
                    </td>

                    {/* Coluna Status */}
                    <td className="text-center border-bottom-0">
                      {parceiro.status === 'Ativo' ? (
                        <span className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25 rounded-pill px-3">
                          ● Ativo
                        </span>
                      ) : (
                        <span className="badge bg-danger bg-opacity-10 text-danger border border-danger border-opacity-25 rounded-pill px-3">
                          ● Bloqueado
                        </span>
                      )}
                    </td>

                    {/* Coluna Ações (Editar e Excluir) */}
                    <td className="text-end pe-4 border-bottom-0">
                      <div className="d-flex justify-content-end gap-2">
                        <button className="btn btn-sm btn-outline-primary border-0 rounded-circle p-2" title="Editar Parceiro">
                          ✏️
                        </button>
                        <button className="btn btn-sm btn-outline-danger border-0 rounded-circle p-2" title="Excluir Parceiro">
                          🗑️
                        </button>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Rodapé da Tabela */}
          <div className="card-footer bg-white border-0 py-3 px-4">
            <div className="d-flex justify-content-end">
                <small className="text-muted">Total de parceiros: {parceiros.length}</small>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TelaListaParceiros;