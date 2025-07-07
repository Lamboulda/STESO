import axios from 'axios'

const API_URL = 'https://steso.onrender.com/formations'

const authHeader = () => {
  const token = localStorage.getItem("token");
  return token
    ? { headers: { Authorization: `Bearer ${token}` } }
    : {}
}

// GET - toutes les formations
export const fetchFormations = async () => {
  const res = await axios.get(API_URL)
  return res.data
}

// POST - Créer une formation (admin uniquement)
export const createFormation = async (data) => {
  const res = await axios.post(API_URL, data, authHeader())
  return res.data
}

// PUT - Modifier une formation
export const updateFormation = async (id, updatedData) => {
  const res = await axios.put(`${API_URL}/${id}`, updatedData, authHeader())
  return res.data
}

// DELETE - Supprimer une formation
export const deleteFormation = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`, authHeader())
  return res.data
}
