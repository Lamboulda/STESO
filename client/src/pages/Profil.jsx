import { useEffect, useState, useContext } from 'react'
import axios from 'axios'
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
        const res = await axios.get(`https://steso.onrender.com/users/${user.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        setProfile(res.data)
        setForm({
            first_name: res.data.first_name,
            last_name: res.data.last_name,
            email: res.data.email,
            bio: res.data.bio })
      } catch (err) {
        console.error('Erreur lors du chargement du profil', err)
      }
    }

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
      await axios.put(`https://steso.onrender.com/users/${user.id}`, form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      alert('Profil mis à jour avec succès !')
    } catch (err) {
      alert('Erreur lors de la mise à jour du profil.')
    }
  }

  const handleDelete = async () => {
    if (!window.confirm('Voulez-vous vraiment supprimer ce profil ?')) return
    try {
      await axios.delete(`https://steso.onrender.com/users/${user.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
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

      {user.role === 'admin' && (
        <button className="delete-button" onClick={handleDelete}>
          Supprimer ce profil
        </button>
      )}
    </div>
  )
}

export default Profil