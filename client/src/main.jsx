import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './styles/main.scss'
import MyRouter from './MyRouter.jsx'
import { ScrollProvider } from './context/ScrollContext.jsx'
import { AuthController } from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <ScrollProvider>
    <BrowserRouter>
      <AuthController>
        <MyRouter/>
      </AuthController>
    </BrowserRouter>
  </ScrollProvider>,
)
