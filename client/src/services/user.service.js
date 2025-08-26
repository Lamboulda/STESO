const API_URL = 'http://localhost:3000/user'

const authHeader = () => {
  const token = localStorage.getItem('token')
  return token
    ? {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    : { 'Content-Type': 'application/json' }
}

// Obtenir le profil de l'utilisateur connecté
export const getProfile = async () => {
  const response = await fetch(`${API_URL}/me`, {
    method: 'GET',
    headers: authHeader(),
  });

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || "Erreur lors du chargement du profil")
  }

  return await response.json()
}

// Modifier le profil de l'utilisateur connecté
export const updateProfile = async (updatedData) => {
  const response = await fetch(`${API_URL}/me`, {
    method: 'PUT',
    headers: authHeader(),
    body: JSON.stringify(updatedData),
  });

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || "Erreur lors de la mise à jour du profil")
  }

  return await response.json()
}

// Supprimer un utilisateur (réservé admin)
export const deleteUser = async (userId) => {
  const response = await fetch(`${API_URL}/${userId}`, {
    method: 'DELETE',
    headers: authHeader(),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || "Erreur lors de la suppression de l'utilisateur")
  }

  return await response.json()
}