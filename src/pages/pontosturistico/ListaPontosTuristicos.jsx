// src/pages/pontosturistico/ListaPontosTuristicos.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPontosTuristicos } from '../../api/pontoTuristicoService';
import { FaMapMarkerAlt, FaPen, FaTrash, FaPlus } from 'react-icons/fa';
import '../../css/PontoTuristico.css';

function ListaPontosTuristicos() {
  const navigate = useNavigate();
  
  const [pontos, setPontos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const buscarPontos = async () => {
      try {
        setLoading(true);
        const dados = await getPontosTuristicos();
        setPontos(dados);
      } catch (err) {
        console.error("Erro ao buscar pontos:", err);
        setError(err.response?.data?.message || 'Não foi possível carregar os dados.');
      } finally {
        setLoading(false);
      }
    };

    buscarPontos();
  }, []);

  // Função para navegar para a tela de cadastro
  const handleNovoPonto = () => {
    navigate('/pontos-turisticos/novo');
  };

  // Função para navegar para a edição (exemplo de implementação)
  const handleEditarPonto = (id) => {
    navigate(`/pontos-turisticos/editar/${id}`);
  };

  if (loading) return <div className="page-container"><p>Carregando dados...</p></div>;
  if (error) return <div className="page-container"><p style={{ color: 'red' }}>Erro: {error}</p></div>;

  return (
    <div className="page-container">
      <div className="header-section">
        <h1>Pontos Turísticos</h1>
        
        <button className="btn-novo" onClick={handleNovoPonto}>
          <FaPlus /> Novo Ponto
        </button>
      </div>

      <div className="content-card">
        {pontos.length === 0 ? (
          <p style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
            Nenhum ponto turístico cadastrado.
          </p>
        ) : (
          <table className="custom-table">
            <thead>
              <tr>
                <th>NOME</th>
                <th>LOCALIZAÇÃO</th>
                <th>BAIRRO</th>
                <th>AÇÕES</th>
              </tr>
            </thead>
            <tbody>
              {pontos.map((ponto) => (
                <tr key={ponto.id}>
                  <td>
                    <div className="cell-nome">
                      <span className="icon-loc"><FaMapMarkerAlt size={16} /></span>
                      {ponto.nome}
                    </div>
                  </td>
                  <td>
                    {/* CORREÇÃO AQUI: Uso de ?. e troca de .uf por .estado */}
                    {ponto.endereco 
                      ? `${ponto.endereco.cidade} - ${ponto.endereco.estado}`
                      : 'Endereço não informado'}
                  </td>
                  <td>
                    {ponto.endereco?.bairro || '-'}
                  </td>
                  <td>
                    <div className="actions">
                      <button 
                        className="btn-action btn-edit" 
                        title="Editar"
                        onClick={() => handleEditarPonto(ponto.id)}
                      >
                        <FaPen size={12} />
                      </button>
                      <button 
                        className="btn-action btn-delete" 
                        title="Excluir"
                        // Adicione aqui sua função de deletar, ex: onClick={() => handleDelete(ponto.id)}
                      >
                        <FaTrash size={12} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default ListaPontosTuristicos;