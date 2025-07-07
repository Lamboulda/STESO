import VideoGrid from "./components/VideoGrid"
import banner from './assets/logo-header.png'

function App() {

  const accueilvideos= ['QKvAvCcIqAg'];

  return (
    <>

      {/* Top banner */}
      <div className="banner-image">
        <img src={banner} alt="Banner" />
      </div>

      <main className="app">
        <h1>Ensemble St-Antoine Ste-Sophie</h1>
        <h3>Qui sommes-nous ?</h3>

        <VideoGrid videoIds={accueilvideos} />

        <section className="opening">
          <p>
            Les Dames Auxiliatrices de l’Immaculée Conception ont été fondées en 1855, [...].
          </p>
          <p>
            Notre établissement scolaire a été voulu et créé en 1941 [...].
          </p>
          <p>
            Le Projet Educatif est le projet de tout l’établissement [...].
          </p>
        </section>

        <section className="moto">
          <h4>A la lumière de l’Évangile, nous souhaitons :</h4>
          <ul>
            <li>
              <span className="moto-title">Accueillir</span>
              <p>
                Chaque personne est unique, dans son originalité, avec ses forces et ses faiblesses. Nous accueillons chacun avec bienveillance et équité.
              </p>
            </li>
            <li>
              <span className="moto-title">Former</span>
              <p>
                Par notre transmission des savoirs, des savoir-faire et notre croyance en un savoir-être, chacun grandit et développe la relation aux autres. Nous souhaitons former « des femmes et des hommes debout ».
                <em>cf Charte de l’Enseignement Catholique de l’Aisne</em>
              </p>
            </li>
            <li>
              <span className="moto-title">Accompagner</span>
              <p>
                Nous souhaitons former des femmes et des hommes empathiques, tournés vers les autres. Nous visons à développer les richesses de chacun et à porter, ensemble, un regard d’espérance sur le monde.
              </p>
            </li>
            <li>
              <span className="moto-title">Valoriser</span>
              <p>
                « Le sommet du courage est d’accepter sa vulnérabilité », on ne peut accepter les autres sans s’accepter soi-même, on ne peut aimer les autres sans s’aimer soi-même.
              </p>
            </li>
            <li>
              <span className="moto-title">Respecter</span>
              <p>
                Nous croyons que la courtoisie, la politesse, l’honnêteté, le sens de la vérité, le regard positif sont des attitudes nobles qui construisent, font grandir et sont à transmettre et à développer.
              </p>
            </li>
            <li>
              <span className="moto-title">Épanouir</span>
              <p>
                Nous croyons que l’épanouissement se construit pas à pas. Nous œuvrons pour que les jeunes qui nous sont confiés apprennent à se connaître, à discerner leurs talents et à s’épanouir. Que cet épanouissement se réalise au fil des rencontres dans le but du plus grand bien, dans un esprit de service le plus universel.
              </p>
            </li>
          </ul>

          <p className="citation">
            « Et toi, que veux-tu que je fasse pour toi ? »<br />
            <em>Évangile de Jésus Christ selon saint Marc 10,46-52.</em>
          </p>
        </section>
      </main>

    </>
  )
}

export default App
