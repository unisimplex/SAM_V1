import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Controler from './Controler.jsx'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className="navbar bg-info text-primary-content">
        <button className="btn btn-ghost text-xl text-white">Smart Attendance Manager</button>
    </div>
    <BrowserRouter>
      <Controler/>
    </BrowserRouter>
  </StrictMode>,
)