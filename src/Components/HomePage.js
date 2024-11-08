import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {

    const navigate = useNavigate();

    const handleViewData = () => {
      navigate('/write');
    };
  return (
    <div className="container-fluid">
      {/* Header Section */}
      <header className="bg-dark text-white p-3 d-flex align-items-center">
        <i className="bi bi-shop fs-2 me-3"></i>
        <h1 className="m-0">Shopping Website</h1>
      </header>
    <div className="container my-5">
      <div className="row">
        {/* Card 1 */}
        <div className="col-md-4 mb-4">
          <div className="card">
            
            <div className="card-body">
              <h5 className="card-title">Card Title 1</h5>
              <p className="card-text">
                This is some dummy text for the first card. You can replace it with your content.
              </p>
              <button  className="btn btn-primary d-flex justify-content-center align-items-center" onClick={()=>navigate('/write')}>Register Here..</button>
            </div>
          </div>
        </div>
        {/* View data card */}
        <div className="col-md-4 mb-4">
          <div className="card">
            
            <div className="card-body">
              <h5 className="card-title">Card Title 1</h5>
              <p className="card-text">
                This is some dummy text for the first card. You can replace it with your content.
              </p>
              <button  className="btn btn-primary d-flex justify-content-center align-items-center" onClick={()=>navigate('/read')}>View Data</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default HomePage;
