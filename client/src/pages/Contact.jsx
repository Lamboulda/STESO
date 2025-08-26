import { useState } from 'react'

const Contact = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    message: '',
  })

  const [status, setStatus] = useState(null) // null, 'success', 'error', 'loading'

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setStatus('loading')

    if (!formData.first_name || !formData.last_name || !formData.email || !formData.message) {
      setStatus('error')
      return
    }

    try {
      const response = await fetch('https://steso.onrender.com/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setStatus('success')
        setFormData({ first_name: '', last_name: '', email: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch (err) {
      setStatus('error')
    }
  }

  return (
    <main className="contact">
      <div className="contact__container">
        <h1>Contactez-nous</h1>
        <form className="contact__form" onSubmit={handleSubmit} noValidate>
          <label htmlFor="first_name">Prénom</label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
            placeholder="Votre prénom"
          />

          <label htmlFor="last_name">Nom</label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
            placeholder="Votre nom"
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="email@exemple.com"
          />

          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
            placeholder="Votre message"
          ></textarea>

          <button type="submit" disabled={status === 'loading'}>
            {status === 'loading' ? 'Envoi...' : 'Envoyer'}
          </button>

          {status === 'success' && (
            <p className="contact__success">Message envoyé avec succès !</p>
          )}
          {status === 'error' && (
            <p className="contact__error">
              Une erreur est survenue. Merci de réessayer.
            </p>
          )}
        </form>
      </div>
    </main>
  )
}

export default Contact