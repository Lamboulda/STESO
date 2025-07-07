import axios from 'axios'

const API_URL = 'https://steso.onrender.com/user'

const authHeader = () => {
  const token = localStorage.getItem('token')
  return token ? { headers: { Authorization: `Bearer ${token}` } } : {}
}

// Obtenir le profil de l'utilisateur connecté
export const getProfile = async () => {
  const res = await axios.get(`${API_URL}/me`, authHeader())
  return res.data
}

// Modifier le profil de l'utilisateur connecté
export const updateProfile = async (updatedData) => {
  const res = await axios.put(`${API_URL}/me`, updatedData, authHeader())
  return res.data
}

// Supprimer un utilisateur (réservé admin)
export const deleteUser = async (userId) => {
  const res = await axios.delete(`${API_URL}/${userId}`, authHeader())
  return res.data
}