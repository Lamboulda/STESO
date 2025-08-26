import { useEffect, useState } from 'react'

const Alumni = () => {
  const [alumni, setAlumni] = useState([])
  const [selectedAlumni, setSelectedAlumni] = useState(null)

  useEffect(() => {
    const fetchAlumni = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
        setError("Non autorisé : aucun token trouvé.")
        return
    }
      try {
        const response = await fetch('http://localhost:3000/alumni/all', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}))
            throw new Error(
                `HTTP ${response.status}: ${errorData.message || response.statusText}`
            )
      }
        const data = await response.json()
        setAlumni(data)
      } catch (err) {
        console.error(err)
      }
    }

    fetchAlumni()
  }, [])

  return (
    <div className="alumni-container">
      <h2>Nos anciens élèves</h2>

      <div className="alumni-grid">
        {alumni.map((a) => (
          <div
            key={a.id}
            className="alumni-card"
            onClick={() => setSelectedAlumni(a)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setSelectedAlumni(a)}
            aria-label={`Voir les détails de ${a.first_name} ${a.last_name}`}
          >
            <h3>{a.first_name} {a.last_name}</h3>
            <p>{a.alumni?.profession}</p>
            <p className="year">{a.alumni?.graduation_year}</p>
          </div>
        ))}
      </div>

      {/* Fenêtre dynamique au clic */}
      {selectedAlumni && (
        <div className="modal-overlay" onClick={() => setSelectedAlumni(null)}>
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="alumni-title"
            tabIndex={-1}
            onClick={(e) => e.stopPropagation()}
          >
            <button
                className="close-btn"
                onClick={() => setSelectedAlumni(null)}
                aria-label="Fermer la fenêtre"
            >X</button>
            <h2 id="alumni-title">{selectedAlumni.first_name} {selectedAlumni.last_name}</h2>
            <p><strong>Email :</strong> {selectedAlumni.email}</p>
            <p><strong>Bio :</strong> {selectedAlumni.bio}</p>
            <p><strong>Profession :</strong> {selectedAlumni.alumni?.profession}</p>
            <p><strong>Année de graduation :</strong> {selectedAlumni.alumni?.graduation_year}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Alumni