import axios from '../lib/axios';

export const authAPI = {
  login: (credentials) => axios.post('/api/auth/login', credentials),
  register: (data) => axios.post('/api/auth/register', data),
  getProfile: () => axios.get('/api/auth/profile'),
};

export const quizAPI = {
  getAll: () => axios.get('/api/quiz'),
  getById: (id) => axios.get(`/api/quiz/${id}`),
  create: (data) => axios.post('/api/quiz', data),
  update: (id, data) => axios.put(`/api/quiz/${id}`, data),
  delete: (id) => axios.delete(`/api/quiz/${id}`),
};

export const resultAPI = {
  getAll: () => axios.get('/api/result'),
  getById: (id) => axios.get(`/api/result/${id}`),
  submit: (data) => axios.post('/api/result', data),
};
