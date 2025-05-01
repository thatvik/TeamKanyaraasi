import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import './MemberDetails.css';

const MemberDetails = () => {
  const { id } = useParams();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const res = await axios.get(`/api/members/${id}`);
        setMember(res.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch member details');
        setLoading(false);
        console.error('Error fetching member details:', err);
      }
    };

    fetchMember();
  }, [id]);

  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="error-container">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="error-container">
        <div className="alert alert-warning">Member not found</div>
        <Link to="/members" className="btn btn-primary">Back to Members</Link>
      </div>
    );
  }

  return (
    <div className="member-details-container">
      <div className="member-details-header">
        <div className="member-image">
          <img 
            src={member.image.startsWith('http') ? member.image : `/uploads/${member.image}`} 
            alt={member.name} 
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/default-profile.jpg';
            }}
          />
        </div>
        <div className="member-info">
          <h1>{member.name}</h1>
          <p className="member-role">{member.role}</p>
          <div className="member-contact">
            <p><strong>Email:</strong> {member.email}</p>
            {member.phone && <p><strong>Phone:</strong> {member.phone}</p>}
          </div>
        </div>
      </div>
      
      {member.bio && (
        <div className="member-bio">
          <h2>Bio</h2>
          <p>{member.bio}</p>
        </div>
      )}
      
      {member.skills && member.skills.length > 0 && (
        <div className="member-skills-section">
          <h2>Skills</h2>
          <div className="skills-list">
            {member.skills.map((skill, index) => (
              <span key={index} className="skill-tag">{skill}</span>
            ))}
          </div>
        </div>
      )}
      
      {member.projects && member.projects.length > 0 && (
        <div className="member-projects">
          <h2>Projects</h2>
          <ul className="projects-list">
            {member.projects.map((project, index) => (
              <li key={index}>{project}</li>
            ))}
          </ul>
        </div>
      )}
      
      <div className="member-details-footer">
        <Link to="/members" className="btn btn-primary">Back to Members</Link>
      </div>
    </div>
  );
};

export default MemberDetails;