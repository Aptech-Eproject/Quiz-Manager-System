import axios from '../utils/axios';

export const authAPI = {
  login: (credentials) => axios.post('/api/auth/login', credentials),
  register: (data) => axios.post('/api/auth/register', data),
  getProfile: () => axios.get('/api/auth/profile'),
};

export const quizAPI = {
  getAll: () => axios.get('/api/quiz/showAll'),
  getById: (id) => axios.get(`/api/quiz/get/${id}`),
  create: (data) => axios.post('/api/quiz/create', data),
  update: (id, data) => axios.put(`/api/quiz/${id}`, data),
  delete: (id) => axios.delete(`/api/quiz/${id}`),
};

export const questionAPI = {
  getAll: (quizId) => axios.get(`/api/quiz/${quizId}/questions/showAll`),
  create: (quizId, data) => axios.post(`/api/quiz/${quizId}/questions/create`, data),
  update: (quizId, questionId, data) => axios.put(`/api/quiz/${quizId}/questions/update/${questionId}`, data),
  delete: (quizId, questionId) => axios.delete(`/api/quiz/${quizId}/questions/delete/${questionId}`),
}

export const resultAPI = {
  getAll: () => axios.get('/api/result'),
  getById: (id) => axios.get(`/api/result/${id}`),
  submit: (data) => axios.post('/api/result', data),
};
