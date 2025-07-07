import { useState, useEffect } from 'react';
import {fetchFormations, deleteFormation, updateFormation} from '../services/formationService'
import AddFormation from './AddFormation'

const FormationByLevel = ({ level }) => {
  const [formations, setFormations] = useState([])
  const [editId, setEditId] = useState(null)
  const [editData, setEditData] = useState({ title: '', description: '' })

  const role = JSON.parse(localStorage.getItem("user"))?.role || "user"

  const loadFormations = async () => {
    try {
      const all = await fetchFormations()
      const filtered = all.filter((f) => f.level === level)
      setFormations(filtered)
    } catch (err) {
      console.error('Erreur lors du chargement des formations', err)
    }
  }

  useEffect(() => {
    loadFormations()
  }, [level])

  const handleDelete = async (id) => {
    if (window.confirm("Confirmer la suppression ?")) {
      try {
        await deleteFormation(id)
        loadFormations()
      } catch (err) {
        console.error("Erreur suppression", err)
      }
    }
  }

  const handleEditClick = (formation) => {
    setEditId(formation._id)
    setEditData({ title: formation.title, description: formation.description })
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault()
    try {
      await updateFormation(editId, editData)
      setEditId(null)
      loadFormations()
    } catch (err) {
      console.error("Erreur modification", err)
    }
  }

  return (
    <div className="formation-section">
      {role === 'admin' && <AddFormation onAdded={loadFormations} />}

      <div className="formation-list">
        {formations.map((formation) => (
          <div key={formation._id} className="formation-card">
            {editId === formation._id ? (
              <form onSubmit={handleEditSubmit} className="edit-form">
                <input
                  type="text"
                  value={editData.title}
                  onChange={(e) =>
                    setEditData({ ...editData, title: e.target.value })
                  }
                  required
                />
                <textarea
                  value={editData.description}
                  onChange={(e) =>
                    setEditData({ ...editData, description: e.target.value })
                  }
                  required
                />
                <button type="submit">Enregistrer</button>
                <button type="button" onClick={() => setEditId(null)}>
                  Annuler
                </button>
              </form>
            ) : (
              <>
                <h3>{formation.title}</h3>
                <p>{formation.description}</p>

                {role === 'admin' && (
                  <div className="button-group">
                    <button onClick={() => handleEditClick(formation)}>
                      Modifier
                    </button>
                    <button onClick={() => handleDelete(formation._id)}>
                      Supprimer
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default FormationByLevel