import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Home() {
    
    const navigate = useNavigate();

    const enroll = () => {
        navigate('/enroll');
    }

    const attendance = () => {
        navigate('/mark_attendance');
    }
  return (
    <div>
        <div
            className="hero min-h-screen"
            style={{
                backgroundImage: "url(https://t4.ftcdn.net/jpg/03/98/29/15/360_F_398291575_KUXiO7ZPPF7BhkZK6t9vswc8beQ09xYK.jpg)"
            }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-neutral-content text-center">
                <div className="max-w-md">
                    <h1 className="mb-5 text-white text-5xl font-bold">Welcome to SAM</h1>
                    <p className="mb-5 text-white">
                        A Smart Attendance Manager that helps you to mark your attendance with ease.
                    </p>
                    <button className="btn m-5 btn-info" onClick={enroll}>Enroll Yourself</button>
                    <button className="btn m-5 btn-info">Update Your Profile</button>
                    <button className="btn m-5 btn-info" onClick={attendance}>Mark Your Attendance</button>
                    
                </div>
            </div>
        </div>
    </div>
  )
}
