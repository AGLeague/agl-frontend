import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="page-container">
      <div className="home-content">
        <div className="hero-section">
          <h1>Welcome to the Arena Gauntlet League</h1>
          <p className="hero-subtitle">
            Your premier destination for competitive gaming statistics, achievements, and community insights
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
          
          <div className="feature-card">
            <h3>🎮 Competitive Gaming</h3>
            <p>Join the Arena Gauntlet League community and compete at the highest level.</p>
            <div className="feature-link">Coming Soon</div>
          </div>
        </div>
        
        <div className="about-section">
          <h2>About the Arena Gauntlet League</h2>
          <p>
            The Arena Gauntlet League (AGL) is a premier competitive gaming organization dedicated to 
            fostering excellence, sportsmanship, and community in the gaming world. Our platform provides 
            comprehensive tools for tracking player performance, celebrating achievements, and building 
            connections within our growing community.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home; 