import { useState, createContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export const AuthContext = createContext(null)

export const AuthController = ({ children }) => {
  const navigate = useNavigate()

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const storedUser = localStorage.getItem('user')
    if (token && storedUser) {
      setIsAuthenticated(true)
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const handleLogin = async (e, infoUser) => {
    e.preventDefault()
    try {
      const response = await axios.post('https://steso.onrender.com/auth/login', infoUser, {
        withCredentials: true,
      })

      if (response.status === 200) {
        const { token, user, message } = response.data
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))
        setUser(user)
        setIsAuthenticated(true)
        alert(message)
        navigate('/')
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Erreur lors de la connexion')
    }
  }

  const handleLogout = () => {
    try {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      setIsAuthenticated(false)
      setUser(null)
      navigate('/')
    } catch (err) {
      alert(err)
    }
  }

  return (
    <AuthContext.Provider value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
        handleLogin,
        handleLogout,
      }}>{children}
    </AuthContext.Provider>
  )
}