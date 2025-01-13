import React from 'react';
import { Link } from 'react-router-dom';
import zlogo from '../../../assets/images/zlogo.png';
import '../Styles/HeaderMain.css';

const HeaderMain = () => {
  return (
    <div className="header-wrapper">
      {/* Top navigation */}
      <div className="top-nav">
        <div className="nav-content">
          <div className="left-nav">
            <Link to="/">
              <img src={zlogo} alt="Z Energy Logo" className="logo" />
            </Link>
            <div className="segment-buttons">
              <button className="segment active">For personal</button>
              <button className="segment">For business</button>
            </div>
          </div>
          <div className="right-nav">
            <Link to="/app" className="nav-link">Z App</Link>
            <Link to="/about" className="nav-link">About Z</Link>
            <button className="search-button">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z" fill="currentColor"/>
              </svg>
            </button>
            <Link to="/login" className="login-button">
              Login
              <span className="arrow">→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom navigation */}
      <div className="bottom-nav">
        <div className="nav-content">
          <div className="main-nav">
            <button className="nav-item">At the station <span>▼</span></button>
            <button className="nav-item">Power <span>▼</span></button>
            <button className="nav-item">Rewards and promotions <span>▼</span></button>
          </div>
          <Link to="/locate" className="locate-button">
            Locate Z Station
            <span className="arrow">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeaderMain;
