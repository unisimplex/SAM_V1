import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Controler from './Controler.jsx'
import { BrowserRouter, useNavigate } from 'react-router-dom'
import Nav from './Nav.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Nav/>
    <BrowserRouter>
      <Controler/>
    </BrowserRouter>
    {/* <App /> */}
    {/* <CameraComponent/> */}
    {/* <Enroll/> */}
    {/* <Home/> */}
    {/* <Controler/> */}
  </StrictMode>,
)