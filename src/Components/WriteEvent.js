import { useState } from 'react';
import app from "../firebaseConfig";
import { getDatabase, ref, set, push } from 'firebase/database';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const WriteEvent = () => {
  const [formData, setFormData] = useState({
    eventName: "",
    eventDate: "",
    location: "",
    description: "",
    organizer: "",
  });

  const navigate = useNavigate();

  const handleViewData = () => {
    navigate('/');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { eventName, eventDate, location, description, organizer } = formData;

    if (!eventName || !eventDate || !location || !description || !organizer) {
      toast.error('Please fill in all fields', { position: "top-right" });
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    if (eventDate < today) {
      toast.error('Event date cannot be in the past', { position: "top-right" });
      return;
    }

    try {
      const db = getDatabase(app);
      const newEventRef = push(ref(db, 'events')); // Automatically generate a new ID for the event

      await set(newEventRef, {
        eventName,
        eventDate,
        location,
        description,
        organizer,
      });

      toast.success('Event created successfully!', { position: "top-right" });

      // Reset form after successful submission
      setFormData({
        eventName: "",
        eventDate: "",
        location: "",
        description: "",
        organizer: "",
      });
    } catch (error) {
      console.error('Error writing event: ', error);
      toast.error('Failed to create event', { position: "top-right" });
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="card p-3" style={{ width: '100%', maxWidth: '500px' }}>
        <div className="d-flex justify-content align-items-center mb-4">
          <button className="btn btn-secondary" onClick={handleViewData}>Back to Home</button>
          <h2 className="mb-1 mx-5">Enter Event Details</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Event Name"
              name="eventName"
              value={formData.eventName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="date"
              className="form-control"
              name="eventDate"
              value={formData.eventDate}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]} // Prevent selecting past dates
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
          </div>
          <div className="form-group mb-3">
            <textarea
              className="form-control"
              placeholder="Event Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div className="form-group mb-3">
          <input
              type="text"
              className="form-control"
              placeholder="organizer"
              name="organizer"
              value={formData.organizer}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default WriteEvent;
