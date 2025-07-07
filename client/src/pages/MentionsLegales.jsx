const MentionsLegales = () => {
  return (
    <main className="mentions">
      <div className="mentions__container">
        <h1 className="mentions__title">Mentions légales</h1>

        <section className="mentions__section">
          <h2>Éditeur du site</h2>
          <p>
            Ce site a été réalisé dans le cadre d’un projet d’alternance.
          </p>
        </section>

        <section className="mentions__section">
          <h2>Hébergement</h2>
          <p>
            Ce site est hébergé dans le cadre d’un projet pédagogique.
          </p>
        </section>

        <section className="mentions__section">
          <h2>Propriété intellectuelle</h2>
          <p>
            Tous les contenus présents sur ce site (textes, images, vidéos, logos, etc.) sont la propriété exclusive de l’établissement ou ont été utilisés avec autorisation.
            Toute reproduction est interdite sans autorisation préalable.
          </p>
        </section>

        <section className="mentions__section">
          <h2>Responsabilité</h2>
          <p>
            Les informations fournies sont indicatives. L’établissement ne peut être tenu responsable d’une mauvaise utilisation des contenus.
          </p>
        </section>

        <section className="mentions__section">
          <h2>Données personnelles</h2>
          <p>
            Ce site ne collecte aucune donnée personnelle. Si un système de connexion est activé, les données restent sécurisées et privées.
            Vous pouvez demander la suppression de vos données à : contact@edu-steso.fr
          </p>
        </section>

        <section className="mentions__section">
          <h2>Crédits</h2>
          <p>
            Icônes : React Icons – Framework : React.js / Node.js
            <br />
            Images et vidéos utilisées avec l’autorisation de l’établissement.
          </p>
        </section>
      </div>
    </main>
  )
}

export default MentionsLegales