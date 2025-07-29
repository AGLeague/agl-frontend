import React from 'react';
import { Link } from 'react-router-dom';

const Navigation: React.FC = () => {
  return (
    <nav className="navigation">
      <img src="/agl-frontend/AGL_FF_2.png" alt="Arena Gauntlet League" className="logo flex flex-left " />
      <ul className="float-right flex flex-right">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/achievements">Achievements</Link>
        </li>
        <li>
          <Link to="/stats">Stats</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation; 