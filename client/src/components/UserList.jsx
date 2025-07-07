import { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Link } from 'react-router-dom'
import axios from 'axios'

const UserList = () => {
  const [users, setUsers] = useState([])
  const { isAuthenticated } = useContext(AuthContext)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('https://steso.onrender.com/users/all', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data)
      } catch (err) {
        console.error('Erreur lors du chargement des utilisateurs', err)
      }
    }

    fetchUsers()
  }, [])

  return (
    <div className="user-list-container">
      {users.map((user) => (
        <Link to={`/users/${user._id}`} key={user._id} className="user-card">
          <h3>{user.first_name} {user.last_name}</h3>
          <p>{user.email}</p>
          {user.bio && <p className="bio">{user.bio}</p>}
        </Link>
      ))}
    </div>
  )
}

export default UserList