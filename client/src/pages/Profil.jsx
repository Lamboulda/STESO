import { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Profil = () => {
  const { user, handleLogout } = useContext(AuthContext)
  const [profile, setProfile] = useState(null)
  const [form, setForm] = useState({ first_name: '', last_name: '',email: '', bio: '' })
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`https://steso.onrender.com/users/${user.id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          },
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || 'Erreur lors du chargement du profil')
        }

        const data = await response.json()

        setProfile(data)
        setForm({
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            bio: data.bio })
      } catch (err) {
        console.error('Erreur lors du chargement du profil', err)
      }
    }
    console.log('User from context:', user)
    if (user?.id) {
      fetchProfile()
    }
  }, [user])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`https://steso.onrender.com/users/${user.id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    });

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Erreur lors de la mise à jour')
    }

    alert('Profil mis à jour avec succès !')
    } catch (err) {
      alert('Erreur lors de la mise à jour du profil.')
    }
  }

  const handleDelete = async () => {
    if (!window.confirm('Voulez-vous vraiment supprimer ce profil ?')) return
    try {
      const response = await fetch(`https://steso.onrender.com/users/${user.id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Erreur lors de la suppression')
    }
      alert('Profil supprimé.')
      handleLogout()
      navigate('/')
    } catch (err) {
      alert('Erreur lors de la suppression du profil.')
    }
  }

  if (!profile) return <div>Chargement du profil...</div>

  return (
    <div className="profile-container">
      <h2>Profil de {profile.first_name}</h2>
      <form onSubmit={handleSubmit} className="profile-form">
        <label>Prénom</label>
        <input
          type="text"
          name="first_name"
          value={form.first_name}
          onChange={handleChange}
          required
        />

        <label>Nom</label>
        <input
          type="text"
          name="last_name"
          value={form.last_name}
          onChange={handleChange}
          required
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <label>Bio</label>
        <input
          type="text"
          name="bio"
          value={form.bio}
          onChange={handleChange}
        />

        <button type="submit">Modifier le profil</button>
      </form>

      {user.isAdmin && (
        <button className="delete-button" onClick={handleDelete}>
          Supprimer ce profil
        </button>
      )}
    </div>
  )
}

export default Profil