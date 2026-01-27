import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditarTipoPromocao = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    titulo: '',
    regra: '',
    descricao: ''
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8080/tipos-promocao/find/${id}`)
      .then(res => setForm(res.data))
      .catch(() => alert('Erro ao carregar dados.'));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8080/tipos-promocao/update/${id}`, form);
      alert('Tipo de promoção atualizado!');
      navigate('/tipos-promocao');
    } catch {
      alert('Erro ao atualizar tipo de promoção.');
    }
  };

  return (
    <div className="container py-5">
      <h1 className="fw-bold mb-4">EDITAR TIPO DE PROMOÇÃO</h1>

      <div className="p-4 p-md-5 rounded shadow-sm" style={{ backgroundColor: '#e5e7eb' }}>
        <form onSubmit={handleSubmit}>
          <div className="row g-4 mb-4">

            <div className="col-md-6 d-flex flex-column gap-3">
              <div>
                <label className="form-label fw-bold text-secondary small">TÍTULO:</label>
                <input
                  type="text"
                  name="titulo"
                  className="form-control p-3 border-0"
                  value={form.titulo}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="flex-grow-1">
                <label className="form-label fw-bold text-secondary small">REGRA:</label>
                <textarea
                  name="regra"
                  className="form-control border-0 p-3 h-100"
                  style={{ minHeight: '150px', resize: 'none' }}
                  value={form.regra}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="col-md-6 d-flex flex-column">
              <label className="form-label fw-bold text-secondary small">DESCRIÇÃO:</label>
              <textarea
                name="descricao"
                className="form-control border-0 p-3 h-100"
                style={{ minHeight: '240px', resize: 'none' }}
                value={form.descricao}
                onChange={handleChange}
                required
              />
            </div>

          </div>

          <div className="d-flex justify-content-center gap-3 mt-5">
            <Link
              to="/tipos-promocao"
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

export default EditarTipoPromocao;