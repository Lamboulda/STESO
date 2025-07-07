import { useState } from 'react';
import VideoGrid from "../components/VideoGrid.jsx"
import ImageGallery from "../components/ImageGallery.jsx"
import InfoSection from "../components/InfoSection.jsx"
import FlexTable from "../components/FlexTable.jsx"
import FormationByLevel from '../components/FormationByLevel.jsx'
import college from '../assets/college/COLLEGE.jpg'
import capture from '../assets/college/Capture.png'
import bigchallenge from '../assets/college/BIG-CHALLENGE.png'
import pelerinage from '../assets/college/PELERINAGE.png'
import puydufou1 from '../assets/college/puy-du-fou.jpg'
import puydufou2 from '../assets/college/puydufou.png'
import velovermand from '../assets/college/VELO-VERMAND.png'
import planningclub from '../assets/college/doc1_planning_clubs_25_26.png'
import specifite from '../assets/college/doc1_specifite_college.png'
import banner from '../assets/logo-header.png'
import inscription from '../assets/Feuille-inscription-banniere.png'
import voyage1 from '../assets/college/IMG-20240624-WA0028-150x150.jpg'
import voyage2 from '../assets/college/WhatsApp-Image-2024-01-26-à-14.43.35_c8a90139-150x150.jpg'
import voyage3 from '../assets/college/IMG-20240322-WA0038-150x150.jpg'
import voyage4 from '../assets/college/IMG-20240521-WA0036-150x150.jpg'
import pastorale1 from '../assets/college/la-pastorale-college-saint-antoine.jpg'
import pastorale2 from '../assets/college/eveil-religieux-college-st-antoine-02.jpg'
import pastorale3 from '../assets/college/pastorale-college-prive-bohain-en-vermandois.jpg'

const collegevideos = ['t06Vkn_MBOg', 'p0bWDXPcs7Y', 'FYhkP6UGMB0', 'RZHJoXyMwvk']
const clubvideo = ['p0bWDXPcs7Y']
const pastoralevideo = ['97VvGrjCwgw']
const skivideo = ['V8ckX7mYibM']
const images = [
  college,capture,bigchallenge,pelerinage,puydufou1,puydufou2,velovermand
]

function College() {

  const timetable = [
    ["Matières", "6ème", "5ème", "4ème", "3ème"],
    ["Français", "4,5 h", "4 h", "4 h", "4,5 h"],
    ["LCA", "—", "2 h", "3 h", "3 h"],
    ["Anglais", "4 h", "3 h", "3 h", "3 h"],
    ["LV 1 (Anglais – Allemand)", "6 h", "6 h", "—", "—"],
    ["LV2 en 4ème et 3ème (Allemand ou Espagnol)", "—", "—", "3 h", "3 h"],
    ["Histoire Géographie / Éducation Civique", "3 h", "3 h", "3 h", "3,5 h"],
    ["SVT", "1,5 h", "1,5 h", "1,5 h", "1,5 h"],
    ["Technologie", "2 h", "2 h", "1,5 h", "2 h"],
    ["Sciences physiques", "—", "1,5 h", "1,5 h", "2 h"],
    ["Arts plastiques", "1 h", "1 h", "1 h", "1 h"],
    ["Musique", "1 h", "1 h", "1 h", "1 h"],
    ["EPS", "4 h", "3 h", "3 h", "3 h"],
    ["Accompagnement personnalisé", "2 h", "2 h", "2 h", "2 h"]
  ]

  const pastoraletable = [
    ["Classes", "Activités obligatoires", "Activités facultatives"],
    ["6ème", "Culture religieuse : piste des religions et Kim et Noé", "Heureux d’espérer, heureux de grandir, heureux de croire, temps forts, Toussaint…"],
    ["5ème", "Les religions dans le monde, comment prient les croyants, en marche pèlerin, un trésor t’y attend, fraternité : tous frères…", "Temps forts, catéchèse, célébration de Noël, actions de solidarité, temps de prière…"],
    ["4ème", "Obligé d’obéir, puis-je avoir 349 amis ? Internet : un monde plus proche, faut-il pardonner ? Réagir à la violence ?…", "Temps forts et activités en fonction de l’année liturgique : mercredi des cendres…"],
    ["3ème", "Les médias disent-ils la vérité ? Quel avenir pour le monde ? Peut-on ignorer les religions ? Filles-garçons : sommes-nous égaux ?….", "Temps forts, confirmation, célébration de Noël, actions de solidarité, temps de prière…"],
  ]

  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

  return (
    <>

      {/* Top banner */}
      <div className="banner-image">
        <img src={banner} alt="Banner" />
      </div>

      <main className="college">

        <ImageGallery images={images} />

        <h1>Le collège Saint Antoine</h1>

        {/* Layout principal : contenu + menu */}
        <div className="content-layout">
          <div className="content-left">
            <VideoGrid videoIds={collegevideos} />

            {/* Sections avec ancres */}
            <section id="presentation" className="section-block presentation-section">
            <h2>Présentation</h2>
            <img src={specifite} className="presentation-image" />
               <h2>La vie au collège en images…</h2>
               <VideoGrid videoIds={skivideo} />
                <h2>Nos projets</h2>
                <div className="projects-section">Sorties éducatives ou pédagogiques :
                    <ul className="projects-list">
                      <li>Puy du fou en classe de 6ème</li>
                      <li>Ski en classe de 5ème</li>
                      <li>Rome en classe de 4ème</li>
                      <li>Mont Saint-Michel en classe de 3ème</li>
                      <li>Et bien d’autres encore…</li>
                    </ul>
                  </div>

                <div className="image-row responsive-gallery">
                  <img src={voyage1} alt="Puy du fou" />
                  <img src={voyage2} alt="Ski" />
                  <img src={voyage3} alt="Rome" />
                  <img src={voyage4} alt="Mont Saint-Michel" />
                </div>
              
            </section>

            {/* Tableau des horaires */}
            <section id="enseignements" className="timetable-section">
              
              <FlexTable
                id="enseignements"
                title="Enseignements dispensés par classe"
                data={timetable}
              />

              <h2>Nos formations au collège</h2>
              <FormationByLevel level="college" />


            </section>

            <section id="clubs" className="section-block clubs-section">
              <h2>Nos clubs</h2>

              <VideoGrid videoIds={clubvideo} />

              {/* Image cliquable */}
              <div className="clickable-image-container">
                <img 
                  src={planningclub}
                  alt="Planning-clubs" 
                  onClick={() => setIsLightboxOpen(true)} 
                  className="clickable-image"
                />
              </div>

              {/* Lightbox */}
              {isLightboxOpen && (
                <div 
                  className="lightbox-overlay" 
                  onClick={() => setIsLightboxOpen(false)}
                >
                  <img 
                    src={planningclub}
                    alt="Vue agrandie du planning des clubs" 
                    className="lightbox-image"
                  />
                </div>
              )}
            </section>

            <section id="pastorale" className="section-block">
              <h2>La pastorale</h2>
              <VideoGrid videoIds={pastoralevideo} />
              <div>
                <InfoSection
                  title="Catéchèse"
                  imageSrc={pastorale1}
                  imageAlt="Illustration catéchèse"
                  text="Notre volonté consiste d’aider chacun à grandir dans sa foi dans le respect des valeurs humaines de la religion catholique. Ainsi, nous proposons aux élèves volontaires de 6ème et 5ème des séances de catéchèse pour approfondir leur foi ancrée dans les valeurs chrétiennes."
                />
              </div>
              <div>
                <InfoSection
                  title="Eveil religieux"
                  imageSrc={pastorale2}
                  imageAlt="Illustration eveil religieux"
                  text="Tous les élèves de sixième et cinquième suivent régulièrement une sensibilisation au fait religieux. S’inscrivant dans les recommandations officielles, cette proposition n’a d’autre finalité que d’apporter aux jeunes quelques éléments qui leur permettront de mieux comprendre ce que notre société et notre culture doivent aux différentes religions.
                  Cet élargissement prolonge les notions abordées en cours de français et en histoire."
                />
              </div>
              <div>
                <InfoSection
                  title="Préparation à la profession de foi"
                  imageSrc={pastorale3}
                  imageAlt="Illustration profession de foi"
                  text="Le collège propose également, cette fois aux seuls volontaires, de se préparer à la profession de foi. Pour cela l’enfant doit être baptisé et avoir suivi les trois premières années de catéchisme. Éventuellement quelques jeunes qui ne remplissent pas ces conditions peuvent suivre cette catéchèse (une heure hebdomadaire). Ils utilisent le parcours diocésain Sel de Vie.
                  L’équipe d’animation pastorale est très attentive aux attentes des familles et des jeunes, en proposant un large choix d’actions qui permettent à chacun de s’épanouir et de faire grandir sa foi."
                />
              </div>

              <FlexTable
                id="enseignements-religieux"
                title="Enseignements religieux"
                data={pastoraletable}
              />
            </section>

            <section id="infos" className="info-section">
              <div className="title">Horaires de cours au Collège</div>
              
              <p><span className="icon">➡️</span> <span className="label">LUNDI, MARDI, JEUDI et VENDREDI :</span><br />
              de 08h40 à 12h35 et de 13h50 à 16h50</p>
              
              <p><span className="icon">➡️</span> <span className="label">MERCREDI :</span> de 08h40 à 12h35.</p>
              
              <p className="sub-title">Externat – ½ Pension</p>
              
              <div className="section">
                <div className="section-title">Procédure d’inscription</div>
                <p>
                  Fidèle à l’esprit des fondatrices du lycée, le collège accepte tous les élèves dont les parents acceptent le projet. Les pré-inscriptions sont prises au fur et à mesure des demandes.
                </p>
                <p>Si vous souhaitez inscrire votre enfant :</p>
                <ul>
                  <li><span className="icon">📞</span> Prenez contact avec le secrétariat afin de fixer le rendez-vous d’inscription.</li>
                  <li><span className="icon">⬇️</span> Téléchargez le dossier d’inscription qui est à remettre, complet, le jour de l’inscription.</li>
                </ul>
              </div>
              
              <div className="section">
                <div className="section-title">Transports Aisne</div>
                <p>
                  L’imprimé de demande de prise en charge de transport est remis aux familles courant mai. Cet imprimé est à compléter intégralement, et à nous retourner.
                </p>
                <p>
                  Suite à la décision du Conseil Général, les cartes de bus seront remises par l’établissement à la rentrée.<br />
                  Renseignements horaires sur le site <a href="http://www.aisne.com/Reseau-de-transport-de-l-Aisne" target="_blank" rel="noopener noreferrer">www.aisne.com/Reseau-de-transport-de-l-Aisne</a>
                </p>
                <div className="sub-section">
                  <div className="sub-section-title">Horaires des transports</div>
                  <ul>
                    <li>
                      <a href="/pdf/BOHAIN-BUSIGNY-HONNECHY-LE-CATEAU-TROISVILLES-soir.pdf" target="_blank" rel="noopener noreferrer" >
                        <span role="img" aria-label="bus" className="icon">🚍</span> BOHAIN BUSIGNY HONNECHY LE CATEAU TROISVILLES soir
                      </a>
                    </li>
                    <li>
                      <a href="/pdf/BOHAIN-CAUDRY-LIGNY-Soir.pdf" target="_blank" rel="noopener noreferrer" >
                        <span role="img" aria-label="bus" className="icon">🚍</span> BOHAIN CAUDRY LIGNY Soir
                      </a>
                    </li>
                    <li>
                      <a href="/pdf/HONNECHY-LE-CATEAU-TROISVILLES-matin.pdf" target="_blank" rel="noopener noreferrer" >
                        <span role="img" aria-label="bus" className="icon">🚍</span> HONNECHY LE CATEAU TROISVILLES matin
                      </a>
                    </li>
                    <li>
                      <a href="/pdf/LIGNY-CAUDRY-BOHAIN.pdf" target="_blank" rel="noopener noreferrer" >
                        <span role="img" aria-label="bus" className="icon">🚍</span> LIGNY CAUDRY BOHAIN
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="section">
                <div className="section-title">Aides financières</div>
                <ul>
                  <li>
                    <span className="label">Bourse collège</span><br />
                    La demande de bourse collège est à renouveler chaque année.<br />
                    Les dossiers sont remis début septembre.<br />
                    Les dossiers de bourses collège complets seront déposés au secrétariat du collège pour fin septembre.
                  </li>
                  <li>
                    <span className="label">Bourse départementale</span><br />
                    Le conseil général de l’Aisne accorde une bourse départementale aux élèves de collège suivant les ressources des familles afin de les aider à acquitter les frais de demi-pension.<br />
                    Les dossiers sont à retirer au secrétariat du collège dès la rentrée et à rendre pour le 15 octobre.
                  </li>
                </ul>
              </div>
            </section>

            <section id="inscription" className="inscription-section">
              <img src={inscription} className="inscription-banner"/>
              <div className="section">
              <a className="inscription-link" href="/pdf/doc1_fiche_pre_inscription_25_26.pdf" target="_blank" rel="noopener noreferrer">
                Fiche de Pré Inscription
              </a>
              </div>
            </section>

          </div>

          <nav className="anchor-menu">
            <ul>
              <li><a href="#presentation">Présentation</a></li>
              <li><a href="#enseignements">Enseignements</a></li>
              <li><a href="#clubs">Clubs</a></li>
              <li><a href="#pastorale">La Pastorale</a></li>
              <li><a href="#infos">Informations pratiques</a></li>
              <li><a href="#inscription">Inscription</a></li>
            </ul>
          </nav>
        </div>
      </main>
    </>

  )
}

export default College