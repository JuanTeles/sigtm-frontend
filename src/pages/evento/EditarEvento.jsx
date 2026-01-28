import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getEventoById, updateEvento } from '../../api/eventoService';

const EditarEvento = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  
  // 1. Estados para guardar os IDs dos relacionamentos
  const [enderecoId, setEnderecoId] = useState(null); 
  const [parceiroId, setParceiroId] = useState(null); // <--- NOVO: ID do Parceiro

  useEffect(() => {
    const carregarEvento = async () => {
      try {
        setLoading(true);
        const data = await getEventoById(id);

        console.log("Dados do evento:", data); // Debug para ver o que chega

        // 2. Lógica para extrair o ID do endereço
        if (data.endereco && data.endereco.id) {
            setEnderecoId(data.endereco.id);
        }

        // 3. Lógica para extrair o ID do Parceiro (CRUCIAL PARA EVITAR ERRO 422)
        if (data.parceiro && data.parceiro.id) {
            setParceiroId(data.parceiro.id);
        }

        // Lógica de data e hora
        const horaIso = data.hora || null; 
        const dataDate = data.data || (horaIso ? horaIso.split('T')[0] : '') || '';
        const horario = horaIso ? (horaIso.split('T')[1] ? horaIso.split('T')[1].slice(0,5) : '') : (data.horario || '');

        setFormData({
          nome: data.nome || '',
          estado: data.endereco?.estado || data.estado || '',
          cidade: data.endereco?.cidade || data.cidade || '',
          descricao: data.descricao || data.description || '',
          data: dataDate,
          horario: horario,
          nivelAcessibilidade: data.nivelAcessibilidade ?? data.acessibilidade ?? 1,
          bairro: data.endereco?.bairro || data.bairro || '',
          rua: data.endereco?.rua || data.rua || '',
          numero: data.endereco?.numero || data.numero || '',
          programacao: data.programacao || '',
          publicoAlvo: data.publicoAlvo || data.publico || '',
          categoria: data.categoria || ''
        });
      } catch (err) {
        console.error('Erro ao carregar evento:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) carregarEvento();
  }, [id]);

  const handleChange = (key) => (e) => {
    const value = e.target.type === 'range' ? Number(e.target.value) : e.target.value;
    setFormData({ ...formData, [key]: value });
  };

 const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const horaIso = (formData.data && formData.horario) ? `${formData.data}T${formData.horario}:00` : null;

        const payload = {
            nome: formData.nome,
            descricao: formData.descricao,
            data: formData.data,
            hora: horaIso,
            nivelAcessibilidade: formData.nivelAcessibilidade,
            programacao: formData.programacao,
            publicoAlvo: formData.publicoAlvo,
            categoria: formData.categoria,
            
            // O Backend espera um objeto 'endereco' com os dados, não apenas o ID solto
            endereco: {
                id: enderecoId, 
                rua: formData.rua,
                numero: formData.numero,
                bairro: formData.bairro,
                cidade: formData.cidade,
                estado: formData.estado
            },

            parceiroId: parceiroId
        };

        console.log("Payload enviado:", JSON.stringify(payload, null, 2));

        await updateEvento(id, payload);
        alert('Evento atualizado com sucesso!');
        navigate('/eventos');
    } catch (err) {
      console.error('Erro ao atualizar evento:', err);
      if (err.response) {
          // Mostra mensagem detalhada se vier do backend
          const msg = err.response.data.message || JSON.stringify(err.response.data);
          alert(`Erro no backend: ${msg}`);
      } else {
          alert('Erro desconhecido ao atualizar.');
      }
    }
  };

  if (loading) {
    return <div className="text-center py-5">Carregando...</div>;
  }

  return (
    <div className="container py-5">
      <h1 className="fw-bold mb-4">EDITAR EVENTO</h1>

      <div className="p-4 p-md-5 rounded shadow-sm" style={{ backgroundColor: '#e5e7eb' }}>
        <form onSubmit={handleSubmit}>
          {/* Cabeçalho */}
          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <label className="form-label fw-bold text-secondary small">NOME</label>
              <input
                type="text"
                className="form-control p-3 border-0"
                value={formData.nome || ''}
                onChange={handleChange('nome')}
                placeholder="Nome do evento"
              />
            </div>
            <div className="col-md-3">
              <label className="form-label fw-bold text-secondary small">ESTADO:</label>
              <input
                type="text"
                className="form-control p-3 border-0"
                value={formData.estado || ''}
                onChange={handleChange('estado')}
                placeholder="UF"
              />
            </div>
            <div className="col-md-3">  
              <label className="form-label fw-bold text-secondary small">CIDADE:</label>
              <input
                type="text"
                className="form-control p-3 border-0"
                value={formData.cidade || ''}
                onChange={handleChange('cidade')}
                placeholder="Cidade"
              />
            </div>
          </div>

          {/* Corpo */}
          <div className="row g-4 mb-4">
            
            {/* Esquerda */}
            <div className="col-md-6 d-flex flex-column gap-3">
              <div className="flex-grow-1">
                <label className="form-label fw-bold text-secondary small">DESCRIÇÃO</label>
                <textarea
                  className="form-control border-0 p-3 h-100"
                  style={{ minHeight: '120px', resize: 'none' }}
                  value={formData.descricao || ''}
                  onChange={handleChange('descricao')}
                  placeholder="Descrição do evento"
                ></textarea>
              </div>

              <div className="row g-3">
                <div className="col-6">
                  <label className="form-label fw-bold text-secondary small">DATA:</label>
                  <input
                    type="date"
                    className="form-control p-3 border-0 text-secondary"
                    value={formData.data || ''}
                    onChange={handleChange('data')}
                  />
                </div>
                <div className="col-6">
                  <label className="form-label fw-bold text-secondary small">HORÁRIO:</label>
                  <input
                    type="time"
                    className="form-control p-3 border-0 text-secondary"
                    value={formData.horario || ''}
                    onChange={handleChange('horario')}
                  />
                </div>
              </div>

              <div>
                <label className="form-label fw-bold text-secondary small d-block mb-2">NIVEL DE ACESSIBILIDADE:</label>
                <input
                  type="range"
                  className="form-range"
                  min="1"
                  max="5"
                  id="accessibilityRange"
                  value={formData.nivelAcessibilidade || 1}
                  onChange={handleChange('nivelAcessibilidade')}
                />
                <div className="d-flex justify-content-between text-secondary small px-1">
                  <span>Baixo</span>
                  <span>Médio</span>
                  <span>Alto</span>
                </div>
              </div>
            </div>

            {/* Direita */}
            <div className="col-md-6 d-flex flex-column gap-3">
              <div>
                <label className="form-label fw-bold text-secondary small">BAIRRO:</label>
                <input
                  type="text"
                  className="form-control p-3 border-0 mb-3"
                  value={formData.bairro || ''}
                  onChange={handleChange('bairro')}
                  placeholder="Bairro"
                />
                
                <div className="row g-3">
                  <div className="col-8">
                    <label className="form-label fw-bold text-secondary small">RUA:</label>
                    <input
                      type="text"
                      className="form-control p-3 border-0"
                      value={formData.rua || ''}
                      onChange={handleChange('rua')}
                      placeholder="Rua"
                    />
                  </div>
                  <div className="col-4">
                    <label className="form-label fw-bold text-secondary small">Nº:</label>
                    <input
                      type="text"
                      className="form-control p-3 border-0"
                      value={formData.numero || ''}
                      onChange={handleChange('numero')}
                      placeholder="Nº"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="form-label fw-bold text-secondary small">PROGRAMAÇÃO:</label>
                <input
                  type="text"
                  className="form-control p-3 border-0"
                  value={formData.programacao || ''}
                  onChange={handleChange('programacao')}
                  placeholder="Programação"
                />
              </div>

              <div className="row g-3">
                <div className="col-6">
                  <label className="form-label fw-bold text-secondary small">PÚBLICO ALVO:</label>
                  <input
                    type="text"
                    className="form-control p-3 border-0"
                    value={formData.publicoAlvo || ''}
                    onChange={handleChange('publicoAlvo')}
                    placeholder="Público Alvo"
                  />
                </div>
                <div className="col-6">
                  <label className="form-label fw-bold text-secondary small">CATEGORIA:</label>
                  <input
                    type="text"
                    className="form-control p-3 border-0"
                    value={formData.categoria || ''}
                    onChange={handleChange('categoria')}
                    placeholder="Categoria"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Botões */}
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
              className="btn btn-primary rounded-pill px-5 py-2 fw-bold shadow border-0" 
              style={{ backgroundColor: '#3b82f6', minWidth: '160px' }}
            >
              ATUALIZAR
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default EditarEvento;