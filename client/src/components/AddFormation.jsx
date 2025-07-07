import { useState, useContext } from 'react'
import { createFormation, fetchFormations } from '../services/formationService'
import { AuthContext } from '../context/AuthContext'

const AddFormation = ({ onAdded }) => {

  const { user } = useContext(AuthContext) // user.role doit être 'admin' pour pouvoir ajouter
  const [form, setForm] = useState({
    title: '',
    description: '',
    level: '',
  })

  if (!user || user.role !== 'admin') {
    return null
  }

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await createFormation(form)
      alert('Formation ajoutée avec succès !')
      setForm({ title: '', description: '', level: '' })
      if(onAdded) onAdded() // callback pour recharger la liste
    } catch (err) {
      console.error(err)
      alert('Erreur lors de l’ajout de la formation');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="add-formation-form">
      <input name="title" value={form.title} onChange={handleChange} placeholder="Titre" required />
      <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" required />
      <select name="level" value={form.level} onChange={handleChange} required>
        <option value="">-- Niveau --</option>
        <option value="college">Collège</option>
        <option value="lycee pro">Lycée pro</option>
        <option value="lycee général">Lycée général</option>
        <option value="bac+2">Enseignement supérieur</option>
        <option value="centre alternance">Centre d'alternance</option>
      </select>
      <button type="submit">Ajouter</button>
    </form>
  )
}

export default AddFormation