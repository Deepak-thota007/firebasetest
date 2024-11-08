import React, { useEffect, useState, useRef } from 'react';
import app from '../firebaseConfig';
import { getDatabase, ref, get , remove} from 'firebase/database';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function Read() {
  const [data, setData] = useState([]);
  const toastCalledRef = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching data...");
      try {
        const db = getDatabase(app);
        const dbRef = ref(db, 'person/details');
        const snapshot = await get(dbRef);

        if (snapshot.exists()) {
            console.log("snapshot data",Object.entries(snapshot.val()));
          const fetchedData = Object.entries(snapshot.val()).map(([id, details]) => ({
            ...details,
            id, 
        }));
          setData(fetchedData);
          console.log("==============",fetchedData)
        //   if (!toastCalledRef.current) {  // Check if toast has been shown
        //     toast.success('Data fetched successfully!', { position: 'top-right' });
        //     toastCalledRef.current = true;  // Mark toast as called
        //   }
        } else {
          if (!toastCalledRef.current) {
            toast.error('No data available', { position: 'top-right' });
            toastCalledRef.current = true;  // Mark toast as called
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        if (!toastCalledRef.current) {
          toast.error('Data fetching failed', { position: 'top-right' });
          toastCalledRef.current = true;  // Mark toast as called
        }
      }
    };

    fetchData();
  }, []);  

  async function handleRemove(id) {
    const db = getDatabase(app);
    const dbRef = ref(db, `person/details/${id}`);
    try {
      await remove(dbRef);
      toast.success('Data deleted successfully!', { position: 'top-right' });
      // Refresh the data after deletion
      setData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error deleting data:', error);
      toast.error('Failed to delete data', { position: 'top-right' });
    }
  }

  return (
    <div className="container-fluid min-vh-100 d-flex flex-column mt-5 align-items-center">
      {/* Use row to create a flex container for the cards */}
      <div className="row w-75">
        {data.map((item, index) => (
          // Each card is in a col-md-4 column, which will make 3 cards per row
          <div className="col-md-4 mb-4" key={index}>
            <div className="card" style={{ height: '350px' }}>
              {/* Card Header with Name and Photo */}
              <div className="card-header d-flex align-items-center">
                {item.photoURL ? (
                  <img 
                    src={item.photoURL} 
                    alt="Profile" 
                    style={{ width: '60px', height: '60px', objectFit: 'cover' }} 
                    className="rounded-circle me-3"
                    onError={() => console.error(`Failed to load image from ${item.photoURL}`)}
                  />
                ) : (
                  <div 
                    style={{ width: '60px', height: '60px', backgroundColor: '#ccc' }} 
                    className="rounded-circle me-3"
                  />
                )}
                <h5 className="card-title mb-0">{item.firstName} {item.lastName}</h5>
              </div>

              {/* Card Body with Details */}
              <div className="card-body custom-scrollbar" style={{ overflowY: 'auto', maxHeight: '220px' }}>
                <p className="card-text"><strong>Education:</strong> {item.education}</p>
                <p className="card-text"><strong>Date of Birth:</strong> {item.dateOfBirth}</p>
                <p className="card-text"><strong>Gender:</strong> {item.gender}</p>
                <p className="card-text"><strong>Blood Group:</strong> {item.bloodGroup}</p>
                <p className="card-text"><strong>Address:</strong> {item.address}</p>
                <p className="card-text"><strong>Father's Name:</strong> {item.fatherName}</p>
                <p className="card-text"><strong>Email ID:</strong> {item.mailId}</p>
              </div>
              <div className="card-footer d-flex align-items-center justify-content-center">
                <button className='btn btn-primary' onClick={()=>navigate(`/update/${item.id}`)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
  <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
</svg>Update</button>
                <button className='btn btn-danger mx-4' onClick={()=>handleRemove(item.id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
</svg> Delete</button>

                </div>
            </div>
          </div>
        ))}
      </div>

      <button
        className="btn btn-primary mt-4"
        onClick={() => navigate('/')}
      >
        Back to Home
      </button>
    </div>
  );
}

export default Read;
