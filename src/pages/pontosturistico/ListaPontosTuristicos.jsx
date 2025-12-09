// src/pages/pontosturistico/ListaPontosTuristicos.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // <--- 1. Importe isso
import { getPontosTuristicos } from '../../api/pontoTuristicoService';
import { FaMapMarkerAlt, FaPen, FaTrash, FaPlus } from 'react-icons/fa';
import '../../css/PontoTuristico.css';

function ListaPontosTuristicos() {
  const navigate = useNavigate(); // <--- 2. Inicialize o hook de navegação
  
  const [pontos, setPontos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // ... (mesmo código do useEffect anterior) ...
    const buscarPontos = async () => {
      try {
        const dados = await getPontosTuristicos();
        setPontos(dados);
      } catch (err) {
        setError(err.response?.data?.message || 'Não foi possível carregar os dados.');
      } finally {
        setLoading(false);
      }
    };
    buscarPontos();
  }, []);

  // Função para navegar para a tela de cadastro
  const handleNovoPonto = () => {
    navigate('/pontos-turisticos/novo'); // <--- 3. Defina a rota de destino aqui
  };

  if (loading) return <div className="page-container"><p>Carregando...</p></div>;
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
        <table className="custom-table">
           {/* ... (Restante da tabela igual ao anterior) ... */}
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
                <td>{ponto.endereco.cidade}-{ponto.endereco.uf}</td>
                <td>{ponto.endereco.bairro || 'Centro'}</td>
                <td>
                  <div className="actions">
                    <button className="btn-action btn-edit"><FaPen size={12} /></button>
                    <button className="btn-action btn-delete"><FaTrash size={12} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListaPontosTuristicos;