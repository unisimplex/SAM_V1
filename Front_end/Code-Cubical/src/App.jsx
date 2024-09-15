import { useCallback, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();

  const webcam = useRef(null);
  const [url, setURL] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const capture = useCallback(async () => {
    const imageSRC = webcam.current.getScreenshot();
    setURL(imageSRC);
    
    // setData(1);
    if (imageSRC) {
      setLoading(true);
      const imageBlob = dataURLtoBlob(imageSRC);

      const formData = new FormData();
      formData.append('image', imageBlob, 'captured_image.jpg');

      try {
        const response = await axios.post('http://localhost:5000/recognize', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(response.data);
        if(response.data){
          setData(1);
        }
        // alert(response.data.message);

      } catch (error) {
        console.error("There was an error processing the image!", error);
        // alert("Error processing the image!");
        setData(0);
      } finally {
        setLoading(false);
      }
    }
  }, [webcam]);

  const recapture = () => {
    setURL(null);
  };

  const onUserMedia = (e) => {
    console.log(e);
  };

  const goHome = () => {
    navigate('/');
  }
  const dataURLtoBlob = (dataURL) => {
    const byteString = atob(dataURL.split(',')[1]);
    const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };
  if(data===1){
    return(
      <div>
        <div className="hero bg-base-200 min-h-screen">
          <div className="hero-content flex-col lg:flex-row">
            <img
              src={url}
              className="max-w-sm rounded-lg shadow-2xl" />
            <div>
              <h1 className="text-5xl font-bold">{response.data.name}</h1>
              <p className="py-6 text-green-500">
                Attendance Marked Successfully
              </p>
              <button className="btn btn-info" onClick={goHome}>Go Back to Home Screen</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
  if(data===0){
    return(
      <div>
        <div className="hero bg-base-200 min-h-screen">
          <div className="hero-content flex-col lg:flex-row">
            <img
              src={url}
              className="max-w-sm rounded-lg shadow-2xl" />
            <div>
              {/* <h1 className="text-5xl font-bold">{response.data.name}</h1> */}
              <p className="py-6 text-red-500">
                Attempt Unsuccessfully
              </p>
              <button className="btn btn-info" onClick={goHome}>Go Back to Home Screen</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div>
        <div className="flex card bg-base-100 w-full shadow-xl">
          <figure className="mt-10">
            <Webcam
              ref={webcam}
              audio={false}
              screenshotFormat="image/jpeg"
              onUserMedia={onUserMedia}
            />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">Mark Your Attendance</h2>
            <div className="card-actions mt-5">
              <button className="btn btn-info" onClick={capture}>
                {loading ? 'Processing...' : 'Start Scanning'}
              </button>
            </div>
          </div>
        </div>
    </div>
  );
}

export default App;
