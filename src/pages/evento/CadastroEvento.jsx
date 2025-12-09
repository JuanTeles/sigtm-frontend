import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createEvento } from '../../api/eventoService'; // Importe o serviço criado

const CadastroEvento = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Estado único para todos os campos do formulário
  const [formData, setFormData] = useState({
    // Dados do Evento
    nome: '',
    descricao: '',
    dataEvento: '',     // input type="date"
    horarioEvento: '',  // input type="time"
    nivelAcessibilidade: 1,
    publicoAlvo: '',
    programacao: '',
    categoria: '',
    
    // Dados do Endereço (Flattened/Planos aqui para facilitar)
    estado: '',
    cidade: '',
    bairro: '',
    rua: '',
    numero: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // --- MONTAGEM DO DTO (O PULO DO GATO) ---
      // O Java espera LocalDateTime no campo 'hora'. Precisamos juntar Data + Hora.
      // Ex: "2023-12-25" + "T" + "20:00" = "2023-12-25T20:00"
      const dataHoraFormatada = `${formData.dataEvento}T${formData.horarioEvento}`;

      const payload = {
        // 1. Campos diretos do Evento
        nome: formData.nome,
        descricao: formData.descricao,
        nivelAcessibilidade: parseInt(formData.nivelAcessibilidade), // Garantir que é Int
        data: formData.dataEvento, // LocalDate (YYYY-MM-DD)
        hora: dataHoraFormatada,   // LocalDateTime (YYYY-MM-DDTHH:mm)
        publicoAlvo: formData.publicoAlvo,
        programacao: formData.programacao,
        categoria: formData.categoria,

        // 2. Objeto ANINHADO (EnderecoCadastroDTO)
        // Aqui criamos a "caixinha" que o Java espera dentro do EventoDTO
        endereco: {
          estado: formData.estado,
          cidade: formData.cidade,
          bairro: formData.bairro,
          rua: formData.rua,
          numero: formData.numero
        }
      };
      
      console.log("Enviando Payload:", payload); // Para debug

      await createEvento(payload);

      alert('Evento cadastrado com sucesso!');
      navigate('/paineladm'); // Redireciona após sucesso

    } catch (error) {
      const msg = error.response?.data?.message || 'Erro ao cadastrar evento. Verifique os dados.';
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <h1 className="fw-bold mb-4">CADASTRAR EVENTO:</h1>

      <div className="p-4 p-md-5 rounded shadow-sm" style={{ backgroundColor: '#e5e7eb' }}>
        <form onSubmit={handleSubmit}>
          
          {/* --- LINHA 1: Cabeçalho --- */}
          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <label className="form-label fw-bold text-secondary small">NOME</label>
              <input 
                type="text" name="nome" 
                className="form-control p-3 border-0" 
                placeholder="Ex: Show de Rock" 
                value={formData.nome} onChange={handleChange} required
              />
            </div>
            <div className="col-md-3">
              <label className="form-label fw-bold text-secondary small">ESTADO (Sigla)</label>
              <input 
                type="text" name="estado" maxLength="2"
                className="form-control p-3 border-0" 
                placeholder="BA" 
                value={formData.estado} onChange={handleChange} required
              />
            </div>
            <div className="col-md-3">
              <label className="form-label fw-bold text-secondary small">CIDADE:</label>
              <input 
                type="text" name="cidade"
                className="form-control p-3 border-0" 
                placeholder="Irecê" 
                value={formData.cidade} onChange={handleChange} required
              />
            </div>
          </div>

          {/* --- CORPO DIVIDIDO --- */}
          <div className="row g-4 mb-4">
            
            {/* COLUNA ESQUERDA */}
            <div className="col-md-6 d-flex flex-column gap-3">
              <div className="flex-grow-1">
                <label className="form-label fw-bold text-secondary small">DESCRIÇÃO</label>
                <textarea 
                  name="descricao"
                  className="form-control border-0 p-3 h-100" 
                  style={{ minHeight: '120px', resize: 'none' }}
                  placeholder="Detalhes do evento..."
                  value={formData.descricao} onChange={handleChange} required
                ></textarea>
              </div>

              <div className="row g-3">
                <div className="col-6">
                  <label className="form-label fw-bold text-secondary small">DATA:</label>
                  <input 
                    type="date" name="dataEvento"
                    className="form-control p-3 border-0 text-secondary" 
                    value={formData.dataEvento} onChange={handleChange} required
                  />
                </div>
                <div className="col-6">
                  <label className="form-label fw-bold text-secondary small">HORÁRIO:</label>
                  <input 
                    type="time" name="horarioEvento"
                    className="form-control p-3 border-0 text-secondary" 
                    value={formData.horarioEvento} onChange={handleChange} required
                  />
                </div>
              </div>

              <div>
                <label className="form-label fw-bold text-secondary small d-block mb-2">
                    NIVEL DE ACESSIBILIDADE ({formData.nivelAcessibilidade}):
                </label>
                <input 
                    type="range" name="nivelAcessibilidade"
                    className="form-range" min="1" max="5" 
                    value={formData.nivelAcessibilidade} onChange={handleChange}
                />
                <div className="d-flex justify-content-between text-secondary small px-1">
                  <span>Baixo (1)</span>
                  <span>Médio (3)</span>
                  <span>Alto (5)</span>
                </div>
              </div>
            </div>

            {/* COLUNA DIREITA */}
            <div className="col-md-6 d-flex flex-column gap-3">
              <div>
                <label className="form-label fw-bold text-secondary small">BAIRRO:</label>
                <input 
                    type="text" name="bairro"
                    className="form-control p-3 border-0 mb-3" 
                    placeholder="Centro"
                    value={formData.bairro} onChange={handleChange} required
                />
                
                <div className="row g-3">
                  <div className="col-8">
                    <label className="form-label fw-bold text-secondary small">RUA:</label>
                    <input 
                        type="text" name="rua"
                        className="form-control p-3 border-0" 
                        placeholder="Rua das Flores"
                        value={formData.rua} onChange={handleChange} required
                    />
                  </div>
                  <div className="col-4">
                    <label className="form-label fw-bold text-secondary small">Nº:</label>
                    <input 
                        type="text" name="numero"
                        className="form-control p-3 border-0" 
                        placeholder="100"
                        value={formData.numero} onChange={handleChange} required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="form-label fw-bold text-secondary small">PROGRAMAÇÃO:</label>
                <input 
                    type="text" name="programacao"
                    className="form-control p-3 border-0" 
                    placeholder="Banda A, Palestra B..."
                    value={formData.programacao} onChange={handleChange} required
                />
              </div>

              <div className="row g-3">
                <div className="col-6">
                  <label className="form-label fw-bold text-secondary small">PÚBLICO ALVO:</label>
                  <input 
                    type="text" name="publicoAlvo"
                    className="form-control p-3 border-0" 
                    placeholder="Estudantes"
                    value={formData.publicoAlvo} onChange={handleChange} required
                  />
                </div>
                <div className="col-6">
                  <label className="form-label fw-bold text-secondary small">CATEGORIA:</label>
                  <input 
                    type="text" name="categoria"
                    className="form-control p-3 border-0" 
                    placeholder="Música/Educação"
                    value={formData.categoria} onChange={handleChange} required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* --- BOTÕES --- */}
          <div className="d-flex justify-content-center gap-3 mt-5">
            <Link 
              to="/paineladm" 
              className="btn btn-primary rounded-pill px-5 py-2 fw-bold shadow border-0" 
              style={{ backgroundColor: '#3b82f6', minWidth: '160px' }}
            >
              CANCELAR
            </Link>
            <button 
              type="submit" 
              disabled={loading}
              className="btn btn-primary rounded-pill px-5 py-2 fw-bold shadow border-0" 
              style={{ backgroundColor: '#3b82f6', minWidth: '160px' }}
            >
              {loading ? 'SALVANDO...' : 'CADASTRAR'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CadastroEvento;