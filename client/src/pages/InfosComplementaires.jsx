const resources = [
  {
    title: "Parcoursup",
    url: "https://www.parcoursup.fr/",
    description: "Plateforme nationale d’admission en première année des formations supérieures."
  },
  {
    title: "Onisep",
    url: "https://www.onisep.fr/",
    description: "Informations sur les métiers, formations et orientation scolaire."
  },
  {
    title: "Aides pour l'alternance",
    url: "https://www.service-public.fr/particuliers/vosdroits/F32345",
    description: "Informations sur les aides financières et dispositifs pour l’alternance."
  },
  {
    title: "Bourses d'études",
    url: "https://www.etudiant.gouv.fr/fr/aides-financieres-12",
    description: "Détails sur les différentes bourses et aides financières disponibles."
  },
  {
    title: "Mobilité internationale",
    url: "https://www.campusfrance.org/fr",
    description: "Programme et aides pour partir étudier à l’étranger."
  },
  {
    title: "Ecole directe",
    url: "https://www.ecoledirecte.com/login?cameFrom=%2FAccueil",
    description: "Informations sur la scolarité."
  },
  {
    title: "ARBS",
    url: "https://www.arbs.com/",
    description: "Pour les manuels scolaires."
  },
  {
    title: "Diocèse de Soissons",
    url: "https://www.soissons.catholique.fr/",
    description: "Diocèse de Soissons."
  }
]

const InfosComplementaires = () => {
  return (
    <div className="infos-complements">
      <h1>Ressources utiles</h1>
      <ul>
        {resources.map(({title, url, description}) => (
          <li key={title} className="resource-item">
            <a href={url} target="_blank" rel="noopener noreferrer" className="resource-link">
              <strong>{title}</strong>
            </a>
            <p>{description}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default InfosComplementaires