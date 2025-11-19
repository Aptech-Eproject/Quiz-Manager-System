import axios from '../utils/axios';

export const authAPI = {
  login: (credentials) => axios.post('/api/auth/login', credentials),
  register: (data) => axios.post('/api/auth/register', data),
  googleLogin: (credential) => axios.post('/api/auth/google-login', { credential }),
  getProfile: () => axios.get('/api/auth/profile'),
  setPassword: (newPassword) => axios.post('/api/auth/set-password', { newPassword }),
  refresh: (refresh_token) => axios.post('/api/auth/refresh', { refresh_token }),
  logout: (refresh_token) => axios.post('/api/auth/logout', { refresh_token }),
};

export const quizAPI = {
  getAll: (page = 1) => axios.get(`/api/quiz/showAll?page=${page}`),
  getAllAdmin: (page = 1, isAdmin = false) => axios.get(`/api/quiz/showAll?page=${page}&isAdmin=${isAdmin}`),
  showHome: () => axios.get(`/api/quiz/showHome/`),
  getById: (quizId) => axios.get(`/api/quiz/get/${quizId}`),
  create: (data) => axios.post('/api/quiz/create', data),
  update: (quizId, data) => axios.put(`/api/quiz/update/${quizId}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }),
  delete: (id) => axios.delete(`/api/quiz/delete/${id}`),
  publish: (id, data) => axios.put(`/api/quiz/publish/${id}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }),
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
