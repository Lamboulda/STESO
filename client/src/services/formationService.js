const API_URL = 'http://localhost:3000/formations'

const authHeader = () => {
  const token = localStorage.getItem("token")
  const headers = {
    'Content-Type': 'application/json'
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  return headers
}

// GET - toutes les formations
export const fetchFormations = async () => {
  const response = await fetch(API_URL)
  if (!response.ok) {
    throw new Error('Erreur lors du chargement des formations')
  }
  return await response.json()
}

// POST - Créer une formation (admin uniquement)
export const createFormation = async (data) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || 'Erreur lors de la création')
  }

  return await response.json()
}

// PUT - Modifier une formation
export const updateFormation = async (id, updatedData) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: authHeader(),
    body: JSON.stringify(updatedData),
  })
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || 'Erreur lors de la mise à jour')
  }

  return await response.json()
}

// DELETE - Supprimer une formation
export const deleteFormation = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: authHeader(),
  })
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || 'Erreur lors de la suppression')
  }

  return await response.json()
}