import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
//import CameraComponent from './AppPro.jsx'
import Enroll from './Enroll.jsx'
import Controler from './Controler.jsx'
import Home from './Home.jsx'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className="navbar bg-info text-primary-content">
        <button className="btn btn-ghost text-xl text-white">Smart Attendance Manager</button>
    </div>
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