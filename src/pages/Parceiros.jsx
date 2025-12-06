import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const TelaListaParceiros = () => {
  // Dados simulados
  const [parceiros, setParceiros] = useState([
    { id: 1, razaoSocial: "Restaurante Sabor do Sertão Ltda", cnpj: "12.345.678/0001-90", segmento: "Gastronomia", email: "contato@sabordosertao.com", telefone: "(74) 99988-1234", status: "Ativo" },
    { id: 2, razaoSocial: "Hotel Irecê Palace", cnpj: "98.765.432/0001-10", segmento: "Hospedagem", email: "reservas@irecepalace.com.br", telefone: "(74) 3641-5555", status: "Ativo" },
    { id: 3, razaoSocial: "Agência de Turismo Sol e Terra", cnpj: "45.123.789/0001-55", segmento: "Turismo", email: "guias@soleterra.com", telefone: "(74) 98877-0000", status: "Bloqueado" }
  ]);

  // Controle dos Modais
  const [showModalEditar, setShowModalEditar] = useState(false);
  const [showModalExcluir, setShowModalExcluir] = useState(false);
  
  // Item sendo manipulado
  const [itemSelecionado, setItemSelecionado] = useState(null);
  
  // Dados do formulário de edição
  const [formData, setFormData] = useState({ razaoSocial: '', email: '', telefone: '' });

  // --- HANDLERS (AÇÕES) ---

  const handleAbrirEditar = (parceiro) => {
    setItemSelecionado(parceiro);
    setFormData({ 
        razaoSocial: parceiro.razaoSocial, 
        email: parceiro.email, 
        telefone: parceiro.telefone 
    });
    setShowModalEditar(true);
  };

  const handleSalvarEdicao = (e) => {
    e.preventDefault();
    setParceiros(parceiros.map(p => p.id === itemSelecionado.id ? { ...p, ...formData } : p));
    setShowModalEditar(false);
    alert("Dados atualizados com sucesso!");
  };

  const handleAbrirExcluir = (parceiro) => {
    setItemSelecionado(parceiro);
    setShowModalExcluir(true);
  };

  const handleConfirmarExclusao = () => {
    setParceiros(parceiros.filter(p => p.id !== itemSelecionado.id));
    setShowModalExcluir(false);
  };

  return (
    <div className="min-vh-100 bg-light py-5 font-sans position-relative">
      <div className="container">
        
        {/* Cabeçalho */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4 gap-3">
          <div>
            <h2 className="fw-bold text-primary m-0">Parceiros Cadastrados</h2>
            <p className="text-muted small m-0">Gerencie as empresas parceiras do sistema.</p>
          </div>
          <Link to="/TelaListagemSolicitacoes" className="btn btn-outline-primary rounded-pill px-4 py-2 fw-bold shadow-sm d-flex align-items-center gap-2">
            <span>📋</span> Ver Solicitações Pendentes
          </Link>
        </div>

        {/* Card Principal */}
        <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
          
          {/* Barra de Ferramentas */}
          <div className="card-header bg-white border-0 p-4 d-flex flex-column flex-md-row gap-3 justify-content-between align-items-center">
            <div className="input-group" style={{ maxWidth: '400px' }}>
              <span className="input-group-text bg-light border-0 ps-3 rounded-start-4 text-muted">🔍</span>
              <input type="text" className="form-control bg-light border-0 py-2 rounded-end-4 text-secondary fw-semibold" placeholder="Buscar parceiro, CNPJ..." />
            </div>
            <button className="btn btn-light text-primary rounded-circle p-2 shadow-sm transition-all" title="Atualizar Lista">🔄</button>
          </div>

          {/* Tabela */}
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
                    <td className="ps-4 py-3 border-bottom-0">
                      <div className="d-flex align-items-center">
                        <div className="bg-primary bg-opacity-10 text-primary rounded-3 d-flex align-items-center justify-content-center fw-bold me-3 fs-5" style={{width: '45px', height: '45px'}}>🏢</div>
                        <div>
                          <div className="fw-bold text-dark">{parceiro.razaoSocial}</div>
                          <span className="badge bg-secondary bg-opacity-10 text-secondary rounded-pill border border-secondary border-opacity-10">{parceiro.segmento}</span>
                        </div>
                      </div>
                    </td>
                    <td className="text-secondary fw-semibold border-bottom-0 font-monospace">{parceiro.cnpj}</td>
                    <td className="border-bottom-0">
                      <div className="d-flex flex-column">
                        <span className="text-dark small fw-semibold">📧 {parceiro.email}</span>
                        <span className="text-muted small">📱 {parceiro.telefone}</span>
                      </div>
                    </td>
                    <td className="text-center border-bottom-0">
                      {parceiro.status === 'Ativo' ? (
                        <span className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25 rounded-pill px-3">● Ativo</span>
                      ) : (
                        <span className="badge bg-danger bg-opacity-10 text-danger border border-danger border-opacity-25 rounded-pill px-3">● Bloqueado</span>
                      )}
                    </td>
                    <td className="text-end pe-4 border-bottom-0">
                      <div className="d-flex justify-content-end gap-2">
                  
                        <button onClick={() => handleAbrirEditar(parceiro)} className="btn btn-sm btn-outline-primary border-0 rounded-circle p-2" title="Editar">✏️</button>
                      
                        <button onClick={() => handleAbrirExcluir(parceiro)} className="btn btn-sm btn-outline-danger border-0 rounded-circle p-2" title="Excluir">🗑️</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          

          <div className="card-footer bg-white border-0 py-3 px-4 d-flex justify-content-between align-items-center">
            <small className="text-muted">Total de parceiros: {parceiros.length}</small>
            <nav>
              <ul className="pagination pagination-sm m-0">
                <li className="page-item disabled"><button className="page-link border-0 rounded-start-3">Anterior</button></li>
                <li className="page-item active"><button className="page-link border-0 bg-primary shadow-sm">1</button></li>
                <li className="page-item"><button className="page-link border-0 text-muted">2</button></li>
                <li className="page-item"><button className="page-link border-0 rounded-end-3 text-primary fw-bold">Próximo</button></li>
              </ul>
            </nav>
          </div>

        </div>
      </div>

      {/* --- MODAL EDITAR --- */}
      {showModalEditar && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
          <div className="bg-white p-4 rounded-4 shadow-lg w-100 m-3 animate__animated animate__fadeInDown" style={{ maxWidth: '500px' }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="fw-bold text-primary m-0">Editar Parceiro</h4>
                <button onClick={() => setShowModalEditar(false)} className="btn-close"></button>
            </div>
            <form onSubmit={handleSalvarEdicao}>
                <div className="mb-3">
                    <label className="form-label text-muted small fw-bold">Razão Social</label>
                    <input type="text" className="form-control bg-light border-0" value={formData.razaoSocial} onChange={(e) => setFormData({...formData, razaoSocial: e.target.value})} />
                </div>
                <div className="mb-3">
                    <label className="form-label text-muted small fw-bold">Email</label>
                    <input type="email" className="form-control bg-light border-0" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                </div>
                <div className="mb-4">
                    <label className="form-label text-muted small fw-bold">Telefone</label>
                    <input type="text" className="form-control bg-light border-0" value={formData.telefone} onChange={(e) => setFormData({...formData, telefone: e.target.value})} />
                </div>
                <div className="d-flex justify-content-end gap-2">
                    <button type="button" onClick={() => setShowModalEditar(false)} className="btn btn-light rounded-pill px-4">Cancelar</button>
                    <button type="submit" className="btn btn-primary rounded-pill px-4 fw-bold">Salvar Alterações</button>
                </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL EXCLUIR --- */}
      {showModalExcluir && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1060 }}>
          <div className="bg-white p-4 rounded-4 shadow-lg text-center m-3 animate__animated animate__zoomIn" style={{ maxWidth: '350px' }}>
            <div className="mb-3 text-danger" style={{ fontSize: '3rem' }}>⚠️</div>
            <h4 className="fw-bold text-dark mb-2">Tem certeza?</h4>
            <p className="text-muted mb-4">
              Você está prestes a excluir <strong>{itemSelecionado?.razaoSocial}</strong>. Essa ação não pode ser desfeita.
            </p>
            <div className="d-flex justify-content-center gap-2">
                <button onClick={() => setShowModalExcluir(false)} className="btn btn-light rounded-pill px-4 fw-bold">Cancelar</button>
                <button onClick={handleConfirmarExclusao} className="btn btn-danger rounded-pill px-4 fw-bold shadow-sm">Sim, Excluir</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default TelaListaParceiros;