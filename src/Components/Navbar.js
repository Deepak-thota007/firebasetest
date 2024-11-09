import React from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">ᗝᑌᖇ ᐯIᒪᒪᗩᘜᗴ</a>
            <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse mx-5" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto d-flex w-100 justify-content-around">
                    <li className="nav-item flex-fill text-center cursor-pointer">
                        <a className="nav-link" onClick={() => navigate('/')}>
                            Home 
                        </a>
                    </li>
                    <li className="nav-item flex-fill text-center cursor-pointer">
                        <a className="nav-link" onClick={() => navigate('/read')}>
                            View
                        </a>
                    </li>
                    <li className="nav-item flex-fill text-center cursor-pointer">
                        <a className="nav-link" onClick={() => navigate('/read')}>
                            Contacts
                        </a>
                    </li>
                    <li className="nav-item flex-fill text-center cursor-pointer">
                        <a className="nav-link" onClick={() => navigate('/read')}>
                            Complaints
                        </a>
                    </li>
                </ul>

                <form className="d-flex ms-auto">
                    <input
                        className="form-control me-2"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                    />
                    <button className="btn btn-outline-success" type="submit">
                        Search
                    </button>
                </form>
            </div>
        </nav>
    );
}

export default Navbar;
