import { useState, useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { Link } from "react-router-dom"
import logo from '../assets/logo.png'

const Login = () => {
  const [infoUser, setInfoUser] = useState({
    email: '',
    password: ''
  });

  const { handleLogin } = useContext(AuthContext)

  return (
    <div className="login-container">
      <div className="login-box">
        <img
          alt="Etablissement st-Antoine ste-Sophie"
          src={logo}
          className="logo"
        />
        <h2 className="title">Se connecter à son compte</h2>

        <form onSubmit={e => handleLogin(e, infoUser)} method="POST" className="form">
          <div className="form-group">
            <label htmlFor="email" className="label">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="input"
              onChange={e => setInfoUser({ ...infoUser, email: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="label">Mot de passe</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="input"
              onChange={e => setInfoUser({ ...infoUser, password: e.target.value })}
            />
          </div>

          <button type="submit" className="btn-submit">
            Se connecter
          </button>
        </form>
        <p className="register-redirect">
          Pas encore de compte ? <Link to="/register">Inscrivez-vous ici</Link>
        </p>
      </div>
    </div>
  )
}

export default Login
