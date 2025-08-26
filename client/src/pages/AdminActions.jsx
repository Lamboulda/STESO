import { useEffect, useState } from 'react'

export default function AdminActionsPage() {
  const [actions, setActions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchActions = async () => {
      try {
        const response = await fetch('https://steso.onrender.com/actions', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) {
          throw new Error('Erreur lors du chargement des données')
        }

        const data = await response.json()
        setActions(data)
      } catch (err) {
        console.error(err)
        setError(`Erreur lors du chargement de l'historique.`)
      } finally {
        setLoading(false)
      }
    }

    fetchActions()
  }, [])

  if (loading) return <p className="admin-actions__loading" role="status">Chargement...</p>
  if (error) return <p className="admin-actions__error" role="alert">{error}</p>

  return (
    <main className="admin-actions" aria-labelledby="admin-actions-title">
      <h1 id="admin-actions-title" className="admin-actions__title">
        Historique des actions des administrateurs
      </h1>

      {actions.length === 0 ? (
        <p className="admin-actions__empty" role="status">Aucune action enregistrée.</p>
      ) : (
        <ul className="admin-actions__list">
          {actions.map(action => (
            <li key={action.id} className="admin-actions__item">
              <article className="admin-actions__card" aria-label={`Action numéro ${action.id}`}>
                <h2 className="admin-actions__card-title">
                  {action.admin?.user?.first_name} {action.admin?.user?.last_name}
                </h2>
                <p className="admin-actions__card-action">
                  <strong>Action :</strong> {action.action}
                </p>
                {action.details && (
                  <p className="admin-actions__card-details">
                    <strong>Détails :</strong> {action.details}
                  </p>
                )}
                <p className="admin-actions__card-date">
                  <strong>Date :</strong>{' '}
                  {new Date(action.action_date).toLocaleString('fr-FR', {
                    dateStyle: 'short',
                    timeStyle: 'short',
                  })}
                </p>
              </article>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}