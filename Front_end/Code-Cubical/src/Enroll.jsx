import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Enroll() {
    const navigate = useNavigate();

    const [name, setName] = React.useState('');
    const [rollNumber, setRollNumber] = React.useState('');
    const [course, setCourse] = React.useState('');
    const [year, setYear] = React.useState('');
    const [section, setSection] = React.useState('');
    const [file, setFile] = React.useState(null); // File input should be initialized to null, not an empty string

    const btnClick = async () => {
        if (name === '' || rollNumber === '' || course === '' || year === '' || section === '' || !file) {
            alert('Please fill all the fields');
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('roll_number', rollNumber);
        formData.append('course', course);
        formData.append('year', year);
        formData.append('section', section);
        formData.append('image', file); // Append the file

        try {
            const response = await axios.post('http://localhost:5000/api/enroll', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert("Enrolled Successfully: " + response.data.message);
        } catch (error) {
            console.error('Error enrolling:', error);
            alert('Failed to enroll');
        }
    };

    const goHome = () => {
        navigate('/');
    };
    
    return (
        <div>
            <div className="card bg-base-100 w-full ">
                <div className="card-body items-center text-center">
                    <h2 className="card-title">Enrollment</h2>
                    <div className="card-actions">
                        <div className="card bg-base-100 w-96 shadow-xl">
                            <div className="card-body items-center text-center">
                                <input
                                    type="text"
                                    placeholder="Name"
                                    onChange={(e) => setName(e.target.value)}
                                    className="mb-5 input input-bordered input-info w-full max-w-xs"
                                />
                                <input
                                    type="text"
                                    placeholder="Roll Number"
                                    onChange={(e) => setRollNumber(e.target.value)}
                                    className="mb-5 input input-bordered input-info w-full max-w-xs"
                                />
                                <input
                                    type="text"
                                    placeholder="Course"
                                    onChange={(e) => setCourse(e.target.value)}
                                    className="mb-5 input input-bordered input-info w-full max-w-xs"
                                />
                                <input
                                    type="text"
                                    placeholder="Year"
                                    onChange={(e) => setYear(e.target.value)}
                                    className="mb-5 input input-bordered input-info w-full max-w-xs"
                                />
                                <input
                                    type="text"
                                    placeholder="Section"
                                    onChange={(e) => setSection(e.target.value)}
                                    className="mb-5 input input-bordered input-info w-full max-w-xs"
                                />
                                <input
                                    type="file"
                                    onChange={(e) => setFile(e.target.files[0])} // Change to handle the file object
                                    className="mb-5 file-input file-input-bordered file-input-info w-full max-w-xs"
                                />
                                <div className="card-actions">
                                    <button className="btn btn-info" onClick={btnClick}>Enroll Your Self</button>
                                </div>
                                <button className="btn btn-info" onClick={goHome}>Go Back To Home Page</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
