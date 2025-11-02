import axios from 'axios'
import { ElMessage } from 'element-plus'

const api = axios.create({
  // backend url
  baseURL: 'http://123.207.73.102:8000/api',
  timeout: 30000
})

// token preserve
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = token
  return config
})

api.interceptors.response.use(
  response => response.data,
  error => {
    const msg = error.response?.data?.detail || 'Failed'
    ElMessage.error(msg)
    // return to login page as token expired
    if (error.response?.status === 401) {
      localStorage.clear()
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default {
  register: (data) => api.post('/register', data),
  login: (data) => api.post('/login', data),
  logout: () => api.post('/logout'),
  getUser: () => api.get('/user'),
  updateUser: (data) => api.put('/user', data),
  getContacts: () => api.get('/contacts'),
  createContact: (data) => api.post('/contacts', data),
  updateContact: (id, data) => api.put(`/contacts/${id}`, data),
  deleteContact: (id) => api.delete(`/contacts/${id}`),
  addFriend: (id) => api.get(`/addfriend/${id}`)
}