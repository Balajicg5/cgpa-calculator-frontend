import axios from 'axios'

const API_URL ='https://cgpa-calculator-backend-qjnt.onrender.com/api'

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add auth token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Auth endpoints
export const registerUser = async (userData) => {
  const response = await api.post('/auth/register', userData)
  return response.data
}

export const loginUser = async (userData) => {
  const response = await api.post('/auth/login', userData)
  return response.data
}

export const getCurrentUser = async () => {
  const response = await api.get('/auth/me')
  return response.data
}

// Semester endpoints
export const getSemesters = async () => {
  const response = await api.get('/semesters')
  return response.data
}

export const getSemester = async (id) => {
  const response = await api.get(`/semesters/${id}`)
  return response.data
}

export const createSemester = async (semesterData) => {
  const response = await api.post('/semesters', semesterData)
  return response.data
}

export const updateSemester = async (id, semesterData) => {
  const response = await api.put(`/semesters/${id}`, semesterData)
  return response.data
}

export const deleteSemester = async (id) => {
  const response = await api.delete(`/semesters/${id}`)
  return response.data
}

export const getCGPA = async () => {
  const response = await api.get('/semesters/cgpa')
  return response.data
}

export default api