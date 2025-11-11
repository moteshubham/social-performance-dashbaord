import axios from 'axios';

const API_BASE = import.meta.env.REACT_APP_API_URL || 'http://127.0.0.1:8000/api';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
});

export async function listBrands() {
  const res = await api.get('/brands/');
  return res.data;
}

export async function createBrand(payload) {
  const res = await api.post('/brands/', payload);
  return res.data;
}

export async function updateBrand(id, payload) {
  const res = await api.put(`/brands/${id}/`, payload);
  return res.data;
}

export async function deleteBrand(id) {
  const res = await api.delete(`/brands/${id}/`);
  return res.data;
}

export async function fetchMetricsByHandle(handle) {
  const res = await api.get(`/fetch-metrics/${handle}/`);
  return res.data;
}

export async function fetchMetricsForBrand(id) {
  const res = await api.get(`/brands/${id}/fetch_metrics/`);
  return res.data;
}

export default api;
