// src/pages/pontosturistico/CadastroPontoTuristico.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// IMPORTANTE: Verifique se o caminho do import está correto baseado na sua estrutura de pastas
import { createPontoTuristico } from '../../api/pontoTuristicoService'; 

const CadastroPontoTuristico = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Estado único para capturar os dados do formulário
  const [formData, setFormData] = useState({
    nome: '',
    estado: '',
    cidade: '',
    descricao: '',
    bairro: '',
    rua: '',
    numero: '',
    horarioAbertura: '',
    horarioFechamento: '',
    nivelAcessibilidade: 1
  });

  // Atualiza o estado conforme o usuário digita
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Função que envia os dados
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Montagem do Objeto (Payload)
      // O Spring Boot espera que o endereço seja um objeto aninhado,
      // então transformamos os campos soltos (rua, bairro) em um objeto 'endereco'.
      const payload = {
        nome: formData.nome,
        descricao: formData.descricao,
        horarioAbertura: formData.horarioAbertura, // Envia "HH:mm" (String ou LocalTime no Java)
        horarioFechamento: formData.horarioFechamento,
        nivelAcessibilidade: parseInt(formData.nivelAcessibilidade), // Garante que é número
        endereco: {
          rua: formData.rua, 
          numero: formData.numero,
          bairro: formData.bairro,
          cidade: formData.cidade,
          uf: formData.estado
        }
      };

      console.log("Enviando payload:", payload); // Útil para debug no F12

      // 2. Chamada ao Service (que você forneceu)
      await createPontoTuristico(payload);

      // 3. Sucesso
      alert('Ponto turístico cadastrado com sucesso!');
      navigate('/pontos-turisticos'); // Volta para a tela de listagem

    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      // Tenta pegar a mensagem de erro do backend se existir
      const errorMsg = error.response?.data?.message || 'Erro ao realizar cadastro. Verifique os dados.';
      alert(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <h1 className="fw-bold mb-4">CADASTRAR PONTO TURÍSTICO:</h1>

      <div className="p-4 p-md-5 rounded shadow-sm" style={{ backgroundColor: '#e5e7eb' }}>
        <form onSubmit={handleSubmit}>
          
          {/* --- LINHA 1 --- */}
          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <label className="form-label fw-bold text-secondary small">NOME</label>
              <input 
                type="text" name="nome" value={formData.nome} onChange={handleChange}
                className="form-control p-3 border-0" placeholder="Ex: Mercado Municipal" required
              />
            </div>
            <div className="col-md-3">
              <label className="form-label fw-bold text-secondary small">ESTADO (UF):</label>
              <input 
                type="text" name="estado" value={formData.estado} onChange={handleChange}
                className="form-control p-3 border-0" placeholder="Ex: BA" maxLength="2" required
              />
            </div>
            <div className="col-md-3">
              <label className="form-label fw-bold text-secondary small">CIDADE:</label>
              <input 
                type="text" name="cidade" value={formData.cidade} onChange={handleChange}
                className="form-control p-3 border-0" placeholder="Ex: Irecê" required
              />
            </div>
          </div>

          {/* --- BLOCO CENTRAL --- */}
          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <label className="form-label fw-bold text-secondary small">DESCRIÇÃO</label>
              <textarea 
                name="descricao" value={formData.descricao} onChange={handleChange}
                className="form-control border-0 p-3" rows="5" placeholder="Descrição..." style={{ resize: 'none' }} required
              ></textarea>
            </div>
            <div className="col-md-6 d-flex flex-column gap-3">
              <div>
                <label className="form-label fw-bold text-secondary small">BAIRRO:</label>
                <input 
                  type="text" name="bairro" value={formData.bairro} onChange={handleChange}
                  className="form-control p-3 border-0" placeholder="Ex: Centro" required
                />
              </div>
              <div className="row g-3">
                <div className="col-8">
                  <label className="form-label fw-bold text-secondary small">RUA:</label>
                  <input 
                    type="text" name="rua" value={formData.rua} onChange={handleChange}
                    className="form-control p-3 border-0" placeholder="Ex: Av. Santos Dumont" required
                  />
                </div>
                <div className="col-4">
                  <label className="form-label fw-bold text-secondary small">Nº:</label>
                  <input 
                    type="text" name="numero" value={formData.numero} onChange={handleChange}
                    className="form-control p-3 border-0" placeholder="Ex: 123" required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* --- LINHA 3 --- */}
          <div className="row g-3 mb-5 align-items-end">
            <div className="col-md-3">
              <label className="form-label fw-bold text-secondary small">HORÁRIO ABERTURA:</label>
              <input 
                type="time" name="horarioAbertura" value={formData.horarioAbertura} onChange={handleChange}
                className="form-control p-3 border-0 text-secondary" required
              />
            </div>
            <div className="col-md-3">
              <label className="form-label fw-bold text-secondary small">HORÁRIO FECHAMENTO:</label>
              <input 
                type="time" name="horarioFechamento" value={formData.horarioFechamento} onChange={handleChange}
                className="form-control p-3 border-0 text-secondary" required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-bold text-secondary small d-block mb-2">
                ACESSIBILIDADE ({formData.nivelAcessibilidade}):
              </label>
              <input 
                type="range" name="nivelAcessibilidade" value={formData.nivelAcessibilidade} onChange={handleChange}
                className="form-range" min="0" max="5" 
              />
            </div>
          </div>

          {/* --- BOTÕES --- */}
          <div className="d-flex justify-content-center gap-3">
            <Link to="/pontos-turisticos" className="btn btn-primary rounded-pill px-5 py-2 fw-bold shadow border-0" style={{ backgroundColor: '#3b82f6', minWidth: '160px', textDecoration: 'none' }}>
              CANCELAR
            </Link>
            <button type="submit" disabled={loading} className="btn btn-primary rounded-pill px-5 py-2 fw-bold shadow border-0" style={{ backgroundColor: '#3b82f6', minWidth: '160px' }}>
              {loading ? 'SALVANDO...' : 'CADASTRAR'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CadastroPontoTuristico;