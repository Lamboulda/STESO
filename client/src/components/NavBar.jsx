import { Link } from "react-router"
import { useContext, useState } from "react"
import { ScrollContext } from "../context/ScrollContext"
import { AuthContext } from "../context/AuthContext"

const NavBar = () => {
  const { scrolled } = useContext(ScrollContext)
  const { isAuthenticated, handleLogout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLinkClick = () => {
    setMenuOpen(false)
  }

  return (
    <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="navbar__container">
        <Link to="/" className="navbar__logo">
          Accueil
        </Link>

        <button
          className={`navbar__toggle ${menuOpen ? "is-active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span className="navbar__toggle-bar"></span>
          <span className="navbar__toggle-bar"></span>
          <span className="navbar__toggle-bar"></span>
        </button>

        <div className={`navbar__menu ${menuOpen ? "is-active" : ""}`}>
          <Link to="/college" className="navbar__link" onClick={handleLinkClick}>
            Collège
          </Link>
          <Link to="/lyceepro" className="navbar__link" onClick={handleLinkClick}>
            Lycée professionnel
          </Link>
          <Link to="/lyceegen" className="navbar__link" onClick={handleLinkClick}>
            Lycée Général et Technologique
          </Link>
          <Link to="/essup" className="navbar__link" onClick={handleLinkClick}>
            Enseignement Supérieur
          </Link>
          <Link to="/centre" className="navbar__link" onClick={handleLinkClick}>
            Centre de formations alternance
          </Link>
          {!isAuthenticated ? (
            <Link to="/login" className="navbar__link" onClick={handleLinkClick}>
              Se connecter
            </Link>
          ) : (
            <>
              <Link to="/profil" className="navbar__link" onClick={handleLinkClick}>
                Mon Profil
              </Link>
              <Link to="/alumni" className="navbar__link" onClick={handleLinkClick}>
                Liste utilisateurs
              </Link>
              <button className="navbar__link navbar__link--button" onClick={handleLogout}>
                Se déconnecter
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default NavBar