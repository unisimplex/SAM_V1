import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Nav() {
    // const navigate = useNavigate();
    // const home = () => {
    //     navigate('/');
    // }
  return (
    <div className="navbar bg-info text-primary-content">
        <button className="btn btn-ghost text-xl text-white">Smart Attendance Manager</button>
    </div>
  )
}
