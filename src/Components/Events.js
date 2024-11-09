import React, { useEffect, useState, useRef } from 'react';
import app from '../firebaseConfig';
import { getDatabase, ref, get, remove } from 'firebase/database';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function Events() {
  const [eventsData, setEventsData] = useState([]);
  const toastCalledRef = useRef(false);
  const navigate = useNavigate();

  // Fetch Events Data from Firebase
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const db = getDatabase(app);
        const dbRef = ref(db, 'events');
        const snapshot = await get(dbRef);

        if (snapshot.exists()) {
          const fetchedEvents = Object.entries(snapshot.val()).map(([id, details]) => ({
            ...details,
            id,
          }));
          setEventsData(fetchedEvents);
        } else {
          if (!toastCalledRef.current) {
            toast.error('No events available', { position: 'top-right' });
            toastCalledRef.current = true;
          }
        }
      } catch (error) {
        console.error('Error fetching events:', error);
        if (!toastCalledRef.current) {
          toast.error('Failed to fetch events', { position: 'top-right' });
          toastCalledRef.current = true;
        }
      }
    };

    fetchEvents();
  }, []);

  // Handle Event Deletion
  async function handleRemoveEvent(id) {
    const db = getDatabase(app);
    const dbRef = ref(db, `events/${id}`);
    try {
      await remove(dbRef);
      toast.success('Event deleted successfully!', { position: 'top-right' });
      setEventsData((prevData) => prevData.filter((event) => event.id !== id));
    } catch (error) {
      console.error('Error deleting event:', error);
      toast.error('Failed to delete event', { position: 'top-right' });
    }
  }

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">🎉 Upcoming Events</h2>

      {/* Events Table */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              <th>Event Name</th>
              <th>Date</th>
              <th>Place</th>
              <th>Organizer</th>
            </tr>
          </thead>
          <tbody>
            {eventsData.length > 0 ? (
              eventsData.map((event) => (
                <tr key={event.id}>
                  <td>{event.eventName}</td>
                  <td>{event.eventDate}</td>
                  <td>{event.location}</td>
                  <td>
                  {event.organizer}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  No events found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Back to Home Button */}
      <div className="d-flex justify-content-center">
        <button className="btn btn-primary mt-4" onClick={() => navigate('/')}>
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default Events;
