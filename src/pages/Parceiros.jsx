import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getParceiros, saveParceiro, deleteParceiro, rebaixarParceiroParaUsuario } from '../api/parceiroService';

const TelaListaParceiros = () => {
  const [parceiros, setParceiros] = useState([]);

  const [showModalEditar, setShowModalEditar] = useState(false);
  const [showModalExcluir, setShowModalExcluir] = useState(false);
  const [itemSelecionado, setItemSelecionado] = useState(null);

  // 2. Estado do formulário inicializado com os campos do DTO
  const [formData, setFormData] = useState({ 
    nome: '', 
    nomeEmpresa: '', 
    cnpj: '', 
    telefone: '', 
    horarioFuncionamento: '' 
  });

  // Carrega parceiros do backend
  const loadParceiros = async () => {
    try {
      const data = await getParceiros();
      setParceiros(data || []);
    } catch (err) {
      console.error(err);
      alert('Erro ao carregar parceiros. Verifique o console.');
    }
  };

  useEffect(() => {
    loadParceiros();
  }, []);

  const handleAbrirEditar = (parceiro) => {
    setItemSelecionado(parceiro);
    // Preenche o formulário com os dados da linha selecionada
    setFormData({ 
        nome: parceiro.nome || '', 
        nomeEmpresa: parceiro.nomeEmpresa, 
        cnpj: parceiro.cnpj, 
        telefone: parceiro.telefone,
        horarioFuncionamento: parceiro.horarioFuncionamento || ''
    });
    setShowModalEditar(true);
  };

  const handleSalvarEdicao = (e) => {
    e.preventDefault();
    (async () => {
      try {
        const payload = {
          ...(itemSelecionado || {}),
          ...formData
        };
        await saveParceiro(payload);
        await loadParceiros();
        setShowModalEditar(false);
        alert('Dados atualizados com sucesso!');
      } catch (err) {
        console.error(err);
        // Exibir mensagem de erro vindo do backend se houver
        const msg = err?.response?.data?.message || err?.message || 'Erro ao salvar parceiro. Verifique o console.';
        alert(msg);
      }
    })();
  };

  const handleAbrirExcluir = (parceiro) => {
    setItemSelecionado(parceiro);
    setShowModalExcluir(true);
  };

  const handleConfirmarExclusao = () => {
    (async () => {
      try {
        // Chama endpoint de rebaixar parceiro -> transforma em usuário comum
        await rebaixarParceiroParaUsuario(itemSelecionado.id);
        await loadParceiros();
        setShowModalExcluir(false);
        alert('Parceiro rebaixado para usuário comum com sucesso.');
      } catch (err) {
        console.error('Erro ao rebaixar parceiro:', err);
        const msg = err?.response?.data?.message || 'Erro ao rebaixar parceiro. Verifique o console.';
        alert(msg);
      }
    })();
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
          <Link to="/admin/solicitacoes" className="btn btn-outline-primary rounded-pill px-4 py-2 fw-bold shadow-sm d-flex align-items-center gap-2">
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
                  <th className="py-3 ps-4 text-uppercase text-muted small fw-bold border-0">Empresa / Segmento</th>
                  <th className="py-3 text-uppercase text-muted small fw-bold border-0">Responsável / CNPJ</th>
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
                          {/* Atualizado para exibir nomeEmpresa */}
                          <div className="fw-bold text-dark">{parceiro.nomeEmpresa}</div>
                          <span className="badge bg-secondary bg-opacity-10 text-secondary rounded-pill border border-secondary border-opacity-10">{parceiro.segmento}</span>
                        </div>
                      </div>
                    </td>
                    <td className="border-bottom-0">
                        <div className="d-flex flex-column">
                            <span className="text-dark fw-semibold">{parceiro.nome}</span>
                            <span className="text-secondary small font-monospace">{parceiro.cnpj}</span>
                        </div>
                    </td>
                    <td className="border-bottom-0">
                      <div className="d-flex flex-column">
                        <span className="text-dark small fw-semibold">📞 {parceiro.telefone}</span>
                        <span className="text-muted small">🕒 {parceiro.horarioFuncionamento}</span>
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

      {/* --- MODAL EDITAR (ATUALIZADO COM NOVO DTO) --- */}
      {showModalEditar && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
          <div className="bg-white p-4 rounded-4 shadow-lg w-100 m-3 animate__animated animate__fadeInDown" style={{ maxWidth: '500px' }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="fw-bold text-primary m-0">Editar Parceiro</h4>
                <button onClick={() => setShowModalEditar(false)} className="btn-close"></button>
            </div>
            
            <form onSubmit={handleSalvarEdicao}>
                {/* 1. Nome do Responsável */}
                <div className="mb-3">
                    <label className="form-label text-muted small fw-bold">Nome do Responsável</label>
                    <input 
                        required
                        type="text" 
                        className="form-control bg-light border-0" 
                        placeholder="Quem responde pela empresa?"
                        value={formData.nome} 
                        onChange={(e) => setFormData({...formData, nome: e.target.value})} 
                    />
                </div>

                {/* 2. Nome da Empresa */}
                <div className="mb-3">
                    <label className="form-label text-muted small fw-bold">Nome da Empresa</label>
                    <input 
                        required
                        type="text" 
                        className="form-control bg-light border-0" 
                        placeholder="Nome Fantasia"
                        value={formData.nomeEmpresa} 
                        onChange={(e) => setFormData({...formData, nomeEmpresa: e.target.value})} 
                    />
                </div>

                {/* 3. CNPJ */}
                <div className="mb-3">
                    <label className="form-label text-muted small fw-bold">CNPJ</label>
                    <input 
                        required
                        type="text" 
                        className="form-control bg-light border-0" 
                        placeholder="00.000.000/0000-00"
                        value={formData.cnpj} 
                        onChange={(e) => setFormData({...formData, cnpj: e.target.value})} 
                    />
                </div>

                {/* 4. Telefone */}
                <div className="mb-3">
                    <label className="form-label text-muted small fw-bold">Telefone</label>
                    <input 
                        required
                        type="text" 
                        className="form-control bg-light border-0" 
                        placeholder="(XX) XXXXX-XXXX"
                        value={formData.telefone} 
                        onChange={(e) => setFormData({...formData, telefone: e.target.value})} 
                    />
                </div>

                {/* 5. Horário de Funcionamento */}
                <div className="mb-4">
                    <label className="form-label text-muted small fw-bold">Horário de Funcionamento</label>
                    <input 
                        required
                        type="text" 
                        className="form-control bg-light border-0" 
                        placeholder="Ex: Seg a Sex, 08h às 18h"
                        value={formData.horarioFuncionamento} 
                        onChange={(e) => setFormData({...formData, horarioFuncionamento: e.target.value})} 
                    />
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
              Você está prestes a excluir <strong>{itemSelecionado?.nomeEmpresa}</strong>. Essa ação não pode ser desfeita.
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