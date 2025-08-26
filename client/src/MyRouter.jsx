import './styles/main.scss'
import { Route, Routes} from "react-router"
import { useContext } from 'react'
import App from "./App.jsx"
import { AuthContext } from "./context/AuthContext"
import NavBar from "./components/NavBar"
import Footer from "./components/Footer"
import College from "./pages/College.jsx"
import Login from "./pages/Login.jsx"
import Register from './pages/Register.jsx'
import Contact from './pages/Contact.jsx'
import InfosComplementaires from './pages/InfosComplementaires.jsx'
import MentionsLegales from './pages/MentionsLegales.jsx'
import Profil from './pages/Profil.jsx'
import Alumni from './pages/Alumni.jsx'
import AdminActions from './pages/AdminActions.jsx'

const MyRouter = () => {

    const {isAuthenticated} = useContext(AuthContext)

    return(
        <>
            <NavBar />
            <Routes >
                    <Route path="/" element={<App />}/>
                    <Route path="/college" element={<College />}/>
                    <Route path="/login" element={<Login />}/>
                    <Route path="/register" element={<Register />}/>
                    <Route path="/profil" element={<Profil />} />
                    <Route path='*' element={<p>404 Not found</p>}/>
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/alumni" element={<Alumni />} />
                    <Route path="/admin-actions" element={<AdminActions />} />
                    <Route path="/infos-complementaires" element={<InfosComplementaires />} />
                    <Route path="/mentions-legales" element={<MentionsLegales />} />
            </Routes>
            <Footer />
    </>)
}

export default MyRouter
