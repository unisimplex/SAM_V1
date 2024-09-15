import { useCallback, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';

function App() {
  const webcam = useRef(null);
  const [url, setURL] = useState(null);
  const [loading, setLoading] = useState(false);

  const capture = useCallback(async () => {
    const imageSRC = webcam.current.getScreenshot();
    setURL(imageSRC);

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
        alert(response.data.message);

      } catch (error) {
        console.error("There was an error processing the image!", error);
        alert("Error processing the image!");
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

  return (
    <div>
      {!url && (
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
              <button className="btn btn-primary" onClick={capture}>
                {loading ? 'Processing...' : 'Start Scanning'}
              </button>
            </div>
          </div>
        </div>
      )}
      {url && (
        <div className="flex card bg-base-100 w-full shadow-xl">
          <figure className="mt-10">
            <img src={url} alt="captured" />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">Processing...</h2>
            <div className="card-actions mt-5">
              <button className="btn btn-primary" onClick={recapture}>
                Retry
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
