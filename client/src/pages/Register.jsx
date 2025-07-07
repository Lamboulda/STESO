import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { Link } from "react-router-dom"
import logo from '../assets/logo.png'

const Register = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: ''
  })

  const handleRegistration = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('https://steso.onrender.com/auth/register', form)
      if (res.status === 201) {
        alert(res.data)
        navigate('/')
      }
    } catch (err) {
      console.error(err)
      if (err?.response?.data) alert(err.response.data)
    }
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  return (
    <div className="register-container">
      <div className="form-wrapper">
        <img
          src={logo}
          alt="Logo"
          className="logo"
        />
        <h2>Créer un compte</h2>

        <form onSubmit={handleRegistration}>
          <label htmlFor="first_name">Prénom</label>
          <input
            id="first_name"
            name="first_name"
            type="text"
            required
            onChange={handleChange}
            value={form.first_name}
          />

          <label htmlFor="last_name">Nom</label>
          <input
            id="last_name"
            name="last_name"
            type="text"
            required
            onChange={handleChange}
            value={form.last_name}
          />

          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            onChange={handleChange}
            value={form.email}
          />

          <label htmlFor="password">Mot de passe</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            onChange={handleChange}
            value={form.password}
          />

          <button type="submit">S'inscrire</button>
        </form>

        <p className="login-redirect">
          Déjà inscrit ? <Link to="/login">Connectez-vous ici</Link>
        </p>
      </div>
    </div>
  )
}

export default Register