import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Welcome to Team Kanya Raasi</h1>
        <p className="home-description">
          Meet our amazing team members. Learn about their skills, roles, and the projects they're working on.
        </p>
        <div className="home-buttons">
          <Link to="/members" className="btn btn-primary home-btn">
            View Team Members
          </Link>
          <Link to="/add" className="btn btn-success home-btn">
            Add New Member
          </Link>
        </div>
      </div>
      <div className="home-features">
        <div className="feature-card">
          <h3>Manage Profiles</h3>
          <p>Create and manage detailed profiles for each team member including their role, contact information, and bio.</p>
        </div>
        <div className="feature-card">
          <h3>Track Skills</h3>
          <p>Keep track of each member's skills and expertise to better allocate resources for your projects.</p>
        </div>
        <div className="feature-card">
          <h3>Project Assignment</h3>
          <p>Assign team members to different projects and keep track of who is working on what.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;