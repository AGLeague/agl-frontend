import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="page-container">
      <div className="home-content">
        <div className="hero-section">
          <h1>Welcome to the Arena Gauntlet League</h1>
          <p className="hero-subtitle">
            The AGL personal achievement gallery and stats website! Check your achievements here. Made with love by Bob P, John D, Stephen H, Caleb K, and the AGL League Committee!
          </p>
        </div>
        
        <div className="features-section">
          <div className="feature-card">
            <h3>📊 Player Statistics</h3>
            <p>Track performance metrics, rankings, and detailed analytics for all AGL competitors.</p>
            <Link to="/stats" className="feature-link">View Stats →</Link>
          </div>
          
          <div className="feature-card">
            <h3>🏆 Achievements</h3>
            <p>Explore the complete collection of achievements earned by players across all seasons.</p>
            <Link to="/achievements" className="feature-link">Browse Achievements →</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 