import { Link } from 'react-router-dom'
import { FaFacebook, FaInstagram } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import logo from '../assets/logo.png'

const Footer = () => {

  const [year, setYear] = useState(null)

  useEffect(() => {
    setYear(new Date().getFullYear())
  }, [])

  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Logo */}
        <div className="footer-logo">
            <img src={logo} alt="Logo du site" />
        </div>

        {/* Localisation */}
        <div className="footer-location">
            <h4>Adresse</h4>
            <p>22 rue Curie</p>
            <ul>
              <li>02110 BOHAIN-EN-VERMANDOIS</li>
              <li>Tél. : 03 23 07 53 53 </li>
              <li>E-mail : contact@edu-steso.fr</li>
            </ul>
        </div>

        {/* Réseaux sociaux */}
        <div className="footer-socials">
          <h4>Suivez-nous</h4>
          <ul>
            <li><a href="https://www.facebook.com/StAntoinestesophie/" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebook size={24} /></a></li>
            <li><a href="https://www.instagram.com/stantoinestesophie/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram size={24} /></a></li>
          </ul>
        </div>

        {/* Liens utiles */}
        <div className="footer-infos">
          <ul>
            <li><Link to="/contact">Nous contacter</Link></li>
            <li><Link to="/infos-complementaires">Informations complémentaires</Link></li>
            <li><Link to="/mentions-legales">Mentions légales</Link></li>
          </ul>
        </div>

      </div>

      {/* Bas de page */}
      <div className="footer-bottom">
        <p>© {year ? year : ''} Ensemble Scolaire Saint Antoine - Sainte Sophie</p>
      </div>
    </footer>
  )
}

export default Footer