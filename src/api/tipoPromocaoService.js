import axios from 'axios';

const API_URL = 'http://localhost:8080/tipos-promocao';

export const listarTipos = () =>
  axios.get(`${API_URL}/findall`);

export const buscarPorId = (id) =>
  axios.get(`${API_URL}/find/${id}`);

export const cadastrarTipo = (data) =>
  axios.post(`${API_URL}/save`, data);

export const atualizarTipo = (id, data) =>
  axios.put(`${API_URL}/update/${id}`, data);

export const excluirTipo = (id) =>
  axios.delete(`${API_URL}/delete/${id}`);