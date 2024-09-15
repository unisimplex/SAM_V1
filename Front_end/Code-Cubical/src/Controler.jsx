import React from 'react'
import { Route, Router, Routes } from 'react-router-dom'
import Home from './Home'
import Enroll from './Enroll'
import App from './App'

export default function Controler() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/enroll' element={<Enroll/>}/>
        <Route path='/mark_attendance' element={<App/>}/>
      </Routes>
    </div>
  )
}
