import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  
  // State to manage the "Wish Now" button click
  const [isWished, setIsWished] = useState(false);

  const handleWishClick = () => {
    setIsWished(true);
    setTimeout(()=>setIsWished(false),3000)
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        {/* Left Card - Important News */}
        <div className="col-lg-4 col-md-6 mb-5">
          <div className="card h-100 shadow-lg" style={{ minHeight: '400px' }}>
            <div className="card-body d-flex flex-column">
              <h5 className="card-title text-center mb-4">📰 Important News</h5>
              <p className="card-text mb-4">
                Stay updated with the latest news and announcements. Don't miss out on any important updates from our community.
              </p>
              <div className="mt-auto d-flex justify-content-center">
                <button className="btn btn-primary btn-lg" onClick={() => navigate('/news')}>
                  View News
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Card - Wishing Birthdays */}
        <div className="col-lg-4 col-md-6 mb-5">
          <div className="card h-100 shadow-lg" style={{ minHeight: '400px' }}>
            <div className="card-body d-flex flex-column align-items-center">
              <h5 className="card-title text-center mb-4">🎂 Happy Birthdays</h5>
              
              {/* Dummy Image for Birthday */}
              <img
                src="https://via.placeholder.com/150"
                alt="Birthday Person"
                className="rounded-circle mb-3"
                style={{ width: '150px', height: '150px', objectFit: 'cover' }}
              />

              {/* Birthday Person's Name */}
              <div className="text-center mb-4">
                <h6 className="text-uppercase fw-bold" style={{ color: '#ff6f61' }}>John Doe</h6>
                <p style={{ fontStyle: 'italic', color: '#777' }}>Let's wish him a great day!</p>
              </div>

              {/* Conditional Button/Message */}
              <div className="mt-auto d-flex justify-content-center">
                {!isWished ? (
                  <button className="btn btn-success btn-lg" onClick={handleWishClick}>
                    Wish Now
                  </button>
                ) : (
                  <div className="text-center">
                    <h5 className="text-success">Thanks for your wishes! 🎉😊</h5>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Card - Upcoming Events */}
        <div className="col-lg-4 col-md-6 mb-5">
          <div className="card h-100 shadow-lg" style={{ minHeight: '400px' }}>
            <div className="card-body d-flex flex-column">
              <h5 className="card-title text-center mb-4">🎉 Upcoming Events</h5>
              <p className="card-text mb-4">
                Discover upcoming events and activities in our village. Be a part of the excitement and fun!
              </p>
              <div className="mt-auto d-flex justify-content-center">
                <button className="btn btn-warning btn-lg" onClick={() => navigate('/events')}>
                  Explore Events
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
