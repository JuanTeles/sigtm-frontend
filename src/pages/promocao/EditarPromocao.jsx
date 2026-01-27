import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../contexts/authContext';

const EditarPromocao = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [tiposPromocao, setTiposPromocao] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    titulo: '',
    descricao: '',
    regras: '',
    dataInicio: '',
    dataTermino: '',
    tipoPromocaoId: ''
  });

  const podeGerenciar =
    user?.tipoUsuario?.toLowerCase() === 'gestor' ||
    user?.tipoUsuario?.toLowerCase() === 'parceiro';

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const [promocaoRes, tiposRes] = await Promise.all([
          axios.get(`http://localhost:8080/promocoes/find/${id}`),
          axios.get('http://localhost:8080/tipos-promocao/findall')
        ]);

        const p = promocaoRes.data;

        setForm({
          titulo: p.titulo || '',
          descricao: p.descricao || '',
          regras: p.regras || '',
          dataInicio: p.dataInicio?.split('T')[0] || '',
          dataTermino: p.dataTermino?.split('T')[0] || '',
          tipoPromocaoId: p.tipoPromocaoId || ''
        });

        setTiposPromocao(tiposRes.data);
      } catch (error) {
        alert('Erro ao carregar dados da promoção.');
      } finally {
        setLoading(false);
      }
    };

    carregarDados();
  }, [id]);

  if (!podeGerenciar) {
    return (
      <div className="container py-5 text-center">
        <h4 className="text-danger fw-bold">Acesso restrito</h4>
      </div>
    );
  }

  if (loading) {
    return <p className="text-center mt-5">Carregando...</p>;
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      tipoPromocaoId: Number(form.tipoPromocaoId)
    };

    try {
      await axios.put(
        `http://localhost:8080/promocoes/update/${id}`,
        payload
      );
      alert('Promoção atualizada com sucesso!');
      navigate('/promocoes');
    } catch (error) {
      alert('Erro ao atualizar promoção.');
    }
  };

  return (
    <div className="container py-5">
      <h1 className="fw-bold mb-4">EDITAR PROMOÇÃO</h1>

      <div className="p-4 p-md-5 rounded shadow-sm" style={{ backgroundColor: '#e5e7eb' }}>
        <form onSubmit={handleSubmit}>

          {/* LINHA 1 */}
          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <label className="form-label fw-bold small">TÍTULO</label>
              <input
                type="text"
                name="titulo"
                className="form-control p-3 border-0"
                value={form.titulo}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-bold small">TIPO DE PROMOÇÃO</label>
              <select
                name="tipoPromocaoId"
                className="form-select p-3 border-0"
                value={form.tipoPromocaoId}
                onChange={handleChange}
                required
              >
                <option value="">Selecione um tipo</option>
                {tiposPromocao.map(tipo => (
                  <option key={tipo.id} value={tipo.id}>
                    {tipo.titulo}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* LINHA 2 */}
          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <label className="form-label fw-bold small">DESCRIÇÃO</label>
              <textarea
                name="descricao"
                className="form-control p-3 border-0"
                rows="5"
                value={form.descricao}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-bold small">REGRAS</label>
              <textarea
                name="regras"
                className="form-control p-3 border-0"
                rows="5"
                value={form.regras}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* LINHA 3 */}
          <div className="row g-3 mb-5">
            <div className="col-md-3">
              <label className="form-label fw-bold small">DATA INÍCIO</label>
              <input
                type="date"
                name="dataInicio"
                className="form-control p-3 border-0"
                value={form.dataInicio}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-3">
              <label className="form-label fw-bold small">DATA TÉRMINO</label>
              <input
                type="date"
                name="dataTermino"
                className="form-control p-3 border-0"
                value={form.dataTermino}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* BOTÕES */}
          <div className="d-flex justify-content-center gap-3">
            <Link to="/promocoes" className="btn btn-secondary px-5 rounded-pill">
              CANCELAR
            </Link>
            <button type="submit" className="btn btn-primary px-5 rounded-pill">
              SALVAR
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default EditarPromocao;