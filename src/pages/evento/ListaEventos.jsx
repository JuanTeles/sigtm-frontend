import React from 'react';
import { Link } from 'react-router-dom';
import { Edit, Trash2, Plus, Calendar } from 'lucide-react';

const ListaEventos = () => {
  // Futuramente, isso virá da sua API Java
  const eventos = [
    { id: 1, nome: "São João de Irecê 2025", data: "20/06/2025", local: "Praça Clériston Andrade", status: "Confirmado" },
    { id: 2, nome: "Desfile de Carroças", data: "06/06/2025", local: "Centro", status: "Pendente" },
    { id: 3, nome: "São Pedro da Boa Vista", data: "29/06/2025", local: "Bairro Boa Vista", status: "Confirmado" },
  ];

  return (
    <div className="container py-5">
      
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="fw-bold mb-0">EVENTOS</h1>
        <Link 
          to="/cadastro-evento" 
          className="btn text-white fw-bold rounded-pill px-4 py-2 d-flex align-items-center gap-2 shadow-sm"
          style={{ backgroundColor: '#3b82f6' }}
        >
          <Plus size={20} /> Novo Evento
        </Link>
      </div>

      <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover mb-0 align-middle">
            <thead className="bg-light">
              <tr>
                <th className="py-3 ps-4 text-secondary small text-uppercase">Evento</th>
                <th className="py-3 text-secondary small text-uppercase">Data</th>
                <th className="py-3 text-secondary small text-uppercase">Local</th>
                <th className="py-3 text-secondary small text-uppercase">Status</th>
                <th className="py-3 text-end pe-4 text-secondary small text-uppercase">Ações</th>
              </tr>
            </thead>
            <tbody>
              {eventos.map((evento) => (
                <tr key={evento.id}>
                  <td className="ps-4 py-3 fw-bold text-dark">
                    <div className="d-flex align-items-center gap-2">
                      <div className="bg-warning bg-opacity-10 text-warning p-2 rounded-circle" style={{ color: '#d97706' }}>
                        <Calendar size={18} />
                      </div>
                      {evento.nome}
                    </div>
                  </td>
                  <td className="text-secondary">{evento.data}</td>
                  <td className="text-secondary">{evento.local}</td>
                  <td>
                    <span className={`badge rounded-pill fw-normal px-3 py-2 ${evento.status === 'Confirmado' ? 'bg-success bg-opacity-10 text-success' : 'bg-warning bg-opacity-10 text-warning'}`}>
                      {evento.status}
                    </span>
                  </td>
                  <td className="text-end pe-4">
                    <div className="d-flex justify-content-end gap-2">
                      <Link 
                        to="/editar-evento" 
                        className="btn btn-sm btn-outline-primary border-0 bg-primary bg-opacity-10 text-primary rounded-circle p-2"
                      >
                        <Edit size={18} />
                      </Link>
                      <button 
                        className="btn btn-sm btn-outline-danger border-0 bg-danger bg-opacity-10 text-danger rounded-circle p-2"
                      >
                        <Trash2 size={18} />
                      </button>
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

export default ListaEventos;