import React from 'react';
import { Link } from 'react-router-dom';
import { Edit, Trash2, Plus, MapPin } from 'lucide-react';

const ListaPontosTuristicos = () => {
  // --- SIMULAÇÃO DE PERMISSÃO ---
  // Futuramente, você pegará isso do seu AuthContext ou localStorage
  // Tente mudar para 'user' para ver os botões sumirem!
  const userRole = 'admin'; 
  const isAdmin = userRole === 'admin';

  // Futuramente, isso virá da sua API Java (ex: axios.get('/api/pontos'))
  const pontos = [
    { id: 1, nome: "Praça do Feijão", cidade: "Irecê", estado: "BA", bairro: "Centro" },
    { id: 2, nome: "Mercadão Municipal", cidade: "Irecê", estado: "BA", bairro: "Centro" },
    { id: 3, nome: "Cachoeira do Ferro Doido", cidade: "Morro do Chapéu", estado: "BA", bairro: "Zona Rural" },
  ];

  return (
    <div className="container py-5">
      
      {/* Cabeçalho da Lista */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="fw-bold mb-0">PONTOS TURÍSTICOS</h1>
        
        {/* Renderização Condicional: Só mostra o botão se for ADMIN */}
        {isAdmin && (
          <Link 
            to="/cadastro-ponto" 
            className="btn text-white fw-bold rounded-pill px-4 py-2 d-flex align-items-center gap-2 shadow-sm"
            style={{ backgroundColor: '#3b82f6' }}
          >
            <Plus size={20} /> Novo Ponto
          </Link>
        )}
      </div>

      {/* Tabela de Listagem */}
      <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover mb-0 align-middle">
            <thead className="bg-light">
              <tr>
                <th className="py-3 ps-4 text-secondary small text-uppercase">Nome</th>
                <th className="py-3 text-secondary small text-uppercase">Localização</th>
                <th className="py-3 text-secondary small text-uppercase">Bairro</th>
                <th className="py-3 text-end pe-4 text-secondary small text-uppercase">Ações</th>
              </tr>
            </thead>
            <tbody>
              {pontos.map((ponto) => (
                <tr key={ponto.id}>
                  <td className="ps-4 py-3 fw-bold text-dark">
                    <div className="d-flex align-items-center gap-2">
                      <div className="bg-blue-100 text-blue-600 p-2 rounded-circle bg-opacity-10" style={{ backgroundColor: '#eff6ff', color: '#3b82f6' }}>
                        <MapPin size={18} />
                      </div>
                      {ponto.nome}
                    </div>
                  </td>
                  <td className="text-secondary">{ponto.cidade} - {ponto.estado}</td>
                  <td className="text-secondary">{ponto.bairro}</td>
                  <td className="text-end pe-4">
                    <div className="d-flex justify-content-end gap-2">
                      
                      {/* Renderização Condicional das Ações */}
                      {isAdmin ? (
                        <>
                          {/* Botão Editar */}
                          <Link 
                            to="/editar-ponto" 
                            className="btn btn-sm btn-outline-primary border-0 bg-primary bg-opacity-10 text-primary rounded-circle p-2"
                            title="Editar"
                          >
                            <Edit size={18} />
                          </Link>
                          {/* Botão Excluir (Visual) */}
                          <button 
                            className="btn btn-sm btn-outline-danger border-0 bg-danger bg-opacity-10 text-danger rounded-circle p-2"
                            title="Excluir"
                          >
                            <Trash2 size={18} />
                          </button>
                        </>
                      ) : (
                        <span className="text-muted small fst-italic">Somente leitura</span>
                      )}

                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListaPontosTuristicos;